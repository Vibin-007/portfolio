export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href?: string;
  /** Copyable plain value where a clipboard action makes sense. */
  copyValue?: string;
  external: boolean;
}

export interface ContactContent {
  eyebrow: string;
  headlineLines: string[];
  supporting: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export const contact: ContactContent = {
  eyebrow: "08 \u2014 Get in touch",
  headlineLines: ["LET'S CONNECT AND BUILD", "SOMETHING TOGETHER."],
  supporting: "Have an interesting idea or opportunity? Let's start a conversation.",
  email: "vibind007@gmail.com",
  phone: "+91 86083 22120",
  github: "https://github.com/Vibin-007",
  linkedin: "https://linkedin.com/in/vibin-d",
};

export const contactChannels: ContactChannel[] = [
  {
    id: "email",
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    copyValue: contact.email,
    external: false,
  },
  {
    id: "phone",
    label: "Phone",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/[^+\d]/g, "")}`,
    copyValue: contact.phone,
    external: false,
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/Vibin-007",
    href: contact.github,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/vibin-d",
    href: contact.linkedin,
    external: true,
  },
];
