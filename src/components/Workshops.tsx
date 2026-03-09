import { workshopsData } from '../data/portfolioData';

export default function Workshops() {
    const { title, subtitle, workshops, certsTitle, certs } = workshopsData;
    return (
        <section id="workshops" className="pt-16 pb-24 px-6 relative scroll-mt-8">
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

                {/* Workshops */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                    {workshops.map((w, i) => (
                        <div key={w.title} className={`relative flex flex-col border-4 border-ink border-wobbly-md p-8 shadow-hard-lg group ${i % 2 === 0 ? '-rotate-1 hover:-rotate-0' : 'rotate-1 hover:rotate-0'} transition-transform duration-300`}>
                            {/* Pin */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-accent rounded-full border-2 border-ink shadow-[2px_2px_0_0_#2d2d2d] z-20 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-white/50 rounded-full translate-x-[1px]" />
                            </div>

                            <div className="flex items-center gap-4 mb-6 mt-4">
                                <span className="text-4xl">{w.icon}</span>
                                <div>
                                    <h3 className="font-heading text-2xl font-bold text-ink leading-tight">{w.title}</h3>
                                    <p className="font-body text-lg text-ink font-bold">{w.org}</p>
                                </div>
                            </div>

                            <p className="font-body text-lg text-ink/80 mb-6 leading-relaxed">
                                {w.desc}
                            </p>

                            <div className="flex flex-wrap gap-3 mt-auto pt-4">
                                {w.tools.map(t => (
                                    <span key={t} className="inline-block px-4 py-1 border-2 border-ink border-wobbly-sm bg-white font-body font-bold text-ink shadow-hard-sm -rotate-1">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Certificates */}
                <div className="border-4 border-ink border-wobbly p-8 shadow-hard rotate-1 max-w-3xl mx-auto">
                    <h3 className="font-heading text-3xl font-bold text-ink mb-6 pb-2 border-b-4 border-dashed border-ink/20 text-center">
                        {certsTitle}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {certs.map(c => (
                            <div key={c.title} className="flex items-center gap-4 bg-white border-2 border-ink border-wobbly-sm p-4 shadow-hard-sm hover:-translate-y-1 transition-transform cursor-none">
                                <span className="text-4xl drop-shadow-md">{c.icon}</span>
                                <div>
                                    <h4 className="font-heading text-xl font-bold text-ink leading-tight">{c.title}</h4>
                                    <p className="font-body text-xl text-ink/60">{c.issuer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
