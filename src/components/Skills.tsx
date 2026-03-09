import { skillsData } from '../data/portfolioData';

export default function Skills() {
    const { title, subtitle, techStackTitle, skills, mlTitle, mlTopics, mlFormula } = skillsData;
    return (
        <section id="skills" className="py-24 px-6 relative overflow-hidden">
            {/* Background scribble */}
            <svg className="absolute top-0 right-0 w-64 h-64 text-secondary/10 -z-10 pointer-events-none" viewBox="0 0 100 100" fill="none">
                <path d="M10,10 Q90,10 90,90 Q10,90 10,10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M20,20 Q80,20 80,80 Q20,80 20,20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M30,30 Q70,30 70,70 Q30,70 30,30" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

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
                    <p className="font-body text-xl text-ink/70 mt-6 rotate-1">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Tech Stack */}
                    <div className="relative group">


                        <div className="bg-white border-4 border-ink border-wobbly p-8 h-full shadow-hard-lg">
                            <h3 className="flex items-center gap-3 font-heading text-3xl font-bold text-ink mb-8 border-b-4 border-dashed border-ink/20 pb-4">
                                <span className="material-symbols-outlined text-4xl text-accent">code_blocks</span>
                                {techStackTitle}
                            </h3>

                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
                                {skills.map((s, i) => (
                                    <div key={s.label} className={`flex flex-col items-center gap-2 group/icon ${i % 2 === 0 ? 'mt-3' : ''}`}>
                                        <div className="w-16 h-16 border-2 border-ink border-wobbly flex items-center justify-center bg-paper shadow-hard-sm group-hover/icon:bg-accent group-hover/icon:-translate-y-2 group-hover/icon:shadow-hard transition-all duration-300">
                                            <i className={`${s.icon} text-3xl text-ink group-hover/icon:text-white transition-colors`} />
                                        </div>
                                        <span className="font-body text-l font-bold text-ink text-center">{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ML Topics */}
                    <div className="relative group">
                        {/* Pins */}
                        <div className="absolute top-4 right-4 w-6 h-6 bg-accent rounded-full border-2 border-ink shadow-[2px_2px_0_0_#2d2d2d] z-20 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white/50 rounded-full translate-x-[1px]" />
                        </div>
                        <div className="absolute top-4 left-4 w-6 h-6 bg-accent rounded-full border-2 border-ink shadow-[2px_2px_0_0_#2d2d2d] z-20 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white/50 rounded-full translate-x-[1px]" />
                        </div>

                        <div className="bg-[#f0f4f8] border-4 border-ink border-wobbly-md p-8 h-full shadow-hard rotate-1 group-hover:rotate-0 transition-transform duration-300">
                            <h3 className="flex items-center gap-3 font-heading text-3xl font-bold text-ink mb-8 border-b-4 border-dashed border-ink/20 pb-4">
                                <span className="material-symbols-outlined text-4xl text-accent">psychology</span>
                                {mlTitle}
                            </h3>

                            <ul className="space-y-6">
                                {mlTopics.map(t => (
                                    <li key={t} className="flex items-start gap-4 font-body text-lg text-ink/90 leading-relaxed bg-white border-2 border-ink border-wobbly-sm p-4 shadow-hard-sm">
                                        <div className="text-2xl text-accent font-heading mt-[-2px]">*</div>
                                        <div>{t}</div>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 text-center hidden md:block opacity-70">
                                <span className="font-heading text-4xl transform -rotate-12 inline-block text-ink whitespace-pre">
                                    {mlFormula}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
