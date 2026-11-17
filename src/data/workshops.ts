export interface Workshop {
  id: string;
  title: string;
  institution: string;
  description: string;
  topicsLabel: string;
  topics: string[];
}

export const workshops: Workshop[] = [
  {
    id: "mastering-generative-ai",
    title: "Mastering Generative AI",
    institution: "IISc Bangalore",
    description:
      "Gained hands-on experience with generative AI models and real-world applications across text, image, and data generation.",
    topicsLabel: "Topics",
    topics: ["Python", "TensorFlow", "Prompting", "TikToken tokenizer"],
  },
  {
    id: "introduction-to-machine-learning",
    title: "Introduction to Machine Learning",
    institution: "IIT Palakkad",
    description:
      "Acquired foundational knowledge of supervised and unsupervised learning, model evaluation, and optimization techniques.",
    topicsLabel: "Technologies",
    topics: ["Python", "NumPy", "Pandas"],
  },
];

export interface HackathonAchievement {
  eyebrow: string;
  headlineLines: string[];
  award: string;
  event: string;
  description: string;
  websiteUrl?: string;
  codeUrl?: string;
}

export const hackathon: HackathonAchievement = {
  eyebrow: "06 \u2014 Recognition",
  headlineLines: ["BUILDING", "UNDER PRESSURE."],
  award: "WINNER \u2014 VIBE VISIONARY AWARD",
  event: "The Vibehathon Experience",
  description:
    "A 24-hour intensive coding sprint where our team collaborated to build an innovative solution from scratch. We focused on pushing the boundaries of web experiences and were honored with the Vibe Visionary Award for our work.",
};
