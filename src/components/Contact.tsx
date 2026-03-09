import { useState } from 'react';
import { contactData } from '../data/portfolioData';

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const { title, subtitle, email, contacts } = contactData;

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="pt-32 pb-24 px-6 relative bg-paper scroll-mt-24">
            <div className="max-w-4xl mx-auto">
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

                <div className="bg-white border-4 border-ink border-wobbly-md p-8 md:p-12 shadow-hard-lg relative rotate-[-1deg] group">


                    <div className="text-center mb-10 max-w-xl mx-auto">
                        {/* <p className="font-body text-xl font-bold text-ink/80 leading-relaxed mb-8">
                            I'm currently open to <span className="text-accent underline decoration-wavy decoration-ink underline-offset-4 pointer-events-none">new opportunities</span> — whether it's a job, internship, or collaboration on an interesting project. Don't hesitate to reach out!
                        </p> */}

                        <button
                            onClick={copyEmail}
                            className="inline-flex items-center justify-center md:inline-flex gap-2 mx-auto bg-accent text-white px-8 py-4 font-heading text-2xl font-bold border-4 border-ink border-wobbly shadow-hard hover:bg-white hover:text-accent hover:shadow-hard-sm hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-2 active:translate-y-2 transition-all cursor-none"
                        >
                            <span>{copied ? 'Copied!' : email}</span>
                            <span className="material-symbols-outlined">{copied ? 'check' : 'content_copy'}</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t-4 border-dashed border-ink/20">
                        {contacts.map(c => (
                            <a
                                key={c.label}
                                href={c.href}
                                target={c.href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                className={`flex items-center gap-4 p-4 border-2 border-transparent hover:border-ink hover:border-wobbly-sm hover:bg-[#f0f4f8] transition-colors cursor-none group/link ${c.label === 'Email' ? 'hidden sm:flex' : ''}`}
                            >
                                <div className="w-12 h-12 rounded-full border-2 border-ink flex items-center justify-center bg-white shadow-hard-sm group-hover/link:-translate-y-1 transition-transform shrink-0">
                                    {c.devicon
                                        ? <i className={`${c.devicon} text-2xl text-ink`} />
                                        : <span className="material-symbols-outlined text-ink text-2xl">{c.icon}</span>
                                    }
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-heading text-lg font-bold text-ink/60">{c.label}</p>
                                    <p className="font-body text-xl font-bold text-ink truncate">{c.value}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
