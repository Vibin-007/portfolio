import { heroData } from '../data/portfolioData';

export default function Hero() {
    const { badge, greeting, name, subtitle, description, primaryButton, secondaryButton, profileImage } = heroData;

    return (
        <section id="hero" className="min-h-screen relative flex items-center justify-center pt-16 px-6 overflow-hidden">

            {/* Decorative background elements */}
            <div className="absolute top-1/4 left-10 md:left-20 w-32 h-32 border-4 border-dashed border-ink/20 border-wobbly-md rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute bottom-1/4 right-10 md:right-20 w-24 h-24 bg-secondary/10 border-wobbly-sm rounded-full" />

            {/* Content Container */}
            <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="text-center md:text-left relative">
                    <div className="inline-block bg-muted px-4 py-1 border-2 border-ink border-wobbly-sm shadow-hard-sm mb-2 rotate-2">
                        <p className="font-body font-bold text-ink uppercase tracking-widest text-sm">
                            {badge}
                        </p>
                    </div>

                    {/* Mobile Only Profile Image */}
                    <div className="md:hidden relative mx-auto w-56 h-72 group mb-8">
                        <div className="absolute inset-0 bg-white border-4 border-ink border-wobbly shadow-hard overflow-hidden flex items-center justify-center">
                            <img
                                src={profileImage}
                                alt={name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.innerHTML = `<div class="text-center p-6"><span class="material-symbols-outlined text-6xl text-ink/20 block mb-4">tag_faces</span></div>`;
                                }}
                            />
                        </div>
                    </div>

                    <h1 className="font-heading text-6xl md:text-8xl font-bold text-ink leading-tight mb-6">
                        {greeting} <span className="text-accent inline-block hover:rotate-2 transition-transform relative">
                            {name}
                            {/* Scribble underline */}
                            <svg className="absolute -bottom-4 left-0 w-full h-6 text-ink/20 pointer-events-none" viewBox="0 0 100 20" preserveAspectRatio="none">
                                <path d="M0 10 Q 25 20, 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5,5" />
                            </svg>
                        </span>
                        <br />
                        {subtitle}
                    </h1>

                    <p className="font-body text-xl md:text-2xl text-ink/80 mb-10 max-w-lg mx-auto md:mx-0">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                        <a href={primaryButton.href} className="inline-flex items-center gap-2 bg-white border-4 border-ink border-wobbly px-8 py-3 font-body font-bold text-xl text-ink shadow-hard hover:bg-accent hover:text-white hover:shadow-hard-sm hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-2 active:translate-y-2 transition-all group">
                            <span>{primaryButton.text}</span>
                            <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">arrow_forward</span>
                        </a>

                        <a href={secondaryButton.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-muted border-4 border-ink border-wobbly px-8 py-3 font-body font-bold text-xl text-ink shadow-hard hover:bg-accent hover:text-white hover:shadow-hard-sm hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-2 active:translate-y-2 transition-all group">
                            <span>{secondaryButton.text}</span>
                            <span className="material-symbols-outlined group-hover:-rotate-12 transition-transform">description</span>
                        </a>
                    </div>
                </div>

                {/* Desktop Only Decorative Image / Profile Placeholder */}
                <div className="hidden md:block relative mx-auto md:w-80 md:h-[400px] lg:w-96 lg:h-[480px] group mt-10 md:mt-0">


                    {/* Frame */}
                    <div className="absolute inset-0 bg-white border-4 border-ink border-wobbly group-hover:rotate-2 transition-transform duration-300 shadow-hard-lg overflow-hidden flex items-center justify-center">
                        <img
                            src={profileImage}
                            alt={name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                // Fallback to placeholder if image is missing
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerHTML = `<div class="text-center p-6"><span class="material-symbols-outlined text-6xl text-ink/20 block mb-4">tag_faces</span><p class="font-heading text-2xl text-ink/40 rotate-[-10deg]">Add public${profileImage}</p></div>`;
                            }}
                        />
                    </div>

                    {/* Hand-drawn arrow pointing to Hero Image */}
                    <svg className="hidden md:block absolute -left-16 bottom-0 w-24 h-24 text-ink pointer-events-none rotate-[100deg]" viewBox="0 0 100 100" fill="none">
                        <path d="M10 90 Q 50 10, 90 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="8,8" />
                        <path d="M80 35 L 90 50 L 70 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

        </section>
    );
}
