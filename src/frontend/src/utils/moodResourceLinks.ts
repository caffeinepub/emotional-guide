export interface ResourceLink {
  title: string;
  url: string;
}

// Food recipe links based on mood
export function getFoodLinks(mood: string): ResourceLink[] {
  const foodMap: Record<string, ResourceLink[]> = {
    sad: [
      { title: 'Warm Comfort Soup', url: 'https://www.allrecipes.com/recipe/13978/lentil-soup/' },
      { title: 'Mac and Cheese', url: 'https://www.allrecipes.com/recipe/11679/homemade-mac-and-cheese/' },
      { title: 'Chocolate Chip Cookies', url: 'https://www.allrecipes.com/recipe/10813/best-chocolate-chip-cookies/' },
    ],
    lonely: [
      { title: 'Warm Comfort Soup', url: 'https://www.allrecipes.com/recipe/13978/lentil-soup/' },
      { title: 'Grilled Cheese', url: 'https://www.allrecipes.com/recipe/23891/grilled-cheese-sandwich/' },
      { title: 'Hot Chocolate', url: 'https://www.allrecipes.com/recipe/22588/creamy-hot-chocolate/' },
    ],
    stressed: [
      { title: 'Calming Herbal Tea', url: 'https://www.allrecipes.com/article/herbal-tea-recipes/' },
      { title: 'Avocado Toast', url: 'https://www.allrecipes.com/recipe/240027/avocado-toast/' },
      { title: 'Smoothie Bowl', url: 'https://www.allrecipes.com/recipe/260179/smoothie-bowl/' },
    ],
    tired: [
      { title: 'Energy Boost Smoothie', url: 'https://www.allrecipes.com/recipe/229816/green-smoothie/' },
      { title: 'Protein Power Bowl', url: 'https://www.allrecipes.com/recipe/244716/quinoa-power-bowl/' },
      { title: 'Banana Oatmeal', url: 'https://www.allrecipes.com/recipe/213893/banana-oatmeal/' },
    ],
    overwhelmed: [
      { title: 'Simple Pasta', url: 'https://www.allrecipes.com/recipe/11691/simple-pasta/' },
      { title: 'Calming Tea', url: 'https://www.allrecipes.com/article/herbal-tea-recipes/' },
      { title: 'Easy Stir Fry', url: 'https://www.allrecipes.com/recipe/223382/easy-chicken-stir-fry/' },
    ],
    happy: [
      { title: 'Celebration Cake', url: 'https://www.allrecipes.com/recipe/17981/one-bowl-chocolate-cake/' },
      { title: 'Fruit Salad', url: 'https://www.allrecipes.com/recipe/214947/summer-fruit-salad/' },
      { title: 'Homemade Pizza', url: 'https://www.allrecipes.com/recipe/20171/quick-and-easy-pizza-crust/' },
    ],
    excited: [
      { title: 'Party Nachos', url: 'https://www.allrecipes.com/recipe/23600/restaurant-style-nachos/' },
      { title: 'Celebration Cake', url: 'https://www.allrecipes.com/recipe/17981/one-bowl-chocolate-cake/' },
      { title: 'Festive Punch', url: 'https://www.allrecipes.com/recipe/16521/party-punch/' },
    ],
    grateful: [
      { title: 'Gratitude Bowl', url: 'https://www.allrecipes.com/recipe/244716/quinoa-power-bowl/' },
      { title: 'Fresh Salad', url: 'https://www.allrecipes.com/recipe/14276/restaurant-style-house-salad/' },
      { title: 'Herbal Tea', url: 'https://www.allrecipes.com/article/herbal-tea-recipes/' },
    ],
    anxious: [
      { title: 'Calming Herbal Tea', url: 'https://www.allrecipes.com/article/herbal-tea-recipes/' },
      { title: 'Warm Oatmeal', url: 'https://www.allrecipes.com/recipe/213893/banana-oatmeal/' },
      { title: 'Comfort Soup', url: 'https://www.allrecipes.com/recipe/13978/lentil-soup/' },
    ],
    angry: [
      { title: 'Spicy Stir Fry', url: 'https://www.allrecipes.com/recipe/223382/easy-chicken-stir-fry/' },
      { title: 'Power Smoothie', url: 'https://www.allrecipes.com/recipe/229816/green-smoothie/' },
      { title: 'Energy Bowl', url: 'https://www.allrecipes.com/recipe/244716/quinoa-power-bowl/' },
    ],
    confused: [
      { title: 'Simple Comfort Food', url: 'https://www.allrecipes.com/recipe/11679/homemade-mac-and-cheese/' },
      { title: 'Warm Tea', url: 'https://www.allrecipes.com/article/herbal-tea-recipes/' },
      { title: 'Easy Pasta', url: 'https://www.allrecipes.com/recipe/11691/simple-pasta/' },
    ],
    peaceful: [
      { title: 'Zen Garden Salad', url: 'https://www.allrecipes.com/recipe/14276/restaurant-style-house-salad/' },
      { title: 'Herbal Tea', url: 'https://www.allrecipes.com/article/herbal-tea-recipes/' },
      { title: 'Light Soup', url: 'https://www.allrecipes.com/recipe/13978/lentil-soup/' },
    ],
  };

  return foodMap[mood] || foodMap.happy;
}

// Popular music links based on mood with pop artists
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
      { title: 'Zen Music', url: 'https://www.youtube.com/watch?v=lFcSrYw-ARY' },
    ],
  };

  return musicMap[mood] || musicMap.happy;
}

// Short story links based on mood
export function getStoryLinks(mood: string): ResourceLink[] {
  const storyMap: Record<string, ResourceLink[]> = {
    sad: [
      { title: 'The Gift of the Magi', url: 'https://americanliterature.com/author/o-henry/short-story/the-gift-of-the-magi' },
      { title: 'The Last Leaf', url: 'https://americanliterature.com/author/o-henry/short-story/the-last-leaf' },
      { title: 'A Cup of Tea', url: 'https://www.eastoftheweb.com/short-stories/UBooks/CupTea.shtml' },
    ],
    lonely: [
      { title: 'The Little Match Girl', url: 'https://americanliterature.com/author/hans-christian-andersen/short-story/the-little-match-girl' },
      { title: 'The Necklace', url: 'https://americanliterature.com/author/guy-de-maupassant/short-story/the-necklace' },
      { title: 'A Retrieved Reformation', url: 'https://americanliterature.com/author/o-henry/short-story/a-retrieved-reformation' },
    ],
    stressed: [
      { title: 'The Secret Life of Walter Mitty', url: 'https://www.newyorker.com/magazine/1939/03/18/the-secret-life-of-walter-mitty' },
      { title: 'The Egg', url: 'http://www.galactanet.com/oneoff/theegg_mod.html' },
      { title: 'The Lottery', url: 'https://www.newyorker.com/magazine/1948/06/26/the-lottery' },
    ],
    tired: [
      { title: 'The Veldt', url: 'https://www.veddma.com/veddma/Veldt.htm' },
      { title: 'The Tell-Tale Heart', url: 'https://americanliterature.com/author/edgar-allan-poe/short-story/the-tell-tale-heart' },
      { title: 'The Yellow Wallpaper', url: 'https://www.nlm.nih.gov/exhibition/theliteratureofprescription/exhibitionAssets/digitalDocs/The-Yellow-Wall-Paper.pdf' },
    ],
    overwhelmed: [
      { title: 'The Egg', url: 'http://www.galactanet.com/oneoff/theegg_mod.html' },
      { title: 'The Most Dangerous Game', url: 'https://www.classicshorts.com/stories/danger.html' },
      { title: 'An Occurrence at Owl Creek Bridge', url: 'https://americanliterature.com/author/ambrose-bierce/short-story/an-occurrence-at-owl-creek-bridge' },
    ],
    happy: [
      { title: 'The Gift of the Magi', url: 'https://americanliterature.com/author/o-henry/short-story/the-gift-of-the-magi' },
      { title: 'The Ransom of Red Chief', url: 'https://americanliterature.com/author/o-henry/short-story/the-ransom-of-red-chief' },
      { title: 'The Celebrated Jumping Frog', url: 'https://americanliterature.com/author/mark-twain/short-story/the-celebrated-jumping-frog-of-calaveras-county' },
    ],
    excited: [
      { title: 'The Most Dangerous Game', url: 'https://www.classicshorts.com/stories/danger.html' },
      { title: 'The Adventure of the Speckled Band', url: 'https://americanliterature.com/author/arthur-conan-doyle/short-story/the-adventure-of-the-speckled-band' },
      { title: 'The Cask of Amontillado', url: 'https://americanliterature.com/author/edgar-allan-poe/short-story/the-cask-of-amontillado' },
    ],
    grateful: [
      { title: 'The Gift of the Magi', url: 'https://americanliterature.com/author/o-henry/short-story/the-gift-of-the-magi' },
      { title: 'A Retrieved Reformation', url: 'https://americanliterature.com/author/o-henry/short-story/a-retrieved-reformation' },
      { title: 'The Last Leaf', url: 'https://americanliterature.com/author/o-henry/short-story/the-last-leaf' },
    ],
    anxious: [
      { title: 'The Tell-Tale Heart', url: 'https://americanliterature.com/author/edgar-allan-poe/short-story/the-tell-tale-heart' },
      { title: 'The Yellow Wallpaper', url: 'https://www.nlm.nih.gov/exhibition/theliteratureofprescription/exhibitionAssets/digitalDocs/The-Yellow-Wall-Paper.pdf' },
      { title: 'The Lottery', url: 'https://www.newyorker.com/magazine/1948/06/26/the-lottery' },
    ],
    angry: [
      { title: 'The Cask of Amontillado', url: 'https://americanliterature.com/author/edgar-allan-poe/short-story/the-cask-of-amontillado' },
      { title: 'Lamb to the Slaughter', url: 'https://www.classicshorts.com/stories/lamb.html' },
      { title: 'The Most Dangerous Game', url: 'https://www.classicshorts.com/stories/danger.html' },
    ],
    confused: [
      { title: 'The Egg', url: 'http://www.galactanet.com/oneoff/theegg_mod.html' },
      { title: 'An Occurrence at Owl Creek Bridge', url: 'https://americanliterature.com/author/ambrose-bierce/short-story/an-occurrence-at-owl-creek-bridge' },
      { title: 'The Secret Life of Walter Mitty', url: 'https://www.newyorker.com/magazine/1939/03/18/the-secret-life-of-walter-mitty' },
    ],
    peaceful: [
      { title: 'The Last Leaf', url: 'https://americanliterature.com/author/o-henry/short-story/the-last-leaf' },
      { title: 'A Cup of Tea', url: 'https://www.eastoftheweb.com/short-stories/UBooks/CupTea.shtml' },
      { title: 'The Gift of the Magi', url: 'https://americanliterature.com/author/o-henry/short-story/the-gift-of-the-magi' },
    ],
  };

  return storyMap[mood] || storyMap.happy;
}

// Self-care routine links based on mood
export function getSelfCareLinks(mood: string): ResourceLink[] {
  const selfCareMap: Record<string, ResourceLink[]> = {
    sad: [
      { title: '5-Minute Meditation', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Gentle Yoga for Sadness', url: 'https://www.youtube.com/watch?v=COp7BR_Dvps' },
      { title: 'Self-Care Checklist', url: 'https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729' },
    ],
    lonely: [
      { title: 'Loving-Kindness Meditation', url: 'https://www.youtube.com/watch?v=sz7cpV7ERsM' },
      { title: 'Connect with Others', url: 'https://www.mentalhealth.org.uk/explore-mental-health/publications/how-connect-people' },
      { title: 'Self-Compassion Exercise', url: 'https://self-compassion.org/category/exercises/' },
    ],
    stressed: [
      { title: 'Deep Breathing Exercise', url: 'https://www.youtube.com/watch?v=tybOi4hjZFQ' },
      { title: 'Progressive Muscle Relaxation', url: 'https://www.youtube.com/watch?v=86HUcX8ZtAk' },
      { title: 'Stress Management Tips', url: 'https://www.helpguide.org/articles/stress/stress-management.htm' },
    ],
    tired: [
      { title: 'Power Nap Guide', url: 'https://www.sleepfoundation.org/sleep-hygiene/napping' },
      { title: 'Gentle Stretching', url: 'https://www.youtube.com/watch?v=g_tea8ZNk5A' },
      { title: 'Energy Boosting Tips', url: 'https://www.healthline.com/nutrition/17-tips-to-sleep-better' },
    ],
    overwhelmed: [
      { title: 'Grounding Technique', url: 'https://www.youtube.com/watch?v=30VMIEmA114' },
      { title: 'Simplify Your Day', url: 'https://www.becomingminimalist.com/thin/' },
      { title: 'Mindfulness Exercise', url: 'https://www.mindful.org/meditation/mindfulness-getting-started/' },
    ],
    happy: [
      { title: 'Gratitude Journal', url: 'https://positivepsychology.com/gratitude-journal/' },
      { title: 'Share Your Joy', url: 'https://www.psychologytoday.com/us/blog/click-here-happiness/201807/the-power-sharing-positive-experiences' },
      { title: 'Celebrate Yourself', url: 'https://www.verywellmind.com/how-to-practice-self-love-4842839' },
    ],
    excited: [
      { title: 'Channel Your Energy', url: 'https://www.healthline.com/health/mental-health/how-to-calm-down' },
      { title: 'Creative Expression', url: 'https://www.psychologytoday.com/us/blog/arts-and-health/202001/the-connection-between-art-healing-and-public-health' },
      { title: 'Physical Activity', url: 'https://www.youtube.com/watch?v=L_xrDAtykMI' },
    ],
    grateful: [
      { title: 'Gratitude Meditation', url: 'https://www.youtube.com/watch?v=nj-F0FpTK5c' },
      { title: 'Write Thank You Notes', url: 'https://www.health.harvard.edu/healthbeat/giving-thanks-can-make-you-happier' },
      { title: 'Mindful Appreciation', url: 'https://www.mindful.org/an-introduction-to-mindful-gratitude/' },
    ],
    anxious: [
      { title: '4-7-8 Breathing', url: 'https://www.youtube.com/watch?v=gz4G31LGyog' },
      { title: 'Anxiety Relief Yoga', url: 'https://www.youtube.com/watch?v=_zbtKeeAa-Y' },
      { title: 'Grounding Techniques', url: 'https://www.healthline.com/health/grounding-techniques' },
    ],
    angry: [
      { title: 'Anger Management', url: 'https://www.apa.org/topics/anger/control' },
      { title: 'Physical Release Exercise', url: 'https://www.youtube.com/watch?v=L_xrDAtykMI' },
      { title: 'Cooling Down Techniques', url: 'https://www.verywellmind.com/anger-management-strategies-4178870' },
    ],
    confused: [
      { title: 'Clarity Meditation', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Journaling Prompts', url: 'https://positivepsychology.com/therapy-journal/' },
      { title: 'Decision Making Guide', url: 'https://www.mindtools.com/pages/article/newTED_00.htm' },
    ],
    peaceful: [
      { title: 'Mindful Walking', url: 'https://www.youtube.com/watch?v=ET88eFN28Ks' },
      { title: 'Nature Sounds', url: 'https://www.youtube.com/watch?v=eKFTSSKCzWA' },
      { title: 'Peaceful Meditation', url: 'https://www.youtube.com/watch?v=lFcSrYw-ARY' },
    ],
  };

  return selfCareMap[mood] || selfCareMap.happy;
}

// Video links based on mood with pop artists and music videos
export function getVideoLinks(mood: string): ResourceLink[] {
  const videoMap: Record<string, ResourceLink[]> = {
    sad: [
      { title: 'Taylor Swift - All Too Well', url: 'https://www.youtube.com/watch?v=tollGa3S0o8' },
      { title: 'Adele - Hello', url: 'https://www.youtube.com/watch?v=YQHsXMglC9A' },
      { title: 'Sad Movie Clips Compilation', url: 'https://www.youtube.com/watch?v=JW68goC4_es' },
    ],
    lonely: [
      { title: 'Sam Smith - Stay With Me', url: 'https://www.youtube.com/watch?v=pB-5XG-DbAA' },
      { title: 'Shawn Mendes - In My Blood', url: 'https://www.youtube.com/watch?v=36tggrpRoTI' },
      { title: 'Heartwarming Stories', url: 'https://www.youtube.com/watch?v=cZGghmwUcbQ' },
    ],
    stressed: [
      { title: 'Ed Sheeran - Photograph', url: 'https://www.youtube.com/watch?v=nSDgHBxUbVQ' },
      { title: 'Relaxing Nature Videos', url: 'https://www.youtube.com/watch?v=lE6RYpe9IT0' },
      { title: 'Calming Ocean Waves', url: 'https://www.youtube.com/watch?v=WHPEKLQID4U' },
    ],
    tired: [
      { title: 'Sleep Music Video', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' },
      { title: 'Relaxing Spa Music', url: 'https://www.youtube.com/watch?v=lFcSrYw-ARY' },
      { title: 'Peaceful Scenery', url: 'https://www.youtube.com/watch?v=eKFTSSKCzWA' },
    ],
    overwhelmed: [
      { title: 'Meditation Video', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Peaceful Nature Scenes', url: 'https://www.youtube.com/watch?v=lE6RYpe9IT0' },
      { title: 'Calming Visuals', url: 'https://www.youtube.com/watch?v=eKFTSSKCzWA' },
    ],
    happy: [
      { title: 'Taylor Swift - Shake It Off', url: 'https://www.youtube.com/watch?v=nfWlot6h_JM' },
      { title: 'Pharrell Williams - Happy', url: 'https://www.youtube.com/watch?v=ZbZSe6N_BXs' },
      { title: 'Funny Animal Videos', url: 'https://www.youtube.com/watch?v=hY7m5jjJ9mM' },
    ],
    excited: [
      { title: 'Katy Perry - Firework', url: 'https://www.youtube.com/watch?v=QGJuMBdaqIw' },
      { title: 'Mark Ronson - Uptown Funk', url: 'https://www.youtube.com/watch?v=OPf0YbXqDm0' },
      { title: 'Epic Moments Compilation', url: 'https://www.youtube.com/watch?v=Cbk980jV7Ao' },
    ],
    grateful: [
      { title: 'John Legend - All of Me', url: 'https://www.youtube.com/watch?v=450p7goxZqg' },
      { title: 'Inspirational Stories', url: 'https://www.youtube.com/watch?v=cZGghmwUcbQ' },
      { title: 'Gratitude Meditation', url: 'https://www.youtube.com/watch?v=nj-F0FpTK5c' },
    ],
    anxious: [
      { title: 'Calming Nature Scenes', url: 'https://www.youtube.com/watch?v=eKFTSSKCzWA' },
      { title: 'Guided Meditation', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Peaceful Music Video', url: 'https://www.youtube.com/watch?v=lFcSrYw-ARY' },
    ],
    angry: [
      { title: 'Katy Perry - Roar', url: 'https://www.youtube.com/watch?v=CevxZvSJLk8' },
      { title: 'Imagine Dragons - Believer', url: 'https://www.youtube.com/watch?v=7wtfhZwyrcc' },
      { title: 'Workout Motivation', url: 'https://www.youtube.com/watch?v=L_xrDAtykMI' },
    ],
    confused: [
      { title: 'Meditation for Clarity', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { title: 'Peaceful Visuals', url: 'https://www.youtube.com/watch?v=eKFTSSKCzWA' },
      { title: 'Calming Music', url: 'https://www.youtube.com/watch?v=lFcSrYw-ARY' },
    ],
    peaceful: [
      { title: 'Jack Johnson - Better Together', url: 'https://www.youtube.com/watch?v=seZMONy5w7c' },
      { title: 'Nature Documentary', url: 'https://www.youtube.com/watch?v=lE6RYpe9IT0' },
      { title: 'Zen Garden Video', url: 'https://www.youtube.com/watch?v=eKFTSSKCzWA' },
    ],
  };

  return videoMap[mood] || videoMap.happy;
}
