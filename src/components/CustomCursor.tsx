import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const [outlinePosition, setOutlinePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Disabled on touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            setIsTouchDevice(true);
            return;
        }

        const updateMousePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        let animationFrameId: number;

        const animateOutline = () => {
            setOutlinePosition((prev) => {
                const distX = position.x - prev.x;
                const distY = position.y - prev.y;
                return {
                    x: prev.x + distX * 0.15,
                    y: prev.y + distY * 0.15,
                };
            });
            animationFrameId = requestAnimationFrame(animateOutline);
        };

        window.addEventListener('mousemove', updateMousePosition);
        animateOutline();

        const handleMouseOver = (e: Event) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('interactive') ||
                target.closest('.interactive')
            ) {
                document.body.classList.add('cursor-hover');
            } else {
                document.body.classList.remove('cursor-hover');
            }
        };

        window.addEventListener('mouseover', handleMouseOver);


        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            cancelAnimationFrame(animationFrameId);
            document.body.classList.remove('cursor-hover');
        };
    }, [position.x, position.y]);

    if (isTouchDevice) return null;

    return (
        <>
            <div
                className="cursor-dot"
                style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            />
            <div
                className="cursor-outline"
                style={{ transform: `translate(${outlinePosition.x}px, ${outlinePosition.y}px)` }}
            />
        </>
    );
}
