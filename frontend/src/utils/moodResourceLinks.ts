export interface ResourceLink {
  title: string;
  url: string;
}

export interface MusicTrack {
  title: string;
  artist: string;
  genre: string;
  embedUrl: string;
}

// Expanded music tracks organized by mood with embed-compatible YouTube URLs
export const moodMusicTracks: Record<string, MusicTrack[]> = {
  happy: [
    { title: 'Good As Hell', artist: 'Lizzo', genre: 'Pop', embedUrl: 'https://www.youtube.com/embed/SmbmeOgWsqE' },
    { title: 'Levitating', artist: 'Dua Lipa', genre: 'Pop', embedUrl: 'https://www.youtube.com/embed/TUVcZfQe-Kw' },
    { title: 'Happy', artist: 'Pharrell Williams', genre: 'Pop', embedUrl: 'https://www.youtube.com/embed/y6Sxv-sUYtM' },
    { title: 'Can\'t Stop the Feeling', artist: 'Justin Timberlake', genre: 'Pop', embedUrl: 'https://www.youtube.com/embed/ru0K8uYEZWw' },
    { title: 'Shake It Off', artist: 'Taylor Swift', genre: 'Pop', embedUrl: 'https://www.youtube.com/embed/nfWlot6h_JM' },
    { title: 'Uptown Funk', artist: 'Bruno Mars', genre: 'Funk', embedUrl: 'https://www.youtube.com/embed/OPf0YbXqDm0' },
    { title: 'Walking on Sunshine', artist: 'Katrina & The Waves', genre: 'Pop Rock', embedUrl: 'https://www.youtube.com/embed/iPUmE-tne5U' },
    { title: 'Don\'t Stop Me Now', artist: 'Queen', genre: 'Rock', embedUrl: 'https://www.youtube.com/embed/HgzGwKwLmgM' },
  ],
  sad: [
    { title: 'When The Party\'s Over', artist: 'Billie Eilish', genre: 'Indie Pop', embedUrl: 'https://www.youtube.com/embed/pbMwTqkKSps' },
    { title: 'drivers license', artist: 'Olivia Rodrigo', genre: 'Pop', embedUrl: 'https://www.youtube.com/embed/ZmDBbnmKpqQ' },
    { title: 'Someone Like You', artist: 'Adele', genre: 'Soul', embedUrl: 'https://www.youtube.com/embed/hLQl3WQQoQ0' },
    { title: 'Fix You', artist: 'Coldplay', genre: 'Alternative', embedUrl: 'https://www.youtube.com/embed/k4V3Mo61fJM' },
    { title: 'The Night We Met', artist: 'Lord Huron', genre: 'Indie Folk', embedUrl: 'https://www.youtube.com/embed/KtlgYxa6BMU' },
    { title: 'Skinny Love', artist: 'Bon Iver', genre: 'Indie Folk', embedUrl: 'https://www.youtube.com/embed/ssdgFoHLwnk' },
    { title: 'Hurt', artist: 'Johnny Cash', genre: 'Country', embedUrl: 'https://www.youtube.com/embed/8AHCfZTRGiI' },
    { title: 'The Scientist', artist: 'Coldplay', genre: 'Alternative', embedUrl: 'https://www.youtube.com/embed/RB-RcX5DS5A' },
  ],
  calm: [
    { title: 'Only Time', artist: 'Enya', genre: 'New Age', embedUrl: 'https://www.youtube.com/embed/7wfYIMyS_dI' },
    { title: 'Clair de Lune', artist: 'Claude Debussy', genre: 'Classical', embedUrl: 'https://www.youtube.com/embed/CvFH_6DNRCY' },
    { title: 'Weightless', artist: 'Marconi Union', genre: 'Ambient', embedUrl: 'https://www.youtube.com/embed/UfcAVejslrU' },
    { title: 'Better Together', artist: 'Jack Johnson', genre: 'Acoustic', embedUrl: 'https://www.youtube.com/embed/seZMONy5w7c' },
    { title: 'Don\'t Know Why', artist: 'Norah Jones', genre: 'Jazz', embedUrl: 'https://www.youtube.com/embed/tO4dxvguQDk' },
    { title: 'Gymnopédie No.1', artist: 'Erik Satie', genre: 'Classical', embedUrl: 'https://www.youtube.com/embed/S-Xm7s9eGxU' },
    { title: 'Breathe (2 AM)', artist: 'Anna Nalick', genre: 'Indie Pop', embedUrl: 'https://www.youtube.com/embed/0OR6yBMFVMI' },
    { title: 'Lo-Fi Chill Beats', artist: 'ChilledCow', genre: 'Lo-Fi', embedUrl: 'https://www.youtube.com/embed/5qap5aO4i9A' },
  ],
  energetic: [
    { title: 'Blinding Lights', artist: 'The Weeknd', genre: 'Synth-Pop', embedUrl: 'https://www.youtube.com/embed/4NRXx6U8ABQ' },
    { title: 'Lose Yourself', artist: 'Eminem', genre: 'Hip-Hop', embedUrl: 'https://www.youtube.com/embed/_Yhyp-_hX2s' },
    { title: 'Eye of the Tiger', artist: 'Survivor', genre: 'Rock', embedUrl: 'https://www.youtube.com/embed/btPJPFnesV4' },
    { title: 'Stronger', artist: 'Kanye West', genre: 'Hip-Hop', embedUrl: 'https://www.youtube.com/embed/PsO6ZnUZI0g' },
    { title: 'Run the World (Girls)', artist: 'Beyoncé', genre: 'Pop', embedUrl: 'https://www.youtube.com/embed/VBmMU_iwe6U' },
    { title: 'Thunderstruck', artist: 'AC/DC', genre: 'Rock', embedUrl: 'https://www.youtube.com/embed/v2AC41dglnM' },
    { title: 'Power', artist: 'Kanye West', genre: 'Hip-Hop', embedUrl: 'https://www.youtube.com/embed/L53gjP-TtGE' },
    { title: 'Till I Collapse', artist: 'Eminem', genre: 'Hip-Hop', embedUrl: 'https://www.youtube.com/embed/ytQ5CYE1VZw' },
  ],
  anxious: [
    { title: 'Breathe Me', artist: 'Sia', genre: 'Indie Pop', embedUrl: 'https://www.youtube.com/embed/SFGvmrJ5rjM' },
    { title: 'Holocene', artist: 'Bon Iver', genre: 'Indie Folk', embedUrl: 'https://www.youtube.com/embed/TWcyIpul8OE' },
    { title: 'River Flows in You', artist: 'Yiruma', genre: 'Classical', embedUrl: 'https://www.youtube.com/embed/7maJOI3QMu0' },
    { title: 'Thinking Out Loud', artist: 'Ed Sheeran', genre: 'Pop', embedUrl: 'https://www.youtube.com/embed/lp-EO5I60KA' },
    { title: 'The Sound of Silence', artist: 'Simon & Garfunkel', genre: 'Folk', embedUrl: 'https://www.youtube.com/embed/4zLfCnGVeL4' },
    { title: 'Somewhere Over the Rainbow', artist: 'Israel Kamakawiwo\'ole', genre: 'Hawaiian', embedUrl: 'https://www.youtube.com/embed/V1bFr2SWP1I' },
    { title: 'Pure Shores', artist: 'All Saints', genre: 'Pop', embedUrl: 'https://www.youtube.com/embed/Yx3sMiGMFMQ' },
    { title: 'Peaceful Piano Mix', artist: 'Various Artists', genre: 'Classical', embedUrl: 'https://www.youtube.com/embed/lFcSrYw-ARY' },
  ],
  angry: [
    { title: 'Believer', artist: 'Imagine Dragons', genre: 'Rock', embedUrl: 'https://www.youtube.com/embed/7wtfhZwyrcc' },
    { title: 'Break Stuff', artist: 'Limp Bizkit', genre: 'Nu-Metal', embedUrl: 'https://www.youtube.com/embed/ZpUYjpKg9KY' },
    { title: 'In the End', artist: 'Linkin Park', genre: 'Nu-Metal', embedUrl: 'https://www.youtube.com/embed/eVTXPUF4Oz4' },
    { title: 'Killing in the Name', artist: 'Rage Against the Machine', genre: 'Metal', embedUrl: 'https://www.youtube.com/embed/bWXazVhlyxQ' },
    { title: 'Numb', artist: 'Linkin Park', genre: 'Nu-Metal', embedUrl: 'https://www.youtube.com/embed/kXYiU_JCYtU' },
    { title: 'Roar', artist: 'Katy Perry', genre: 'Pop', embedUrl: 'https://www.youtube.com/embed/CevxZvSJLk8' },
    { title: 'Fighter', artist: 'Christina Aguilera', genre: 'Pop', embedUrl: 'https://www.youtube.com/embed/OgMCg_8bHaQ' },
    { title: 'Stronger (What Doesn\'t Kill You)', artist: 'Kelly Clarkson', genre: 'Pop Rock', embedUrl: 'https://www.youtube.com/embed/Xn676-fLq7I' },
  ],
  focus: [
    { title: 'Lo-Fi Hip Hop Radio', artist: 'Lofi Girl', genre: 'Lo-Fi', embedUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk' },
    { title: 'Experience', artist: 'Ludovico Einaudi', genre: 'Classical', embedUrl: 'https://www.youtube.com/embed/hN_q-_nGv4U' },
    { title: 'Divenire', artist: 'Ludovico Einaudi', genre: 'Classical', embedUrl: 'https://www.youtube.com/embed/h4OqHMGnlgk' },
    { title: 'Brain Food Mix', artist: 'Various Artists', genre: 'Ambient', embedUrl: 'https://www.youtube.com/embed/WPni755-Krg' },
    { title: 'Comptine d\'un autre été', artist: 'Yann Tiersen', genre: 'Classical', embedUrl: 'https://www.youtube.com/embed/yoC0KH5BVEM' },
    { title: 'Study Music Alpha Waves', artist: 'YellowBrickCinema', genre: 'Ambient', embedUrl: 'https://www.youtube.com/embed/WD6DpKMBFMc' },
    { title: 'Jazz for Study', artist: 'Various Artists', genre: 'Jazz', embedUrl: 'https://www.youtube.com/embed/Dx5qFachd3A' },
    { title: 'Deep Focus Mix', artist: 'Various Artists', genre: 'Electronic', embedUrl: 'https://www.youtube.com/embed/b5ZESpOAolY' },
  ],
  party: [
    { title: 'As It Was', artist: 'Harry Styles', genre: 'Pop', embedUrl: 'https://www.youtube.com/embed/H5v3kku4y6Q' },
    { title: 'Dynamite', artist: 'BTS', genre: 'K-Pop', embedUrl: 'https://www.youtube.com/embed/gdZLi9oWNZg' },
    { title: 'Dance Monkey', artist: 'Tones and I', genre: 'Pop', embedUrl: 'https://www.youtube.com/embed/q0hyYWKXF0Q' },
    { title: 'Watermelon Sugar', artist: 'Harry Styles', genre: 'Pop', embedUrl: 'https://www.youtube.com/embed/E07s5ZYygMg' },
    { title: 'Savage Love', artist: 'Jawsh 685 & Jason Derulo', genre: 'Pop', embedUrl: 'https://www.youtube.com/embed/FX9iFkFpFiI' },
    { title: 'Peaches', artist: 'Justin Bieber', genre: 'R&B', embedUrl: 'https://www.youtube.com/embed/tQ0yjYMzekg' },
    { title: 'Butter', artist: 'BTS', genre: 'K-Pop', embedUrl: 'https://www.youtube.com/embed/WMweEpGlu_U' },
    { title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', genre: 'Pop', embedUrl: 'https://www.youtube.com/embed/kTJczUoc26U' },
  ],
};

export const moodCategories = [
  { id: 'happy', label: 'Happy', emoji: '😊', color: 'from-yellow-400/20 to-orange-300/20', borderColor: 'border-yellow-400/40' },
  { id: 'sad', label: 'Sad', emoji: '😔', color: 'from-blue-400/20 to-indigo-300/20', borderColor: 'border-blue-400/40' },
  { id: 'calm', label: 'Calm', emoji: '😌', color: 'from-teal-400/20 to-cyan-300/20', borderColor: 'border-teal-400/40' },
  { id: 'energetic', label: 'Energetic', emoji: '⚡', color: 'from-red-400/20 to-orange-400/20', borderColor: 'border-red-400/40' },
  { id: 'anxious', label: 'Anxious', emoji: '😰', color: 'from-purple-400/20 to-violet-300/20', borderColor: 'border-purple-400/40' },
  { id: 'angry', label: 'Angry', emoji: '😤', color: 'from-rose-500/20 to-red-400/20', borderColor: 'border-rose-500/40' },
  { id: 'focus', label: 'Focus', emoji: '🎯', color: 'from-green-400/20 to-emerald-300/20', borderColor: 'border-green-400/40' },
  { id: 'party', label: 'Party', emoji: '🎉', color: 'from-pink-400/20 to-fuchsia-300/20', borderColor: 'border-pink-400/40' },
];

// Music links based on mood with pop artists (legacy support)
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
      { title: 'Stress Relief Techniques', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Relaxation Exercises', url: 'https://www.healthline.com/health/self-care-strategies' },
      { title: 'Mindful Self-Care', url: 'https://self-compassion.org/category/exercises/' },
    ],
    tired: [
      { title: 'Rest & Recovery Tips', url: 'https://www.healthline.com/health/self-care-strategies' },
      { title: 'Energy Restoration', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Sleep Hygiene Guide', url: 'https://www.sleepfoundation.org/sleep-hygiene' },
    ],
    overwhelmed: [
      { title: 'Grounding Techniques', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Simplify Your Day', url: 'https://www.healthline.com/health/self-care-strategies' },
      { title: 'Overwhelm Relief', url: 'https://self-compassion.org/category/exercises/' },
    ],
    happy: [
      { title: 'Celebrate Yourself', url: 'https://www.healthline.com/health/self-care-strategies' },
      { title: 'Joyful Self-Care', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Gratitude Practices', url: 'https://self-compassion.org/category/exercises/' },
    ],
    excited: [
      { title: 'Channel Your Energy', url: 'https://www.healthline.com/health/self-care-strategies' },
      { title: 'Creative Self-Care', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Mindful Excitement', url: 'https://self-compassion.org/category/exercises/' },
    ],
    grateful: [
      { title: 'Gratitude Journaling', url: 'https://self-compassion.org/category/exercises/' },
      { title: 'Appreciation Practices', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Thankfulness Rituals', url: 'https://www.healthline.com/health/self-care-strategies' },
    ],
    anxious: [
      { title: 'Anxiety Relief Techniques', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Calming Self-Care', url: 'https://self-compassion.org/category/exercises/' },
      { title: 'Grounding Exercises', url: 'https://www.healthline.com/health/self-care-strategies' },
    ],
    angry: [
      { title: 'Anger Management Tips', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Release & Reset', url: 'https://www.healthline.com/health/self-care-strategies' },
      { title: 'Cooling Down Practices', url: 'https://self-compassion.org/category/exercises/' },
    ],
    confused: [
      { title: 'Clarity Practices', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Decision-Making Self-Care', url: 'https://www.healthline.com/health/self-care-strategies' },
      { title: 'Mindful Reflection', url: 'https://self-compassion.org/category/exercises/' },
    ],
    peaceful: [
      { title: 'Maintain Your Peace', url: 'https://self-compassion.org/category/exercises/' },
      { title: 'Serene Self-Care', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
      { title: 'Tranquil Practices', url: 'https://www.healthline.com/health/self-care-strategies' },
    ],
  };

  return selfCareMap[mood] || selfCareMap.happy;
}

// Meditation links based on mood
export function getMeditationLinks(mood: string): ResourceLink[] {
  const meditationMap: Record<string, ResourceLink[]> = {
    sad: [
      { title: 'Loving-Kindness Meditation', url: 'https://www.youtube.com/watch?v=sz7cpV7ERsM' },
      { title: 'Healing Meditation', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Grief & Loss Meditation', url: 'https://www.youtube.com/watch?v=1vx8iUvfyCY' },
    ],
    lonely: [
      { title: 'Connection Meditation', url: 'https://www.youtube.com/watch?v=sz7cpV7ERsM' },
      { title: 'Self-Love Meditation', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Belonging Meditation', url: 'https://www.youtube.com/watch?v=1vx8iUvfyCY' },
    ],
    stressed: [
      { title: 'Stress Relief Meditation', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Body Scan Meditation', url: 'https://www.youtube.com/watch?v=QS2yDmWk0vs' },
      { title: 'Breathing Meditation', url: 'https://www.youtube.com/watch?v=wfDTp2GogaQ' },
    ],
    tired: [
      { title: 'Restorative Meditation', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Sleep Meditation', url: 'https://www.youtube.com/watch?v=1vx8iUvfyCY' },
      { title: 'Yoga Nidra', url: 'https://www.youtube.com/watch?v=M0u9GST_j3s' },
    ],
    overwhelmed: [
      { title: 'Grounding Meditation', url: 'https://www.youtube.com/watch?v=QS2yDmWk0vs' },
      { title: 'Simplicity Meditation', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Clarity Meditation', url: 'https://www.youtube.com/watch?v=1vx8iUvfyCY' },
    ],
    happy: [
      { title: 'Gratitude Meditation', url: 'https://www.youtube.com/watch?v=sz7cpV7ERsM' },
      { title: 'Joy Meditation', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Abundance Meditation', url: 'https://www.youtube.com/watch?v=1vx8iUvfyCY' },
    ],
    excited: [
      { title: 'Mindful Energy Meditation', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Focus Meditation', url: 'https://www.youtube.com/watch?v=QS2yDmWk0vs' },
      { title: 'Channeling Excitement', url: 'https://www.youtube.com/watch?v=1vx8iUvfyCY' },
    ],
    grateful: [
      { title: 'Gratitude Meditation', url: 'https://www.youtube.com/watch?v=sz7cpV7ERsM' },
      { title: 'Appreciation Meditation', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Thankfulness Practice', url: 'https://www.youtube.com/watch?v=1vx8iUvfyCY' },
    ],
    anxious: [
      { title: '5-Minute Anxiety Relief', url: 'https://www.youtube.com/watch?v=wfDTp2GogaQ' },
      { title: 'Calming Breath Meditation', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Anxiety Grounding', url: 'https://www.youtube.com/watch?v=QS2yDmWk0vs' },
    ],
    angry: [
      { title: 'Anger Release Meditation', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Cooling Down Meditation', url: 'https://www.youtube.com/watch?v=QS2yDmWk0vs' },
      { title: 'Peace Meditation', url: 'https://www.youtube.com/watch?v=sz7cpV7ERsM' },
    ],
    confused: [
      { title: 'Clarity Meditation', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Decision Meditation', url: 'https://www.youtube.com/watch?v=QS2yDmWk0vs' },
      { title: 'Insight Meditation', url: 'https://www.youtube.com/watch?v=1vx8iUvfyCY' },
    ],
    peaceful: [
      { title: 'Deepening Peace Meditation', url: 'https://www.youtube.com/watch?v=sz7cpV7ERsM' },
      { title: 'Serenity Meditation', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Tranquility Practice', url: 'https://www.youtube.com/watch?v=1vx8iUvfyCY' },
    ],
  };

  return meditationMap[mood] || meditationMap.happy;
}

// What to watch links based on mood
export function getWatchLinks(mood: string): ResourceLink[] {
  const watchMap: Record<string, ResourceLink[]> = {
    sad: [
      { title: 'Uplifting Movie Recommendations', url: 'https://www.imdb.com/list/ls055592025/' },
      { title: 'Feel-Good Shows', url: 'https://www.netflix.com/browse/genre/26' },
      { title: 'Comfort Movies', url: 'https://www.imdb.com/list/ls055592025/' },
    ],
    lonely: [
      { title: 'Friendship Movies', url: 'https://www.imdb.com/list/ls055592025/' },
      { title: 'Community Shows', url: 'https://www.netflix.com/browse/genre/26' },
      { title: 'Heartwarming Films', url: 'https://www.imdb.com/list/ls055592025/' },
    ],
    stressed: [
      { title: 'Comedy Specials', url: 'https://www.netflix.com/browse/genre/11559' },
      { title: 'Light-Hearted Shows', url: 'https://www.netflix.com/browse/genre/26' },
      { title: 'Nature Documentaries', url: 'https://www.netflix.com/browse/genre/48768' },
    ],
    tired: [
      { title: 'Relaxing Nature Docs', url: 'https://www.netflix.com/browse/genre/48768' },
      { title: 'Cozy Shows', url: 'https://www.netflix.com/browse/genre/26' },
      { title: 'Gentle Animations', url: 'https://www.netflix.com/browse/genre/11881' },
    ],
    overwhelmed: [
      { title: 'Simple Comedies', url: 'https://www.netflix.com/browse/genre/11559' },
      { title: 'Short Episodes Shows', url: 'https://www.netflix.com/browse/genre/26' },
      { title: 'Mindful Documentaries', url: 'https://www.netflix.com/browse/genre/48768' },
    ],
    happy: [
      { title: 'Adventure Movies', url: 'https://www.netflix.com/browse/genre/7442' },
      { title: 'Musical Films', url: 'https://www.netflix.com/browse/genre/13335' },
      { title: 'Comedy Shows', url: 'https://www.netflix.com/browse/genre/11559' },
    ],
    excited: [
      { title: 'Action Movies', url: 'https://www.netflix.com/browse/genre/801362' },
      { title: 'Thriller Shows', url: 'https://www.netflix.com/browse/genre/8933' },
      { title: 'Sci-Fi Films', url: 'https://www.netflix.com/browse/genre/1492' },
    ],
    grateful: [
      { title: 'Inspirational Documentaries', url: 'https://www.netflix.com/browse/genre/48768' },
      { title: 'Heartwarming Stories', url: 'https://www.imdb.com/list/ls055592025/' },
      { title: 'Uplifting Films', url: 'https://www.netflix.com/browse/genre/26' },
    ],
    anxious: [
      { title: 'Calming Nature Docs', url: 'https://www.netflix.com/browse/genre/48768' },
      { title: 'Light Comedies', url: 'https://www.netflix.com/browse/genre/11559' },
      { title: 'Soothing Animations', url: 'https://www.netflix.com/browse/genre/11881' },
    ],
    angry: [
      { title: 'Action Release Films', url: 'https://www.netflix.com/browse/genre/801362' },
      { title: 'Sports Documentaries', url: 'https://www.netflix.com/browse/genre/48768' },
      { title: 'Empowering Stories', url: 'https://www.imdb.com/list/ls055592025/' },
    ],
    confused: [
      { title: 'Thought-Provoking Films', url: 'https://www.imdb.com/list/ls055592025/' },
      { title: 'Philosophical Documentaries', url: 'https://www.netflix.com/browse/genre/48768' },
      { title: 'Mystery Shows', url: 'https://www.netflix.com/browse/genre/9994' },
    ],
    peaceful: [
      { title: 'Nature Documentaries', url: 'https://www.netflix.com/browse/genre/48768' },
      { title: 'Peaceful Animations', url: 'https://www.netflix.com/browse/genre/11881' },
      { title: 'Serene Films', url: 'https://www.imdb.com/list/ls055592025/' },
    ],
  };

  return watchMap[mood] || watchMap.happy;
}

// Journaling prompts based on mood
export function getJournalingPrompts(mood: string): ResourceLink[] {
  const journalingMap: Record<string, ResourceLink[]> = {
    sad: [
      { title: 'Processing Sadness Prompts', url: 'https://www.journalbuddha.com/sad-journal-prompts/' },
      { title: 'Healing Writing Exercises', url: 'https://www.journalbuddha.com/healing-journal-prompts/' },
      { title: 'Emotional Release Journaling', url: 'https://www.journalbuddha.com/emotional-journal-prompts/' },
    ],
    lonely: [
      { title: 'Connection Journaling', url: 'https://www.journalbuddha.com/loneliness-journal-prompts/' },
      { title: 'Self-Discovery Prompts', url: 'https://www.journalbuddha.com/self-discovery-journal-prompts/' },
      { title: 'Relationship Reflection', url: 'https://www.journalbuddha.com/relationship-journal-prompts/' },
    ],
    stressed: [
      { title: 'Stress Relief Journaling', url: 'https://www.journalbuddha.com/stress-journal-prompts/' },
      { title: 'Clarity Writing Prompts', url: 'https://www.journalbuddha.com/clarity-journal-prompts/' },
      { title: 'Problem-Solving Journal', url: 'https://www.journalbuddha.com/problem-solving-journal-prompts/' },
    ],
    tired: [
      { title: 'Rest & Renewal Prompts', url: 'https://www.journalbuddha.com/rest-journal-prompts/' },
      { title: 'Energy Journaling', url: 'https://www.journalbuddha.com/energy-journal-prompts/' },
      { title: 'Self-Care Reflection', url: 'https://www.journalbuddha.com/self-care-journal-prompts/' },
    ],
    overwhelmed: [
      { title: 'Simplify Your Life Prompts', url: 'https://www.journalbuddha.com/overwhelm-journal-prompts/' },
      { title: 'Priority Setting Journal', url: 'https://www.journalbuddha.com/priority-journal-prompts/' },
      { title: 'Grounding Writing', url: 'https://www.journalbuddha.com/grounding-journal-prompts/' },
    ],
    happy: [
      { title: 'Gratitude Journaling', url: 'https://www.journalbuddha.com/gratitude-journal-prompts/' },
      { title: 'Joy Amplification Prompts', url: 'https://www.journalbuddha.com/joy-journal-prompts/' },
      { title: 'Celebration Writing', url: 'https://www.journalbuddha.com/celebration-journal-prompts/' },
    ],
    excited: [
      { title: 'Goal Setting Journal', url: 'https://www.journalbuddha.com/goal-journal-prompts/' },
      { title: 'Vision Board Writing', url: 'https://www.journalbuddha.com/vision-journal-prompts/' },
      { title: 'Excitement Channeling', url: 'https://www.journalbuddha.com/excitement-journal-prompts/' },
    ],
    grateful: [
      { title: 'Deep Gratitude Prompts', url: 'https://www.journalbuddha.com/gratitude-journal-prompts/' },
      { title: 'Appreciation Writing', url: 'https://www.journalbuddha.com/appreciation-journal-prompts/' },
      { title: 'Thankfulness Journal', url: 'https://www.journalbuddha.com/thankfulness-journal-prompts/' },
    ],
    anxious: [
      { title: 'Anxiety Relief Prompts', url: 'https://www.journalbuddha.com/anxiety-journal-prompts/' },
      { title: 'Worry Journaling', url: 'https://www.journalbuddha.com/worry-journal-prompts/' },
      { title: 'Calm Writing Exercises', url: 'https://www.journalbuddha.com/calm-journal-prompts/' },
    ],
    angry: [
      { title: 'Anger Processing Prompts', url: 'https://www.journalbuddha.com/anger-journal-prompts/' },
      { title: 'Perspective Writing', url: 'https://www.journalbuddha.com/perspective-journal-prompts/' },
      { title: 'Release & Forgiveness', url: 'https://www.journalbuddha.com/forgiveness-journal-prompts/' },
    ],
    confused: [
      { title: 'Clarity Seeking Prompts', url: 'https://www.journalbuddha.com/clarity-journal-prompts/' },
      { title: 'Decision Making Journal', url: 'https://www.journalbuddha.com/decision-journal-prompts/' },
      { title: 'Insight Writing', url: 'https://www.journalbuddha.com/insight-journal-prompts/' },
    ],
    peaceful: [
      { title: 'Deepening Peace Prompts', url: 'https://www.journalbuddha.com/peace-journal-prompts/' },
      { title: 'Serenity Writing', url: 'https://www.journalbuddha.com/serenity-journal-prompts/' },
      { title: 'Mindful Reflection', url: 'https://www.journalbuddha.com/mindful-journal-prompts/' },
    ],
  };

  return journalingMap[mood] || journalingMap.happy;
}
