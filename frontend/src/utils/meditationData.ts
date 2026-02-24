export interface MeditationTechnique {
  name: string;
  description: string;
  duration: string;
  category: string;
  resourceUrl: string;
}

export interface MeditationMoodCategory {
  id: string;
  label: string;
  emoji: string;
  color: string;
  borderColor: string;
  tagline: string;
}

export const meditationMoodCategories: MeditationMoodCategory[] = [
  {
    id: 'calm',
    label: 'Calm',
    emoji: '😌',
    color: 'from-teal-400/20 to-cyan-300/20',
    borderColor: 'border-teal-400/40',
    tagline: 'Deepen your peace',
  },
  {
    id: 'anxious',
    label: 'Anxious',
    emoji: '😰',
    color: 'from-purple-400/20 to-violet-300/20',
    borderColor: 'border-purple-400/40',
    tagline: 'Ease your worries',
  },
  {
    id: 'sad',
    label: 'Sad',
    emoji: '😔',
    color: 'from-blue-400/20 to-indigo-300/20',
    borderColor: 'border-blue-400/40',
    tagline: 'Gentle comfort',
  },
  {
    id: 'happy',
    label: 'Happy',
    emoji: '😊',
    color: 'from-yellow-400/20 to-orange-300/20',
    borderColor: 'border-yellow-400/40',
    tagline: 'Amplify your joy',
  },
  {
    id: 'stressed',
    label: 'Stressed',
    emoji: '😤',
    color: 'from-rose-400/20 to-red-300/20',
    borderColor: 'border-rose-400/40',
    tagline: 'Release the tension',
  },
  {
    id: 'energetic',
    label: 'Energetic',
    emoji: '⚡',
    color: 'from-orange-400/20 to-amber-300/20',
    borderColor: 'border-orange-400/40',
    tagline: 'Channel your energy',
  },
  {
    id: 'lonely',
    label: 'Lonely',
    emoji: '🌙',
    color: 'from-indigo-400/20 to-blue-300/20',
    borderColor: 'border-indigo-400/40',
    tagline: 'Find inner connection',
  },
  {
    id: 'grateful',
    label: 'Grateful',
    emoji: '🙏',
    color: 'from-green-400/20 to-emerald-300/20',
    borderColor: 'border-green-400/40',
    tagline: 'Expand your gratitude',
  },
];

const meditationTechniques: Record<string, MeditationTechnique[]> = {
  calm: [
    {
      name: 'Body Scan Relaxation',
      description: 'Slowly move your awareness through each part of your body, releasing any remaining tension and deepening your sense of ease.',
      duration: '10 min',
      category: 'Body Awareness',
      resourceUrl: 'https://www.youtube.com/embed/ihwcw_ofuME',
    },
    {
      name: 'Loving-Kindness Meditation',
      description: 'Cultivate warmth and compassion for yourself and others by silently repeating phrases of goodwill and care.',
      duration: '12 min',
      category: 'Compassion',
      resourceUrl: 'https://www.youtube.com/embed/sz7cpV7ERsM',
    },
    {
      name: 'Mindful Breathing',
      description: 'Anchor your attention to the natural rhythm of your breath, letting thoughts pass like clouds without attachment.',
      duration: '8 min',
      category: 'Breathwork',
      resourceUrl: 'https://www.youtube.com/embed/inpok4MKVLM',
    },
    {
      name: 'Nature Visualization',
      description: 'Imagine yourself in a serene natural setting — a quiet forest or gentle beach — and let the imagery deepen your calm.',
      duration: '15 min',
      category: 'Visualization',
      resourceUrl: 'https://www.youtube.com/embed/Jyy0ra2WcQQ',
    },
  ],
  anxious: [
    {
      name: '4-7-8 Breathing',
      description: 'Inhale for 4 counts, hold for 7, exhale for 8. This pattern activates the parasympathetic nervous system to calm anxiety quickly.',
      duration: '5 min',
      category: 'Breathwork',
      resourceUrl: 'https://www.youtube.com/embed/YRPh_GaiL8s',
    },
    {
      name: '5-4-3-2-1 Grounding',
      description: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste to anchor yourself in the present moment.',
      duration: '7 min',
      category: 'Grounding',
      resourceUrl: 'https://www.youtube.com/embed/30VMIEmA114',
    },
    {
      name: 'Progressive Muscle Relaxation',
      description: 'Systematically tense and release muscle groups from your toes to your head, dissolving physical anxiety held in the body.',
      duration: '15 min',
      category: 'Body Awareness',
      resourceUrl: 'https://www.youtube.com/embed/1nZEdqcGVzo',
    },
    {
      name: 'Anxiety Relief Meditation',
      description: 'A guided session that helps you observe anxious thoughts without judgment and return to a place of inner safety.',
      duration: '10 min',
      category: 'Guided',
      resourceUrl: 'https://www.youtube.com/embed/O-6f5wQXSu8',
    },
    {
      name: 'Box Breathing',
      description: 'Breathe in for 4 counts, hold for 4, breathe out for 4, hold for 4. Used by Navy SEALs to stay calm under pressure.',
      duration: '5 min',
      category: 'Breathwork',
      resourceUrl: 'https://www.youtube.com/embed/tEmt1Znux58',
    },
  ],
  sad: [
    {
      name: 'Self-Compassion Meditation',
      description: 'Gently acknowledge your pain and offer yourself the same kindness you would give a dear friend who is suffering.',
      duration: '12 min',
      category: 'Compassion',
      resourceUrl: 'https://www.youtube.com/embed/sz7cpV7ERsM',
    },
    {
      name: 'Grief & Healing Meditation',
      description: 'A tender guided practice that creates space for sadness, allowing emotions to move through you rather than stay stuck.',
      duration: '20 min',
      category: 'Emotional Healing',
      resourceUrl: 'https://www.youtube.com/embed/Jyy0ra2WcQQ',
    },
    {
      name: 'Warm Light Visualization',
      description: 'Visualize a warm, golden light filling your chest with each breath, gently softening the heaviness around your heart.',
      duration: '10 min',
      category: 'Visualization',
      resourceUrl: 'https://www.youtube.com/embed/inpok4MKVLM',
    },
    {
      name: 'Mindful Acceptance',
      description: 'Practice sitting with difficult emotions without trying to change them, building resilience and emotional intelligence.',
      duration: '8 min',
      category: 'Mindfulness',
      resourceUrl: 'https://www.youtube.com/embed/ihwcw_ofuME',
    },
  ],
  happy: [
    {
      name: 'Gratitude Meditation',
      description: 'Amplify your positive feelings by reflecting on three things you are deeply grateful for, savoring each one fully.',
      duration: '8 min',
      category: 'Gratitude',
      resourceUrl: 'https://www.youtube.com/embed/1ZYbU82GVz4',
    },
    {
      name: 'Joy Expansion Practice',
      description: 'Use your current happiness as a foundation to cultivate even deeper joy and share it outward with loving-kindness.',
      duration: '10 min',
      category: 'Positive Psychology',
      resourceUrl: 'https://www.youtube.com/embed/sz7cpV7ERsM',
    },
    {
      name: 'Mindful Savoring',
      description: 'Slow down and fully inhabit this happy moment — notice every sensation, thought, and feeling with curious attention.',
      duration: '6 min',
      category: 'Mindfulness',
      resourceUrl: 'https://www.youtube.com/embed/inpok4MKVLM',
    },
    {
      name: 'Abundance Visualization',
      description: 'Visualize your life filled with joy, love, and possibility, reinforcing a positive mindset and open heart.',
      duration: '12 min',
      category: 'Visualization',
      resourceUrl: 'https://www.youtube.com/embed/Jyy0ra2WcQQ',
    },
  ],
  stressed: [
    {
      name: 'Stress Release Body Scan',
      description: 'Scan your body for areas holding stress and consciously breathe into them, releasing tension with each exhale.',
      duration: '15 min',
      category: 'Body Awareness',
      resourceUrl: 'https://www.youtube.com/embed/ihwcw_ofuME',
    },
    {
      name: 'Deep Belly Breathing',
      description: 'Activate your body\'s relaxation response by breathing deeply into your belly, slowing your heart rate and calming your mind.',
      duration: '5 min',
      category: 'Breathwork',
      resourceUrl: 'https://www.youtube.com/embed/YRPh_GaiL8s',
    },
    {
      name: 'STOP Technique',
      description: 'Stop, Take a breath, Observe your thoughts and feelings, then Proceed with intention. A quick mindfulness reset for stressful moments.',
      duration: '3 min',
      category: 'Mindfulness',
      resourceUrl: 'https://www.youtube.com/embed/30VMIEmA114',
    },
    {
      name: 'Yoga Nidra for Stress',
      description: 'A deeply restorative practice that guides you into a state between waking and sleep, melting away accumulated stress.',
      duration: '20 min',
      category: 'Yoga Nidra',
      resourceUrl: 'https://www.youtube.com/embed/M0u9GST_j3s',
    },
    {
      name: 'Mindful Walking Meditation',
      description: 'Transform a simple walk into a meditation by bringing full awareness to each step, breath, and sensation.',
      duration: '10 min',
      category: 'Movement',
      resourceUrl: 'https://www.youtube.com/embed/O-6f5wQXSu8',
    },
  ],
  energetic: [
    {
      name: 'Energizing Breath of Fire',
      description: 'Rapid rhythmic breathing through the nose that builds heat, clears the mind, and channels your energy productively.',
      duration: '5 min',
      category: 'Breathwork',
      resourceUrl: 'https://www.youtube.com/embed/tEmt1Znux58',
    },
    {
      name: 'Dynamic Movement Meditation',
      description: 'Combine mindful awareness with gentle movement — shaking, swaying, or stretching — to express and ground your energy.',
      duration: '10 min',
      category: 'Movement',
      resourceUrl: 'https://www.youtube.com/embed/inpok4MKVLM',
    },
    {
      name: 'Focused Intention Setting',
      description: 'Harness your high energy by setting a clear, heartfelt intention for the day and visualizing it coming to life.',
      duration: '7 min',
      category: 'Visualization',
      resourceUrl: 'https://www.youtube.com/embed/1ZYbU82GVz4',
    },
    {
      name: 'Chakra Activation Meditation',
      description: 'Move energy through your body\'s energy centers, balancing and directing your vitality with purpose and clarity.',
      duration: '15 min',
      category: 'Energy Work',
      resourceUrl: 'https://www.youtube.com/embed/Jyy0ra2WcQQ',
    },
  ],
  lonely: [
    {
      name: 'Loving-Kindness for Loneliness',
      description: 'Send compassion first to yourself, then to others near and far, dissolving the sense of separation and isolation.',
      duration: '12 min',
      category: 'Compassion',
      resourceUrl: 'https://www.youtube.com/embed/sz7cpV7ERsM',
    },
    {
      name: 'Inner Child Meditation',
      description: 'Connect with your inner child, offering warmth and reassurance that you are never truly alone.',
      duration: '15 min',
      category: 'Emotional Healing',
      resourceUrl: 'https://www.youtube.com/embed/ihwcw_ofuME',
    },
    {
      name: 'Connection Visualization',
      description: 'Visualize threads of light connecting you to loved ones, nature, and the wider human family, feeling held and supported.',
      duration: '10 min',
      category: 'Visualization',
      resourceUrl: 'https://www.youtube.com/embed/Jyy0ra2WcQQ',
    },
    {
      name: 'Mindful Presence Practice',
      description: 'Cultivate deep presence with yourself — your breath, your body, your aliveness — as the antidote to loneliness.',
      duration: '8 min',
      category: 'Mindfulness',
      resourceUrl: 'https://www.youtube.com/embed/inpok4MKVLM',
    },
  ],
  grateful: [
    {
      name: 'Gratitude Body Meditation',
      description: 'Thank each part of your body for its service, moving from your feet to your head with appreciation and wonder.',
      duration: '10 min',
      category: 'Gratitude',
      resourceUrl: 'https://www.youtube.com/embed/1ZYbU82GVz4',
    },
    {
      name: 'Three Good Things Practice',
      description: 'Reflect deeply on three good things that happened today, savoring the positive emotions they bring.',
      duration: '8 min',
      category: 'Positive Psychology',
      resourceUrl: 'https://www.youtube.com/embed/inpok4MKVLM',
    },
    {
      name: 'Abundance Meditation',
      description: 'Shift your awareness to all the richness already present in your life — relationships, health, beauty, and simple pleasures.',
      duration: '12 min',
      category: 'Visualization',
      resourceUrl: 'https://www.youtube.com/embed/Jyy0ra2WcQQ',
    },
    {
      name: 'Loving-Kindness Gratitude',
      description: 'Combine gratitude with loving-kindness, sending heartfelt thanks and warm wishes to those who have enriched your life.',
      duration: '15 min',
      category: 'Compassion',
      resourceUrl: 'https://www.youtube.com/embed/sz7cpV7ERsM',
    },
  ],
};

export function getMeditationTechniques(mood: string): MeditationTechnique[] {
  return meditationTechniques[mood] || meditationTechniques.calm;
}
