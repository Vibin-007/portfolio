export interface EducationEntry {
  id: string;
  qualification: string;
  institution: string;
  period: string;
  status?: string;
}

export const education: EducationEntry[] = [
  {
    id: "bsc-ai-ds",
    qualification: "B.Sc. (AI & Data Science)",
    institution: "Rathinam College of Arts and Science",
    period: "2024\u20132027",
    status: "Currently Pursuing",
  },
  {
    id: "higher-secondary",
    qualification: "Higher Secondary",
    institution: "Devanga Hr Sec School",
    period: "2022\u20132024",
  },
  {
    id: "secondary-school",
    qualification: "Secondary School",
    institution: "Sri Visweswara Vidyalaya",
    period: "2021\u20132022",
  },
];
