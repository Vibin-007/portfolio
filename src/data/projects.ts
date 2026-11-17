export type PreviewKind = "browser" | "phone" | "abstract";

export type PreviewVariant = "event" | "portfolio" | "vibe" | "scanner" | "summarizer";

export interface ProjectPreview {
  kind: PreviewKind;
  variant: PreviewVariant;
  /** Alt text for the generated visual. */
  alt: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  preview: ProjectPreview;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  /** Honest, non-clickable status shown when a URL is not configured. */
  status?: string;
  /** Optional clarifications that keep claims accurate. */
  note?: string;
}

/**
 * Primary selected work.
 * URLs are intentionally omitted where they are not confirmed — the UI renders
 * a clear non-clickable status label instead of linking to "#".
 */
export const projects: Project[] = [
  {
    id: "college-event-website",
    index: "01",
    title: "College Event Website",
    category: "Web Application / Academic",
    description:
      "Responsive website for a college event with multiple event categories, registration forms, and a user-friendly interface for event details and schedules.",
    technologies: ["Django", "PostgreSQL", "JavaScript", "HTML/CSS"],
    preview: {
      kind: "browser",
      variant: "event",
      alt: "Generated preview of a college event website with category listings and a registration form.",
    },
    status: "Source available on request",
    featured: true,
  },
  {
    id: "personal-portfolio",
    index: "02",
    title: "Personal Portfolio",
    category: "Web Application / Personal",
    description:
      "A highly interactive personal portfolio built with React and Framer Motion, featuring custom scroll animations, dynamic sticky layouts, and a sleek dark theme.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    preview: {
      kind: "browser",
      variant: "portfolio",
      alt: "Generated preview of a dark, animated personal portfolio interface.",
    },
    status: "You are viewing this build",
    featured: true,
  },
  {
    id: "vibe",
    index: "03",
    title: "Vibe",
    category: "Android Application / Personal",
    description:
      "A feature-rich music player designed to offer a premium listening experience. Features smart audio controls, real-time synchronization for collaborative listening, and intuitive gesture controls.",
    technologies: ["Flutter", "Dart", "Android SDK"],
    preview: {
      kind: "phone",
      variant: "vibe",
      alt: "Generated preview of a dark mobile music player interface with playback controls.",
    },
    status: "Private build",
    note: "Collaborative real-time synchronization is presented as an intended capability of the app rather than a publicly verifiable released feature.",
    featured: true,
  },
];

/**
 * Experiments & research panels.
 * Only implemented functionality is listed as such; anything speculative is
 * separated into `conceptual`.
 */
export interface ResearchProject {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  implemented: string[];
  conceptual: string[];
  preview: ProjectPreview;
}

export const researchProjects: ResearchProject[] = [
  {
    id: "document-scanner",
    index: "01",
    title: "Document Scanner",
    category: "OCR & AI Analyzer",
    description:
      "A document-scanning and text-extraction project focused on turning scanned pages into usable, searchable text.",
    implemented: ["Document scanning workflow", "Text extraction (OCR)"],
    conceptual: ["Deeper document analysis is an intended direction"],
    preview: {
      kind: "abstract",
      variant: "scanner",
      alt: "Abstract illustration of a scanned document with extracted text lines.",
    },
  },
  {
    id: "nlp-summarizer",
    index: "02",
    title: "NLP Summarizer",
    category: "Research Assistant",
    description:
      "An NLP summarization project for condensing text and assisting with information review.",
    implemented: ["Text summarization", "Information review assistance"],
    conceptual: ["Extended research tooling is a planned direction"],
    preview: {
      kind: "abstract",
      variant: "summarizer",
      alt: "Abstract illustration of long text being condensed into a summary.",
    },
  },
];
