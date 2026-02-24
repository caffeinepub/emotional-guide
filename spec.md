# Specification

## Summary
**Goal:** Remove the mood-based activity tab panel that appears after a user selects their mood in the conversation input view.

**Planned changes:**
- In `ConversationInput.tsx`, remove the tabbed panel (Music, Dance, Stories, Self Care, Meditation, What to Watch, and Journaling) that displays after the user submits their mood/feeling.
- Clean up any unused imports or references to the removed tab content components in `ConversationInput.tsx`.
- Leave the emotional check-in input form and mood submission flow fully intact.
- Leave the bottom navigation tabs (Music, Journal, Meditation, Good Vibes, Watch This) unchanged.

**User-visible outcome:** After selecting their mood, users no longer see the activity tab panel. The check-in input form continues to work as before.
