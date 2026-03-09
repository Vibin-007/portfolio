import { aboutData } from '../data/portfolioData';

export default function About() {
    const { title, subtitle, profileImage, initials, name, role, location, email, githubUrl, githubLabel, linkedinUrl, linkedinLabel, storyTitle, paragraphs, tags, resumeButton } = aboutData;

    return (
        <section id="about" className="pt-16 pb-24 px-6 relative scroll-mt-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16 relative inline-block mx-auto w-full">
                    {/* Wavy underline decoration */}
                    <div className="inline-block relative">
                        <h2 className="font-heading text-5xl md:text-6xl font-bold text-ink inline-block pb-2">
                            {title}
                        </h2>
                        {/* Wavy underline svg */}
                        <svg className="absolute -bottom-2 left-0 w-full h-4 text-accent" viewBox="0 0 100 20" preserveAspectRatio="none">
                            <path d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <p className="font-body text-xl text-ink/70 mt-6 rotate-1">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">

                    {/* Profile visual (Sticky Note style) */}
                    <div className="hidden md:block md:col-span-2 relative group mt-4 md:mt-0">
                        {/* Thumbtack */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-accent rounded-full border-2 border-ink shadow-[2px_2px_0_0_#2d2d2d] z-20 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white/50 rounded-full translate-x-[1px]" />
                        </div>

                        <div className="bg-[#ffffff] border-4 border-ink border-wobbly-sm p-8 text-center shadow-hard rotate-[-2deg] group-hover:rotate-0 transition-transform duration-300">
                            <div className="w-32 h-32 mx-auto rounded-full border-4 border-ink border-wobbly bg-white flex items-center justify-center mb-6 shadow-hard-sm overflow-hidden">
                                <img
                                    src={profileImage}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback to initials if image is missing
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement!.innerHTML = `<span class="font-heading text-5xl font-bold text-ink">${initials}</span>`;
                                    }}
                                />
                            </div>

                            <h3 className="font-heading text-3xl font-bold text-ink mb-2">{name}</h3>
                            <p className="font-body text-lg text-ink/80 mb-6">{role}<br />{location}</p>

                            <div className="flex flex-col gap-3 font-body text-lg">
                                <a href={`mailto:${email}`} className="flex items-center justify-center gap-2 text-ink hover:text-accent group/link decoration-transparent">
                                    <span className="material-symbols-outlined text-xl group-hover/link:animate-[bounce_1s_infinite]">mail</span>
                                    <span>{email}</span>
                                </a>
                                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-ink hover:text-accent hover:rotate-1 transition-transform decoration-transparent">
                                    <i className="devicon-github-original text-xl" />
                                    <span>{githubLabel}</span>
                                </a>
                                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-ink hover:text-accent hover:-rotate-1 transition-transform decoration-transparent">
                                    <i className="devicon-linkedin-plain text-xl" />
                                    <span>{linkedinLabel}</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bio (Paper Page style) */}
                    <div className="md:col-span-3 relative">


                        <div className="bg-white border-4 border-ink border-wobbly-md p-8 md:p-10 shadow-hard min-h-full">
                            <h3 className="font-heading text-2xl font-bold text-ink mb-6 pb-2 border-b-4 border-dashed border-ink/20">{storyTitle}</h3>

                            <div className="space-y-6 font-body text-lg text-ink/90 leading-relaxed">
                                {paragraphs}
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {tags.map((tag, idx) => (
                                    <span key={tag} className={`inline-block border-2 border-ink px-4 py-2 font-body font-bold text-lg bg-paper shadow-hard-sm ${idx % 2 === 0 ? 'rotate-1 border-wobbly' : '-rotate-1 border-wobbly-sm'}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-10 inline-block relative group">
                                <a href={resumeButton.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-muted border-4 border-ink border-wobbly px-6 py-3 font-body font-bold text-xl text-ink shadow-hard hover:bg-accent hover:text-white hover:shadow-hard-sm hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-2 active:translate-y-2 transition-all">
                                    <span>{resumeButton.text}</span>
                                    <span className="material-symbols-outlined">download</span>
                                </a>
                                {/* Scribbled arrow pointing to button */}
                                <svg className="absolute -right-16 top-1/2 -translate-y-1/2 w-16 h-16 text-accent opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" viewBox="0 0 100 100" fill="none">
                                    <path d="M90 50 Q 50 10, 10 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="8,8" />
                                    <path d="M25 35 L 10 50 L 30 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
