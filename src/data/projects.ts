export type PreviewKind = "browser" | "phone" | "abstract";

export type PreviewVariant = "event" | "portfolio" | "vibe" | "scanner" | "summarizer" | "campnotes" | "queueless";

export interface ProjectPreview {
  kind: PreviewKind;
  variant: PreviewVariant;
  /** Alt text for the visual. */
  alt: string;
  image?: string;
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
      "Responsive event management platform and admin dashboard featuring categorized event listings, online student registrations, payment logging, and schedule tracking.",
    technologies: ["Django", "PostgreSQL", "JavaScript", "HTML/CSS"],
    preview: {
      kind: "browser",
      variant: "event",
      alt: "Admin dashboard of RGF 2025 college event management system with category listings, event metrics, and registration logs.",
      image: "/images/Event.png",
    },
    featured: true,
  },
  {
    id: "campnotes",
    index: "02",
    title: "CampNotes",
    category: "Academic Resource Sharing Platform",
    description:
      "A platform for secure uploading, managing, and downloading of academic resources. Built with responsive interfaces, role-based access control, PostgreSQL models for structured storage, and end-to-end file validation.",
    technologies: ["Django", "PostgreSQL", "JavaScript", "HTML/CSS", "Python"],
    preview: {
      kind: "browser",
      variant: "campnotes",
      alt: "Preview of CampNotes academic resource sharing platform with subject filters and secure notes repository.",
    },
    featured: true,
  },
  {
    id: "queueless",
    index: "03",
    title: "QueueLess",
    category: "Real-Time Queue Management App",
    description:
      "A real-time queue management app where customers book categorized tokens (General, Priority, Support starting at #101) with live 5-minute wait time estimates, while staff call the next token, cancel, or reset the queue via polling updates.",
    technologies: ["React 19", "Vite", "Django REST Framework", "Python", "SQLite"],
    preview: {
      kind: "browser",
      variant: "queueless",
      alt: "Preview of QueueLess live queue status dashboard showing serving tokens, wait times, and staff controls.",
    },
    featured: true,
  },
  {
    id: "vibe",
    index: "04",
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
