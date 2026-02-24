import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface JournalEntry {
    methodType: string;
    content: string;
    userId: Principal;
    moodTag?: string;
    timestamp: Time;
}
export interface EmpatheticStory {
    title: string;
    content: string;
    relatedFeeling: string;
}
export interface EmotionalCheckIn {
    feelings: string;
    content: string;
    timestamp: Time;
}
export interface FollowUpPrompt {
    message: string;
    options: Array<string>;
}
export interface CheckInWithResponse {
    checkIn: EmotionalCheckIn;
    response: SupportiveResponse;
}
export interface UserProfile {
    name: string;
}
export interface SupportiveResponse {
    followUpQuestion: string;
    mainMessage: string;
    relatableStory: string;
    actionOptions: Array<string>;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCheckIn(feelings: string, content: string): Promise<CheckInWithResponse>;
    addEmpatheticStory(story: EmpatheticStory): Promise<void>;
    addFollowUpPrompt(prompt: FollowUpPrompt): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearJournalEntries(): Promise<void>;
    getAllCheckIns(): Promise<Array<EmotionalCheckIn>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getJournalEntries(): Promise<Array<JournalEntry>>;
    getRandomFollowUpPrompt(): Promise<FollowUpPrompt | null>;
    getUserCheckIns(user: Principal): Promise<Array<EmotionalCheckIn>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    hasCheckIns(user: Principal): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveJournalEntry(methodType: string, content: string, moodTag: string | null): Promise<void>;
}
