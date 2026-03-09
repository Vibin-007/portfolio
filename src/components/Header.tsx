import { useEffect, useState } from 'react';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [activeLink, setActiveLink] = useState('#hero');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Active Link Highlighting
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 200;

            sections.forEach((section) => {
                const top = (section as HTMLElement).offsetTop;
                const height = (section as HTMLElement).offsetHeight;
                const id = section.getAttribute('id');

                if (scrollPos >= top && scrollPos < top + height) {
                    setActiveLink(`#${id}`);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const navLinks = [
        { href: '#hero', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#skills', label: 'Skills' },
        { href: '#projects', label: 'Projects' },
        { href: '#contact', label: 'Connect' },
    ];

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <nav className="glass-nav">
                <div className="nav-logo">
                    VIBIN<span className="dot">.</span>
                </div>
                <ul className={`nav-menu ${menuActive ? 'active' : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className={`nav-link ${activeLink === link.href ? 'active' : ''}`}
                                onClick={() => setMenuActive(false)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="nav-actions">
                    <button
                        className="theme-toggle"
                        id="themeToggle"
                        aria-label="Toggle theme"
                        onClick={toggleTheme}
                    >
                        <span className="material-symbols-outlined sun-icon">light_mode</span>
                        <span className="material-symbols-outlined moon-icon">dark_mode</span>
                    </button>
                    <div
                        className={`nav-toggle ${menuActive ? 'active' : ''}`}
                        id="navToggle"
                        onClick={() => setMenuActive(!menuActive)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        </header>
    );
}
