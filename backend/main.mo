import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

actor {
  type UserProfile = {
    name : Text;
  };

  type EmotionalCheckIn = {
    timestamp : Time.Time;
    feelings : Text;
    content : Text;
  };

  type EmpatheticStory = {
    title : Text;
    content : Text;
    relatedFeeling : Text;
  };

  type FollowUpPrompt = {
    message : Text;
    options : [Text];
  };

  type SupportiveResponse = {
    mainMessage : Text;
    relatableStory : Text;
    actionOptions : [Text];
    followUpQuestion : Text;
  };

  type JournalEntry = {
    userId : Principal;
    methodType : Text;
    content : Text;
    timestamp : Time.Time;
    moodTag : ?Text;
  };

  type CheckInWithResponse = {
    checkIn : EmotionalCheckIn;
    response : SupportiveResponse;
  };

  // In-memory cache for guest (anonymous) check-ins
  var guestCheckIns : List.List<(Text, Text)> = List.empty<(Text, Text)>();
  let guestCheckInLimit = 10;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let userProfiles = Map.empty<Principal, UserProfile>();
  let userCheckIns = Map.empty<Principal, List.List<EmotionalCheckIn>>();
  let empatheticStories = Map.empty<Text, EmpatheticStory>();
  let followUpPrompts = List.empty<FollowUpPrompt>();
  let userJournalEntries = Map.empty<Principal, List.List<JournalEntry>>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func hasCheckIns(user : Principal) : async Bool {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own check-in data");
    };
    userCheckIns.containsKey(user);
  };

  public query ({ caller }) func getUserCheckIns(user : Principal) : async [EmotionalCheckIn] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own check-ins");
    };
    switch (userCheckIns.get(user)) {
      case (?checkIns) { checkIns.toArray() };
      case (null) { [] };
    };
  };

  // Add a check-in for authenticated users and get a supportive response
  public shared ({ caller }) func addCheckIn(feelings : Text, content : Text) : async CheckInWithResponse {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add check-ins");
    };

    let newCheckIn : EmotionalCheckIn = {
      timestamp = Time.now();
      feelings;
      content;
    };

    let existingCheckIns = switch (userCheckIns.get(caller)) {
      case (?checkIns) { checkIns };
      case (null) { List.empty<EmotionalCheckIn>() };
    };

    existingCheckIns.add(newCheckIn);
    userCheckIns.add(caller, existingCheckIns);

    let supportiveResponse = generateSupportiveResponse(feelings);

    {
      checkIn = newCheckIn;
      response = supportiveResponse;
    };
  };

  public query ({ caller }) func getAllCheckIns() : async [EmotionalCheckIn] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view check-ins");
    };

    switch (userCheckIns.get(caller)) {
      case (?checkIns) { checkIns.toArray() };
      case (null) { [] };
    };
  };

  // Handle check-in for anonymous (guest) users.
  // This can only store check-ins temporarily and returns a supportive response.
  // Anonymous check-ins are stored in-memory and not persisted across upgrades.
  public shared ({ caller }) func addGuestCheckIn(feelings : Text, content : Text) : async CheckInWithResponse {
    // Only allow anonymous callers
    if (caller.toText() != "2vxsx-fae" and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Only anonymous users or admins can use this endpoint");
    };

    let newCheckIn : EmotionalCheckIn = {
      timestamp = Time.now();
      feelings;
      content;
    };

    // Maintain a sliding window of recent check-ins
    let currentCheckIns = guestCheckIns.toArray();
    let limitedCheckIns = if (currentCheckIns.size() >= guestCheckInLimit) {
      Array.tabulate(
        guestCheckInLimit - 1,
        func(i) { currentCheckIns[i] },
      );
    } else {
      currentCheckIns;
    };

    guestCheckIns.clear();
    for (entry in limitedCheckIns.values()) {
      guestCheckIns.add(entry);
    };
    guestCheckIns.add((feelings, content));

    let supportiveResponse = generateSupportiveResponse(feelings);

    {
      checkIn = newCheckIn;
      response = supportiveResponse;
    };
  };

  public query ({} : {}) func getGuestCheckIns() : async [(Text, Text)] {
    guestCheckIns.toArray();
  };

  func generateSupportiveResponse(feelings : Text) : SupportiveResponse {
    let mainMessage = switch (feelings) {
      case ("sad") { "It's okay to feel sad sometimes. You're not alone and things can get better. Remember, emotions are valid and healing takes time." };
      case ("anxious") {
        "Take a deep breath. Anxiety is normal, but you have the strength to overcome it. Quick grounding exercise: Name five things you can see, four you can touch, three you can hear, two you can smell, and one you can taste.";
      };
      case ("happy") { "That's wonderful! Embrace your joy and let it inspire others. Take a moment to reflect on what made you happy today." };
      case ("angry") { "Anger is a valid emotion. Find healthy ways to release it, and remember, it's okay to take a break and gather your thoughts." };
      case ("lonely") { "Feeling lonely is tough, but remember, there are people who care about you. Reach out to a friend or try joining a local group or club." };
      case ("stressed") { "Stress can be overwhelming, but you're strong. Try breaking tasks into smaller steps and celebrate each accomplishment, no matter how small." };
      case ("grateful") { "Gratitude is powerful. Consider starting a gratitude journal to capture all the positive moments in your life." };
      case (_) { "Whatever you're feeling is valid. Thank you for sharing with me. Remember, your emotions are important and it's okay to seek support." };
    };

    let relatableStory = switch (empatheticStories.get(feelings)) {
      case (?story) { story.content };
      case (null) { "Many people have faced similar feelings and found ways to cope. You're not alone in this journey." };
    };

    let actionOptions = switch (feelings) {
      case ("sad") { ["Take a walk in nature", "Talk to a friend or loved one", "Practice mindfulness meditation"] };
      case ("anxious") { ["Deep breathing exercises", "Write your thoughts in a journal", "Listen to calming music"] };
      case ("happy") {
        ["Share your positivity with someone", "Express gratitude for three things in your life"];
      };
      case ("angry") { ["Engage in physical activity", "Try calming techniques like yoga or meditation"] };
      case ("lonely") { ["Call a friend or family member", "Join an online community with shared interests"] };
      case ("stressed") { ["Take short breaks throughout the day", "Prioritize self-care activities"] };
      case (_) { ["Reach out for support", "Explore self-care practices tailored to your needs"] };
    };

    let followUpQuestion = "Is there anything else you'd like to talk about or explore together? Your well-being matters, and I'm here to support you.";

    {
      mainMessage;
      relatableStory;
      actionOptions;
      followUpQuestion;
    };
  };

  public shared ({ caller }) func addEmpatheticStory(story : EmpatheticStory) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add stories");
    };
    empatheticStories.add(story.relatedFeeling, story);
  };

  public shared ({ caller }) func addFollowUpPrompt(prompt : FollowUpPrompt) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add prompts");
    };
    followUpPrompts.add(prompt);
  };

  public query ({ caller }) func getRandomFollowUpPrompt() : async ?FollowUpPrompt {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can receive follow-up prompts");
    };

    let promptArray = followUpPrompts.toArray();
    if (promptArray.size() == 0) { return null };

    let promptSize = promptArray.size();
    let pseudoRandomIndex = Int.abs(Time.now() % 2147483647) % promptSize;
    ?promptArray[pseudoRandomIndex];
  };

  public shared ({ caller }) func saveJournalEntry(methodType : Text, content : Text, moodTag : ?Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save journal entries");
    };

    let newEntry : JournalEntry = {
      userId = caller;
      methodType;
      content;
      timestamp = Time.now();
      moodTag;
    };

    let existingEntries = switch (userJournalEntries.get(caller)) {
      case (?entries) { entries };
      case (null) { List.empty<JournalEntry>() };
    };

    existingEntries.add(newEntry);
    userJournalEntries.add(caller, existingEntries);
  };

  public query ({ caller }) func getJournalEntries() : async [JournalEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view journal entries");
    };

    switch (userJournalEntries.get(caller)) {
      case (?entries) {
        let sortedEntries = entries.toArray().sort(
          func(a, b) {
            if (a.timestamp < b.timestamp) { return #less };
            if (a.timestamp > b.timestamp) { return #greater };
            #equal;
          }
        );
        sortedEntries;
      };
      case (null) { [] };
    };
  };

  public shared ({ caller }) func clearJournalEntries() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear journal entries");
    };
    userJournalEntries.remove(caller);
  };
};
