import { useEffect, useState } from 'react';
import { navData } from '../data/portfolioData';

const { sections, initials } = navData;

export default function Nav() {
    const [active, setActive] = useState('hero');
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
            const found = sections.find(id => {
                const el = document.getElementById(id);
                if (!el) return false;
                const { top, bottom } = el.getBoundingClientRect();
                return top <= 120 && bottom >= 120;
            });
            if (found) setActive(found);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            className={`fixed left-1/2 -translate-x-1/2 z-50 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 px-6 py-3 transition-all duration-300 w-[90vw] max-w-lg md:max-w-max md:w-max ${scrolled || menuOpen ? 'top-4 bg-paper border-wobbly shadow-hard border-2 border-ink' : 'top-6 bg-paper md:bg-transparent border-wobbly shadow-hard border-2 border-ink md:border-none md:shadow-none'
                }`}
        >
            <div className="flex items-center justify-between w-full md:w-auto">
                <a href="#hero" className="font-heading font-bold text-3xl tracking-wide text-ink no-underline hover:-rotate-2 transition-transform">
                    {initials}<span className="text-accent">.</span>
                </a>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex items-center justify-center p-1 text-ink hover:text-accent transition-colors outline-none cursor-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="material-symbols-outlined text-4xl">
                        {menuOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

            {/* Navigation Links */}
            <ul className={`flex-col md:flex-row gap-2 list-none m-0 p-0 w-full md:w-auto ${menuOpen ? 'flex pb-2 md:pb-0' : 'hidden md:flex'}`}>
                {sections.map(id => (
                    <li key={id} className="w-full md:w-auto text-center">
                        <a
                            href={`#${id}`}
                            onClick={() => setMenuOpen(false)}
                            className={`block px-4 py-2 md:py-1 font-body text-xl capitalize transition-all duration-200 border-2 border-transparent md:hover:-translate-y-1 ${active === id
                                ? 'bg-accent text-white border-ink border-wobbly shadow-hard-sm md:-rotate-2'
                                : 'text-ink hover:text-accent'
                                }`}
                        >
                            {id}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
