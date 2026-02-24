export interface ResourceLink {
  title: string;
  url: string;
}

// Music links based on mood with pop artists
export function getMusicLinks(mood: string): ResourceLink[] {
  const musicMap: Record<string, ResourceLink[]> = {
    sad: [
      { title: 'Billie Eilish - When The Party\'s Over', url: 'https://www.youtube.com/watch?v=pbMwTqkKSps' },
      { title: 'Olivia Rodrigo - drivers license', url: 'https://www.youtube.com/watch?v=ZmDBbnmKpqQ' },
      { title: 'Sad Songs Playlist', url: 'https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634' },
    ],
    lonely: [
      { title: 'Lewis Capaldi - Someone You Loved', url: 'https://www.youtube.com/watch?v=zABLecsR5UE' },
      { title: 'Adele - Someone Like You', url: 'https://www.youtube.com/watch?v=hLQl3WQQoQ0' },
      { title: 'Lonely Vibes Playlist', url: 'https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1' },
    ],
    stressed: [
      { title: 'Ed Sheeran - Thinking Out Loud (Acoustic)', url: 'https://www.youtube.com/watch?v=lp-EO5I60KA' },
      { title: 'Norah Jones - Don\'t Know Why', url: 'https://www.youtube.com/watch?v=tO4dxvguQDk' },
      { title: 'Calm Vibes Playlist', url: 'https://open.spotify.com/playlist/37i9dQZF1DWZd79rJ6a7lp' },
    ],
    tired: [
      { title: 'Coldplay - Fix You', url: 'https://www.youtube.com/watch?v=k4V3Mo61fJM' },
      { title: 'Relaxing Music Playlist', url: 'https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u' },
      { title: 'Sleep Sounds', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' },
    ],
    overwhelmed: [
      { title: 'Sia - Breathe Me', url: 'https://www.youtube.com/watch?v=SFGvmrJ5rjM' },
      { title: 'Peaceful Piano Playlist', url: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO' },
      { title: 'Meditation Music', url: 'https://www.youtube.com/watch?v=lFcSrYw-ARY' },
    ],
    happy: [
      { title: 'Lizzo - Good As Hell', url: 'https://www.youtube.com/watch?v=SmbmeOgWsqE' },
      { title: 'Dua Lipa - Levitating', url: 'https://www.youtube.com/watch?v=TUVcZfQe-Kw' },
      { title: 'Happy Hits Playlist', url: 'https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC' },
    ],
    excited: [
      { title: 'The Weeknd - Blinding Lights', url: 'https://www.youtube.com/watch?v=4NRXx6U8ABQ' },
      { title: 'Bruno Mars - Uptown Funk', url: 'https://www.youtube.com/watch?v=OPf0YbXqDm0' },
      { title: 'Party Playlist', url: 'https://open.spotify.com/playlist/37i9dQZF1DXaXB8fQg7xif' },
    ],
    grateful: [
      { title: 'John Legend - All of Me', url: 'https://www.youtube.com/watch?v=450p7goxZqg' },
      { title: 'Gratitude Playlist', url: 'https://open.spotify.com/playlist/37i9dQZF1DX0MLFaUdXnjA' },
      { title: 'Peaceful Acoustic', url: 'https://www.youtube.com/watch?v=5anLPw0Efmo' },
    ],
    anxious: [
      { title: 'Enya - Only Time', url: 'https://www.youtube.com/watch?v=7wfYIMyS_dI' },
      { title: 'Calming Music Playlist', url: 'https://open.spotify.com/playlist/37i9dQZF1DWZd79rJ6a7lp' },
      { title: 'Nature Sounds', url: 'https://www.youtube.com/watch?v=eKFTSSKCzWA' },
    ],
    angry: [
      { title: 'Imagine Dragons - Believer', url: 'https://www.youtube.com/watch?v=7wtfhZwyrcc' },
      { title: 'Eminem - Lose Yourself', url: 'https://www.youtube.com/watch?v=_Yhyp-_hX2s' },
      { title: 'Workout Motivation', url: 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP' },
    ],
    confused: [
      { title: 'Coldplay - The Scientist', url: 'https://www.youtube.com/watch?v=RB-RcX5DS5A' },
      { title: 'Reflective Music Playlist', url: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO' },
      { title: 'Ambient Sounds', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' },
    ],
    peaceful: [
      { title: 'Jack Johnson - Better Together', url: 'https://www.youtube.com/watch?v=seZMONy5w7c' },
      { title: 'Peaceful Piano', url: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO' },
      { title: 'Acoustic Chill', url: 'https://www.youtube.com/watch?v=5anLPw0Efmo' },
    ],
  };

  return musicMap[mood] || musicMap.happy;
}

// Dance video links based on mood
export function getDanceLinks(mood: string): ResourceLink[] {
  const danceMap: Record<string, ResourceLink[]> = {
    sad: [
      { title: 'Gentle Movement Therapy', url: 'https://www.youtube.com/watch?v=3vTKLMVn6fM' },
      { title: 'Slow Flow Dance', url: 'https://www.youtube.com/watch?v=Yzm3QwJGMJI' },
      { title: 'Expressive Movement', url: 'https://www.youtube.com/watch?v=v7AYKMP6rOE' },
    ],
    lonely: [
      { title: 'Solo Dance Routine', url: 'https://www.youtube.com/watch?v=POZNheF-KdY' },
      { title: 'Self-Love Dance', url: 'https://www.youtube.com/watch?v=Yzm3QwJGMJI' },
      { title: 'Empowering Movement', url: 'https://www.youtube.com/watch?v=v7AYKMP6rOE' },
    ],
    stressed: [
      { title: 'Stress Relief Dance', url: 'https://www.youtube.com/watch?v=3vTKLMVn6fM' },
      { title: 'Calming Movement', url: 'https://www.youtube.com/watch?v=Yzm3QwJGMJI' },
      { title: 'Gentle Stretching Dance', url: 'https://www.youtube.com/watch?v=v7AYKMP6rOE' },
    ],
    tired: [
      { title: 'Energizing Dance Workout', url: 'https://www.youtube.com/watch?v=gC_L9qAHVJ8' },
      { title: 'Wake Up Dance', url: 'https://www.youtube.com/watch?v=POZNheF-KdY' },
      { title: 'Morning Movement', url: 'https://www.youtube.com/watch?v=Yzm3QwJGMJI' },
    ],
    overwhelmed: [
      { title: 'Simple Dance Routine', url: 'https://www.youtube.com/watch?v=3vTKLMVn6fM' },
      { title: 'Mindful Movement', url: 'https://www.youtube.com/watch?v=Yzm3QwJGMJI' },
      { title: 'Easy Flow Dance', url: 'https://www.youtube.com/watch?v=v7AYKMP6rOE' },
    ],
    happy: [
      { title: 'Upbeat Dance Party', url: 'https://www.youtube.com/watch?v=gC_L9qAHVJ8' },
      { title: 'Fun Choreography', url: 'https://www.youtube.com/watch?v=POZNheF-KdY' },
      { title: 'Celebration Dance', url: 'https://www.youtube.com/watch?v=Yzm3QwJGMJI' },
    ],
    excited: [
      { title: 'High Energy Dance', url: 'https://www.youtube.com/watch?v=gC_L9qAHVJ8' },
      { title: 'Party Dance Moves', url: 'https://www.youtube.com/watch?v=POZNheF-KdY' },
      { title: 'Cardio Dance Workout', url: 'https://www.youtube.com/watch?v=Yzm3QwJGMJI' },
    ],
    grateful: [
      { title: 'Gratitude Movement', url: 'https://www.youtube.com/watch?v=3vTKLMVn6fM' },
      { title: 'Joyful Dance', url: 'https://www.youtube.com/watch?v=Yzm3QwJGMJI' },
      { title: 'Expressive Flow', url: 'https://www.youtube.com/watch?v=v7AYKMP6rOE' },
    ],
    anxious: [
      { title: 'Calming Dance Therapy', url: 'https://www.youtube.com/watch?v=3vTKLMVn6fM' },
      { title: 'Grounding Movement', url: 'https://www.youtube.com/watch?v=Yzm3QwJGMJI' },
      { title: 'Anxiety Relief Dance', url: 'https://www.youtube.com/watch?v=v7AYKMP6rOE' },
    ],
    angry: [
      { title: 'Release Dance Workout', url: 'https://www.youtube.com/watch?v=gC_L9qAHVJ8' },
      { title: 'Power Movement', url: 'https://www.youtube.com/watch?v=POZNheF-KdY' },
      { title: 'Intense Dance Cardio', url: 'https://www.youtube.com/watch?v=Yzm3QwJGMJI' },
    ],
    confused: [
      { title: 'Mindful Dance', url: 'https://www.youtube.com/watch?v=3vTKLMVn6fM' },
      { title: 'Clarity Movement', url: 'https://www.youtube.com/watch?v=Yzm3QwJGMJI' },
      { title: 'Reflective Dance', url: 'https://www.youtube.com/watch?v=v7AYKMP6rOE' },
    ],
    peaceful: [
      { title: 'Peaceful Flow Dance', url: 'https://www.youtube.com/watch?v=3vTKLMVn6fM' },
      { title: 'Serene Movement', url: 'https://www.youtube.com/watch?v=Yzm3QwJGMJI' },
      { title: 'Gentle Dance', url: 'https://www.youtube.com/watch?v=v7AYKMP6rOE' },
    ],
  };

  return danceMap[mood] || danceMap.happy;
}

// Story links based on mood
export function getStoryLinks(mood: string): ResourceLink[] {
  const storyMap: Record<string, ResourceLink[]> = {
    sad: [
      { title: 'The Velveteen Rabbit', url: 'https://www.gutenberg.org/ebooks/11757' },
      { title: 'Stories of Hope', url: 'https://www.short-stories.co.uk/hope-stories.php' },
      { title: 'Healing Tales', url: 'https://www.storynory.com/' },
    ],
    lonely: [
      { title: 'The Little Prince', url: 'https://www.gutenberg.org/ebooks/61720' },
      { title: 'Connection Stories', url: 'https://www.short-stories.co.uk/friendship-stories.php' },
      { title: 'Tales of Belonging', url: 'https://www.storynory.com/' },
    ],
    stressed: [
      { title: 'Zen Stories', url: 'https://www.ashidakim.com/zenkoans/zenindex.html' },
      { title: 'Calming Tales', url: 'https://www.storynory.com/' },
      { title: 'Peaceful Narratives', url: 'https://www.short-stories.co.uk/peace-stories.php' },
    ],
    tired: [
      { title: 'Bedtime Stories', url: 'https://www.storynory.com/' },
      { title: 'Restful Tales', url: 'https://www.short-stories.co.uk/sleep-stories.php' },
      { title: 'Soothing Narratives', url: 'https://www.gutenberg.org/ebooks/subject/1376' },
    ],
    overwhelmed: [
      { title: 'Simple Stories', url: 'https://www.storynory.com/' },
      { title: 'Grounding Tales', url: 'https://www.short-stories.co.uk/calm-stories.php' },
      { title: 'Clarity Narratives', url: 'https://www.gutenberg.org/ebooks/subject/1376' },
    ],
    happy: [
      { title: 'Joyful Tales', url: 'https://www.storynory.com/' },
      { title: 'Uplifting Stories', url: 'https://www.short-stories.co.uk/happy-stories.php' },
      { title: 'Celebration Narratives', url: 'https://www.gutenberg.org/ebooks/subject/1376' },
    ],
    excited: [
      { title: 'Adventure Stories', url: 'https://www.storynory.com/' },
      { title: 'Thrilling Tales', url: 'https://www.short-stories.co.uk/adventure-stories.php' },
      { title: 'Exciting Narratives', url: 'https://www.gutenberg.org/ebooks/subject/1376' },
    ],
    grateful: [
      { title: 'Gratitude Stories', url: 'https://www.storynory.com/' },
      { title: 'Thankful Tales', url: 'https://www.short-stories.co.uk/gratitude-stories.php' },
      { title: 'Appreciation Narratives', url: 'https://www.gutenberg.org/ebooks/subject/1376' },
    ],
    anxious: [
      { title: 'Calming Stories', url: 'https://www.storynory.com/' },
      { title: 'Reassuring Tales', url: 'https://www.short-stories.co.uk/calm-stories.php' },
      { title: 'Peaceful Narratives', url: 'https://www.gutenberg.org/ebooks/subject/1376' },
    ],
    angry: [
      { title: 'Understanding Stories', url: 'https://www.storynory.com/' },
      { title: 'Perspective Tales', url: 'https://www.short-stories.co.uk/wisdom-stories.php' },
      { title: 'Reflective Narratives', url: 'https://www.gutenberg.org/ebooks/subject/1376' },
    ],
    confused: [
      { title: 'Clarity Stories', url: 'https://www.storynory.com/' },
      { title: 'Wisdom Tales', url: 'https://www.short-stories.co.uk/wisdom-stories.php' },
      { title: 'Insightful Narratives', url: 'https://www.gutenberg.org/ebooks/subject/1376' },
    ],
    peaceful: [
      { title: 'Serene Stories', url: 'https://www.storynory.com/' },
      { title: 'Tranquil Tales', url: 'https://www.short-stories.co.uk/peace-stories.php' },
      { title: 'Calm Narratives', url: 'https://www.gutenberg.org/ebooks/subject/1376' },
    ],
  };

  return storyMap[mood] || storyMap.happy;
}

// Self-care routine links based on mood
export function getSelfCareLinks(mood: string): ResourceLink[] {
  const selfCareMap: Record<string, ResourceLink[]> = {
    sad: [
      { title: 'Self-Compassion Exercises', url: 'https://self-compassion.org/category/exercises/' },
      { title: 'Comfort Self-Care Routine', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Gentle Self-Care Ideas', url: 'https://www.healthline.com/health/self-care-strategies' },
    ],
    lonely: [
      { title: 'Self-Connection Practices', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Solo Self-Care Activities', url: 'https://www.healthline.com/health/self-care-strategies' },
      { title: 'Self-Love Rituals', url: 'https://self-compassion.org/category/exercises/' },
    ],
    stressed: [
      { title: 'Stress Relief Self-Care', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Relaxation Techniques', url: 'https://www.healthline.com/health/stress-relief-plan' },
      { title: 'Calming Self-Care Routine', url: 'https://www.mindful.org/take-a-mindful-moment-5-simple-practices-for-daily-life/' },
    ],
    tired: [
      { title: 'Restorative Self-Care', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Energy Boosting Routine', url: 'https://www.healthline.com/health/self-care-strategies' },
      { title: 'Rest and Recovery Tips', url: 'https://www.sleepfoundation.org/sleep-hygiene' },
    ],
    overwhelmed: [
      { title: 'Simplify Self-Care', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Grounding Self-Care', url: 'https://www.healthline.com/health/grounding-techniques' },
      { title: 'Minimal Self-Care Routine', url: 'https://www.mindful.org/take-a-mindful-moment-5-simple-practices-for-daily-life/' },
    ],
    happy: [
      { title: 'Joyful Self-Care', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Celebration Self-Care', url: 'https://www.healthline.com/health/self-care-strategies' },
      { title: 'Positive Self-Care Rituals', url: 'https://www.mindful.org/take-a-mindful-moment-5-simple-practices-for-daily-life/' },
    ],
    excited: [
      { title: 'Energetic Self-Care', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Active Self-Care Routine', url: 'https://www.healthline.com/health/self-care-strategies' },
      { title: 'Dynamic Self-Care Ideas', url: 'https://www.mindful.org/take-a-mindful-moment-5-simple-practices-for-daily-life/' },
    ],
    grateful: [
      { title: 'Gratitude Self-Care', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Appreciation Rituals', url: 'https://www.healthline.com/health/self-care-strategies' },
      { title: 'Thankful Self-Care', url: 'https://www.mindful.org/take-a-mindful-moment-5-simple-practices-for-daily-life/' },
    ],
    anxious: [
      { title: 'Anxiety Relief Self-Care', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Calming Self-Care Routine', url: 'https://www.healthline.com/health/anxiety/how-to-calm-anxiety' },
      { title: 'Grounding Self-Care', url: 'https://www.healthline.com/health/grounding-techniques' },
    ],
    angry: [
      { title: 'Anger Release Self-Care', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Cooling Down Routine', url: 'https://www.healthline.com/health/mental-health/how-to-control-anger' },
      { title: 'Emotional Release Self-Care', url: 'https://www.mindful.org/take-a-mindful-moment-5-simple-practices-for-daily-life/' },
    ],
    confused: [
      { title: 'Clarity Self-Care', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Mindful Self-Care Routine', url: 'https://www.healthline.com/health/self-care-strategies' },
      { title: 'Reflective Self-Care', url: 'https://www.mindful.org/take-a-mindful-moment-5-simple-practices-for-daily-life/' },
    ],
    peaceful: [
      { title: 'Peaceful Self-Care', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Serene Self-Care Routine', url: 'https://www.healthline.com/health/self-care-strategies' },
      { title: 'Tranquil Self-Care', url: 'https://www.mindful.org/take-a-mindful-moment-5-simple-practices-for-daily-life/' },
    ],
  };

  return selfCareMap[mood] || selfCareMap.happy;
}

// Meditation links based on mood
export function getMeditationLinks(mood: string): ResourceLink[] {
  const meditationMap: Record<string, ResourceLink[]> = {
    sad: [
      { title: 'Healing Meditation', url: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak' },
      { title: 'Self-Compassion Meditation', url: 'https://www.youtube.com/watch?v=11U0h0DPu7k' },
      { title: 'Emotional Release Meditation', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    lonely: [
      { title: 'Loving-Kindness Meditation', url: 'https://www.youtube.com/watch?v=sz7cpV7ERsM' },
      { title: 'Connection Meditation', url: 'https://www.youtube.com/watch?v=11U0h0DPu7k' },
      { title: 'Self-Love Meditation', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    stressed: [
      { title: 'Stress Relief Meditation', url: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak' },
      { title: 'Deep Relaxation', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' },
      { title: 'Calming Meditation', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    tired: [
      { title: 'Energizing Meditation', url: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak' },
      { title: 'Morning Meditation', url: 'https://www.youtube.com/watch?v=11U0h0DPu7k' },
      { title: 'Revitalizing Practice', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    overwhelmed: [
      { title: 'Grounding Meditation', url: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak' },
      { title: 'Simplicity Meditation', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' },
      { title: 'Centering Practice', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    happy: [
      { title: 'Gratitude Meditation', url: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak' },
      { title: 'Joy Meditation', url: 'https://www.youtube.com/watch?v=11U0h0DPu7k' },
      { title: 'Positive Energy Meditation', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    excited: [
      { title: 'Focus Meditation', url: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak' },
      { title: 'Channeling Energy Meditation', url: 'https://www.youtube.com/watch?v=11U0h0DPu7k' },
      { title: 'Mindful Excitement', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    grateful: [
      { title: 'Gratitude Meditation', url: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak' },
      { title: 'Appreciation Practice', url: 'https://www.youtube.com/watch?v=11U0h0DPu7k' },
      { title: 'Thankfulness Meditation', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    anxious: [
      { title: 'Anxiety Relief Meditation', url: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak' },
      { title: 'Calming Breath Work', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' },
      { title: 'Peace Meditation', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    angry: [
      { title: 'Anger Release Meditation', url: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak' },
      { title: 'Cooling Meditation', url: 'https://www.youtube.com/watch?v=11U0h0DPu7k' },
      { title: 'Emotional Balance', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    confused: [
      { title: 'Clarity Meditation', url: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak' },
      { title: 'Mindfulness Practice', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' },
      { title: 'Insight Meditation', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    peaceful: [
      { title: 'Deep Peace Meditation', url: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak' },
      { title: 'Tranquility Practice', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' },
      { title: 'Serenity Meditation', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
  };

  return meditationMap[mood] || meditationMap.happy;
}

// Video recommendations based on mood (including music videos)
export function getVideoLinks(mood: string): ResourceLink[] {
  const videoMap: Record<string, ResourceLink[]> = {
    sad: [
      { title: 'Billie Eilish - When The Party\'s Over (Music Video)', url: 'https://www.youtube.com/watch?v=pbMwTqkKSps' },
      { title: 'Uplifting Short Films', url: 'https://www.youtube.com/watch?v=nBobmn_u98w' },
      { title: 'Comfort Videos', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    lonely: [
      { title: 'Lewis Capaldi - Someone You Loved (Music Video)', url: 'https://www.youtube.com/watch?v=zABLecsR5UE' },
      { title: 'Connection Stories', url: 'https://www.youtube.com/watch?v=nBobmn_u98w' },
      { title: 'Heartwarming Videos', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    stressed: [
      { title: 'Relaxing Nature Videos', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' },
      { title: 'Calming Visuals', url: 'https://www.youtube.com/watch?v=eKFTSSKCzWA' },
      { title: 'Stress Relief Videos', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    tired: [
      { title: 'Energizing Videos', url: 'https://www.youtube.com/watch?v=gC_L9qAHVJ8' },
      { title: 'Motivational Content', url: 'https://www.youtube.com/watch?v=nBobmn_u98w' },
      { title: 'Wake Up Videos', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    overwhelmed: [
      { title: 'Simple Calming Videos', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' },
      { title: 'Grounding Content', url: 'https://www.youtube.com/watch?v=eKFTSSKCzWA' },
      { title: 'Peaceful Videos', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    happy: [
      { title: 'Dua Lipa - Levitating (Music Video)', url: 'https://www.youtube.com/watch?v=TUVcZfQe-Kw' },
      { title: 'Feel-Good Videos', url: 'https://www.youtube.com/watch?v=nBobmn_u98w' },
      { title: 'Joyful Content', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    excited: [
      { title: 'The Weeknd - Blinding Lights (Music Video)', url: 'https://www.youtube.com/watch?v=4NRXx6U8ABQ' },
      { title: 'High Energy Videos', url: 'https://www.youtube.com/watch?v=gC_L9qAHVJ8' },
      { title: 'Exciting Content', url: 'https://www.youtube.com/watch?v=nBobmn_u98w' },
    ],
    grateful: [
      { title: 'Inspirational Videos', url: 'https://www.youtube.com/watch?v=nBobmn_u98w' },
      { title: 'Gratitude Content', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
      { title: 'Thankful Stories', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' },
    ],
    anxious: [
      { title: 'Calming Nature Videos', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' },
      { title: 'Anxiety Relief Content', url: 'https://www.youtube.com/watch?v=eKFTSSKCzWA' },
      { title: 'Peaceful Videos', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    angry: [
      { title: 'Imagine Dragons - Believer (Music Video)', url: 'https://www.youtube.com/watch?v=7wtfhZwyrcc' },
      { title: 'Release Videos', url: 'https://www.youtube.com/watch?v=gC_L9qAHVJ8' },
      { title: 'Perspective Content', url: 'https://www.youtube.com/watch?v=nBobmn_u98w' },
    ],
    confused: [
      { title: 'Clarity Videos', url: 'https://www.youtube.com/watch?v=nBobmn_u98w' },
      { title: 'Mindful Content', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' },
      { title: 'Reflective Videos', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
    peaceful: [
      { title: 'Serene Nature Videos', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' },
      { title: 'Tranquil Content', url: 'https://www.youtube.com/watch?v=eKFTSSKCzWA' },
      { title: 'Peaceful Visuals', url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' },
    ],
  };

  return videoMap[mood] || videoMap.happy;
}

// Journaling prompts based on mood
export function getJournalingPrompts(mood: string): string[] {
  const journalingMap: Record<string, string[]> = {
    sad: [
      'What emotions am I feeling right now, and where do I feel them in my body?',
      'What would I say to a friend who was feeling the way I feel right now?',
      'What small thing could bring me a moment of comfort today?',
    ],
    lonely: [
      'What qualities do I appreciate about myself?',
      'When have I felt most connected to others in my life?',
      'What can I do today to nurture my relationship with myself?',
    ],
    stressed: [
      'What is within my control right now, and what is not?',
      'What would help me feel more grounded in this moment?',
      'What can I let go of today?',
    ],
    tired: [
      'What does my body need right now?',
      'What activities drain my energy, and which ones restore it?',
      'How can I be more gentle with myself today?',
    ],
    overwhelmed: [
      'What is the one most important thing I need to focus on right now?',
      'What can I simplify or delegate today?',
      'What would make today feel more manageable?',
    ],
    happy: [
      'What am I grateful for in this moment?',
      'What brought me joy today, and how can I create more of it?',
      'Who or what contributed to my happiness today?',
    ],
    excited: [
      'What am I looking forward to, and why does it excite me?',
      'How can I channel this energy into something meaningful?',
      'What possibilities am I seeing right now?',
    ],
    grateful: [
      'What are three things I\'m grateful for today?',
      'Who has made a positive impact on my life recently?',
      'What simple pleasures did I enjoy today?',
    ],
    anxious: [
      'What am I worried about, and is there evidence for or against this worry?',
      'What has helped me feel calm in the past?',
      'What can I do right now to feel more safe and secure?',
    ],
    angry: [
      'What triggered my anger, and what need of mine is not being met?',
      'How can I express this emotion in a healthy way?',
      'What would help me feel heard and understood?',
    ],
    confused: [
      'What am I uncertain about, and what information might help?',
      'What do I know for sure right now?',
      'What would clarity look like in this situation?',
    ],
    peaceful: [
      'What contributed to this sense of peace?',
      'How can I cultivate more moments like this?',
      'What does inner peace mean to me?',
    ],
  };

  return journalingMap[mood] || journalingMap.happy;
}
