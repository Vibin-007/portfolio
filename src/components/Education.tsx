import { educationData } from '../data/portfolioData';

export default function Education() {
    const { title, timeline } = educationData;
    return (
        <section id="education" className="pt-28 pb-24 px-6 relative bg-secondary/5 scroll-mt-20">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16 mx-auto w-full">
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
                </div>

                <div className="relative">
                    {/* Hand-drawn vertical dashed line for timeline */}
                    <div className="absolute left-[38px] md:left-[46px] top-6 bottom-6 w-0 border-l-4 border-dashed border-ink/30 z-0" />

                    <div className="flex flex-col gap-10">
                        {timeline.map((item) => (
                            <div key={item.degree} className="relative z-10 flex gap-6 md:gap-10 items-start group">
                                {/* Timeline Icon */}
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-white border-4 border-ink border-wobbly-sm flex items-center justify-center text-4xl shadow-hard shrink-0 group-hover:scale-110 group-hover:rotate-[10deg] transition-transform duration-300">
                                    {item.icon}
                                </div>

                                {/* Content Card */}
                                <div className="bg-white border-4 border-ink border-wobbly p-6 md:p-8 shadow-hard flex-1 relative group-hover:-translate-y-1 transition-transform duration-300">
                                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-ink mb-2">{item.degree}</h3>
                                    <p className="font-body text-xl text-ink/70 mb-4">{item.school}</p>
                                    <span className="inline-block px-4 py-1 border-2 border-ink border-wobbly-sm bg-[#ffffff] font-body font-bold shadow-hard-sm -rotate-1">
                                        {item.period}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
