export interface NavItem {
  label: string;
  href: string;
}

export interface SiteIdentity {
  name: string;
  logo: string;
}

export const identity: SiteIdentity = {
  name: "Vibin D.",
  logo: "VIBIN D.",
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export interface HeroCopy {
  headlineLines: string[];
  name: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  scrollHint: string;
}

export const hero: HeroCopy = {
  headlineLines: ["BUILDING", "DIGITAL", "EXPERIENCES."],
  name: "VIBIN D.",
  subtitle:
    "Developer exploring the intersection of intelligent systems, mobile applications, and immersive digital experiences.",
  primaryCta: { label: "Explore my work", href: "#work" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
  scrollHint: "Scroll to explore",
};

export interface AboutContent {
  eyebrow: string;
  headlineLines: string[];
  biography: string;
  cta: { label: string; href: string };
}

export const about: AboutContent = {
  eyebrow: "01 \u2014 About",
  headlineLines: ["CURIOUS BY NATURE.", "BUILDER BY CHOICE."],
  biography:
    "I'm an AI & Data Science undergraduate at Rathinam College of Arts and Science. With a strong foundation in Machine Learning and hands-on experience in Python, data analysis, and full-stack web development, I bridge the gap between intelligent backend systems and intuitive user interfaces. Let's build something incredible together!",
  cta: { label: "View selected work", href: "#work" },
};
