import { projectsData } from '../data/portfolioData';

export default function Projects() {
    const { title, subtitle, projects } = projectsData;
    return (
        <section id="projects" className="pt-16 pb-24 px-6 relative scroll-mt-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16 relative mx-auto w-full">
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
                    <p className="font-body text-xl text-ink/70 mt-6 -rotate-1">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                    {projects.map((p, i) => (
                        <div key={p.num} className="relative group mt-6 md:mt-0">


                            <div className={`flex flex-col bg-white border-4 border-ink p-8 h-full shadow-hard-lg transition-transform duration-300 ${i % 2 === 0 ? 'border-wobbly rotate-1 group-hover:rotate-0' : 'border-wobbly-md group-hover:translate-y-[-5px]'}`}>

                                <div className="text-5xl font-heading font-bold text-accent mb-4">{p.num}</div>
                                <h3 className="font-heading text-3xl font-bold text-ink mb-4">{p.title}</h3>
                                <p className="font-body text-lg text-ink/80 mb-8 leading-relaxed">
                                    {p.desc}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t-2 border-dashed border-ink/20">
                                    {p.tech.map(t => (
                                        <span key={t} className="px-3 py-1 border-2 border-ink border-wobbly-sm bg-paper text-sm font-bold font-body text-ink shadow-hard-sm hover:-translate-y-1 transition-transform cursor-none">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
