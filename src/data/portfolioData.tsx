export const navData = {
    initials: "Vibin D",
    sections: ['home', 'about', 'skills', 'projects', 'education', 'workshops', 'contact']
};

export const heroData = {
    badge: "AI & Data Science Undergraduate",
    greeting: "Hi, I'm",
    name: "Vibin.D",
    subtitle: "Let's build.",
    description: "Crafting intelligent digital experiences with Python, Machine Learning & Full-Stack Web Development.",
    primaryButton: { text: "View Projects", href: "#projects" },
    secondaryButton: { text: "Resume", href: "/Vibin_Resume.pdf" },
    profileImage: "/profile.png"
};

export const aboutData = {
    title: "About Me",
    subtitle: "A little background",
    profileImage: "/profile.png",
    initials: "VD",
    name: "Vibin.D",
    role: "AI & DS Student",
    location: "Coimbatore, India",
    email: "vibind007@gmail.com",
    githubUrl: "https://github.com/Vibin-007",
    githubLabel: "Github",
    linkedinUrl: "https://linkedin.com/in/vibin-d-61b26932a",
    linkedinLabel: "LinkedIn",
    storyTitle: "The Story So Far...",
    paragraphs: [
        <p key={1}>
            I'm an <strong className="text-accent underline decoration-wavy decoration-ink underline-offset-4 pointer-events-none">AI & Data Science undergraduate</strong> at Rathinam College of Arts and Science.
            I have a strong foundation in Machine Learning and hands-on experience hacking together solutions in Python, data analysis, and full-stack web development.
        </p>,
        <p key={2}>
            I'm super passionate about building data-driven tools and applying ML models to real-world problems. My sweet spot? Bridging the gap between deeply complex intelligent backend systems and wonderfully intuitive user interfaces.
        </p>
    ],
    tags: ['Machine Learning', 'Python', 'Django', 'Data Analysis', 'Web Development'],
    resumeButton: { text: "Download Resume", href: "/Vibin_Resume.pdf" }
};

export const skillsData = {
    title: "Skills & Tools",
    subtitle: "What's in my utility belt?",
    techStackTitle: "Tech Stack",
    skills: [
        { label: 'Python', icon: 'devicon-python-plain' },
        { label: 'Java', icon: 'devicon-java-plain' },
        { label: 'JavaScript', icon: 'devicon-javascript-plain' },
        { label: 'HTML/CSS', icon: 'devicon-html5-plain' },
        { label: 'Django', icon: 'devicon-django-plain' },
        { label: 'Flask', icon: 'devicon-flask-original' },
        { label: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
        { label: 'MySQL', icon: 'devicon-mysql-plain' },
        { label: 'NumPy', icon: 'devicon-numpy-plain' },
        { label: 'Pandas', icon: 'devicon-pandas-plain' },
        { label: 'Scikit-learn', icon: 'devicon-scikitlearn-plain' },
        { label: 'Matplotlib', icon: 'devicon-matplotlib-plain' },
        { label: 'Git', icon: 'devicon-git-plain' },
        { label: 'GitHub', icon: 'devicon-github-original' },
    ],
    mlTitle: "ML Areas",
    mlTopics: [
        'Supervised Learning (Linear / Logistic Regression, KNN, Decision Tree, Random Forest)',
        'Unsupervised Learning (K-Means, DBSCAN)',
        'Model Evaluation (Accuracy, Precision, Recall, R²)',
        'Data Preprocessing (Cleaning, Encoding, Scaling)'
    ],
    mlFormula: "∑ (xᵢ - μ)²"
};

export const projectsData = {
    title: "Projects",
    subtitle: "Things I've built",
    projects: [
        {
            num: '01',
            title: 'College Event Website',
            desc: 'Responsive website for a college event with multiple event categories, registration forms, and user-friendly UI for event details and schedules.',
            tech: ['Django', 'PostgreSQL', 'JavaScript', 'HTML/CSS'],
        },
        {
            num: '02',
            title: 'CampNotes',
            desc: 'Department-level web application for sharing academic notes among staff and students with secure upload, instant download, and role-based access control.',
            tech: ['Django', 'PostgreSQL', 'HTML/CSS'],
        },
    ]
};

export const educationData = {
    title: "Education",
    timeline: [
        {
            degree: 'Bachelor of Science (AI & DS)',
            school: 'Rathinam College of Arts and Science',
            period: '2024 – 2027',
            icon: (
                <svg viewBox="0 0 100 100" className="w-12 h-12 text-ink group-hover:text-accent transition-colors" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 40 L50 20 L90 40 L50 60 Z" />
                    <path d="M25 50 L25 75 Q 50 90, 75 75 L75 50" />
                    <line x1="90" y1="40" x2="90" y2="70" />
                    <circle cx="90" cy="74" r="4" fill="currentColor" stroke="none" />
                </svg>
            ),
        },
        {
            degree: 'Higher Secondary',
            school: 'Devanga Hr Sec School',
            period: '2022 – 2024',
            icon: (
                <svg viewBox="0 0 100 100" className="w-12 h-12 text-ink group-hover:text-accent transition-colors" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M25 80 Q 20 75, 45 70" />
                    <path d="M75 80 Q 80 75, 55 70" />
                    <path d="M25 20 L 25 80" />
                    <path d="M75 20 L 75 80" />
                    <path d="M50 20 L 50 85" />
                    <path d="M25 20 Q 20 15, 50 20" />
                    <path d="M75 20 Q 80 15, 50 20" />
                    <line x1="32" y1="35" x2="42" y2="35" />
                    <line x1="58" y1="45" x2="68" y2="45" />
                </svg>
            ),
        },
        {
            degree: 'Secondary School',
            school: 'Sri Visweswara Vidyalaya',
            period: '2021 – 2022',
            icon: (
                <svg viewBox="0 0 100 100" className="w-12 h-12 text-ink group-hover:text-accent transition-colors" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 85 L 90 85" />
                    <path d="M25 85 L 25 45 L 50 20 L 75 45 L 75 85" />
                    <path d="M42 85 L 42 60 L 58 60 L 58 85" />
                    <rect x="30" y="55" width="8" height="8" />
                    <rect x="62" y="55" width="8" height="8" />
                    <circle cx="50" cy="35" r="5" />
                </svg>
            ),
        },
    ]
};

export const workshopsData = {
    title: "Workshops & Certificates",
    subtitle: "Learning beyond the classroom",
    workshops: [
        {
            title: 'Mastering Generative AI',
            org: 'IISc Bangalore',
            desc: 'Gained hands-on experience with generative AI models and real-world applications across text, image, and data generation.',
            tools: ['Python', 'TensorFlow', 'Prompt', 'Tik Tokenizer'],
            icon: '',
        },
        {
            title: 'Intro to Machine Learning',
            org: 'IIT Palakkad',
            desc: 'Acquired foundational knowledge of supervised and unsupervised learning, model evaluation, and optimization techniques.',
            tools: ['Python', 'NumPy', 'Pandas'],
            icon: '',
        },
    ],
    certsTitle: "Certificates",
    certs: [
        { title: 'Git and GitHub', issuer: 'Google', icon: '' },
        { title: 'Programming with JS', issuer: 'Meta', icon: '' },
    ]
};

export const contactData = {
    title: "Get In Touch",
    subtitle: "Let's connect and build something together",
    email: "vibind007@gmail.com",
    contacts: [
        { icon: 'mail', label: 'Email', value: 'vibind007@gmail.com', href: 'mailto:vibind007@gmail.com' },
        { icon: 'phone', label: 'Phone', value: '+91 86083 22120', href: 'tel:+918608322120' },
        { icon: '', label: 'GitHub', value: 'github.com/Vibin-007', href: 'https://github.com/Vibin-007', devicon: 'devicon-github-original' },
        { icon: '', label: 'LinkedIn', value: 'linkedin.com/in/vibin-d', href: 'https://linkedin.com/in/vibin-d-61b26932a', devicon: 'devicon-linkedin-plain' },
    ]
};

export const footerData = {
    // any footer text
};
