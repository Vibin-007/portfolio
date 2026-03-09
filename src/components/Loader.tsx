import { useEffect, useRef } from 'react';

interface LoaderProps {
    onDone: () => void;
}

export default function Loader({ onDone }: LoaderProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (ref.current) {
                ref.current.style.opacity = '0';
                ref.current.style.pointerEvents = 'none';
                setTimeout(onDone, 600);
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, [onDone]);

    return (
        <div
            ref={ref}
            className="fixed inset-0 bg-paper z-[10000] flex flex-col items-center justify-center gap-6 transition-opacity duration-600"
        >
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Hand-drawn spinning circles */}
                <div className="absolute inset-0 border-4 border-dashed border-ink border-wobbly rounded-full animate-[spin_3s_linear_infinite]" />
                <div className="absolute inset-2 border-4 border-dashed border-accent border-wobbly-md rounded-full animate-[spin_2s_linear_infinite_reverse]" />
            </div>
            <p className="font-heading text-4xl text-ink font-bold animate-pulse">
                Scribbling details...
            </p>
        </div>
    );
}
