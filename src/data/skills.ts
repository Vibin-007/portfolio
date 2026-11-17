export interface Skill {
  id: string;
  index: string;
  title: string;
  description: string;
  /** "Technologies" or "Topics" — reflected in the UI label. */
  listLabel: "Technologies" | "Topics";
  items: string[];
}

export const skills: Skill[] = [
  {
    id: "python-java",
    index: "01",
    title: "Python & Java",
    description:
      "Core programming languages for ML model development, data processing, and building robust backend systems.",
    listLabel: "Technologies",
    items: ["Python", "Java"],
  },
  {
    id: "web-development",
    index: "02",
    title: "Web Development",
    description:
      "Full-stack development with Django, Flask, JavaScript, and HTML/CSS for building responsive, user-friendly interfaces.",
    listLabel: "Technologies",
    items: ["Django", "Flask", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "database-management",
    index: "03",
    title: "Database Management",
    description:
      "Design and management of relational databases using PostgreSQL and MySQL for scalable, data-driven applications.",
    listLabel: "Technologies",
    items: ["PostgreSQL", "MySQL", "SQL"],
  },
  {
    id: "data-science",
    index: "04",
    title: "Data Science",
    description:
      "Data analysis and visualization using NumPy, Pandas, Scikit-learn, and Matplotlib for deriving actionable insights from complex datasets.",
    listLabel: "Technologies",
    items: ["NumPy", "Pandas", "Scikit-learn", "Matplotlib"],
  },
  {
    id: "machine-learning",
    index: "05",
    title: "Machine Learning",
    description:
      "Building and evaluating supervised and unsupervised learning models, with experience in preprocessing, feature engineering, and model optimization.",
    listLabel: "Topics",
    items: [
      "Linear Regression",
      "Logistic Regression",
      "KNN",
      "Decision Trees",
      "Random Forest",
      "K-Means",
      "DBSCAN",
    ],
  },
  {
    id: "flutter",
    index: "06",
    title: "Flutter",
    description:
      "Cross-platform mobile application development using Flutter and Dart, with experience building responsive Android applications, integrating REST APIs, local storage with Hive, state management, and modern interfaces from a single codebase.",
    listLabel: "Technologies",
    items: ["Flutter", "Dart", "Android SDK", "Hive", "REST APIs"],
  },
];
