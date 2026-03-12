'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorInnerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Use quickTo for high performance mouse following
        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.3, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.3, ease: "power3" });

        // Inner dot follows instantly
        const xToInner = gsap.quickTo(cursorInnerRef.current, "x", { duration: 0.1, ease: "power3" });
        const yToInner = gsap.quickTo(cursorInnerRef.current, "y", { duration: 0.1, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
            xToInner(e.clientX);
            yToInner(e.clientY);
        };

        const handleHoverStart = () => {
            gsap.to(cursorRef.current, { scale: 3, opacity: 0.5, duration: 0.3 });
            gsap.to(cursorInnerRef.current, { opacity: 0, duration: 0.3 }); // Hide inner dot on hover
        };

        const handleHoverEnd = () => {
            gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
            gsap.to(cursorInnerRef.current, { opacity: 1, duration: 0.3 });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Add listeners to interactive elements
        const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleHoverStart);
            el.addEventListener('mouseleave', handleHoverEnd);
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
        };
    }, []);

    return (
        <>
            {/* Outer Follower */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-neon-lime pointer-events-none z-[10000] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block" // Hidden on touch devices
            />
            {/* Inner Dot */}
            <div
                ref={cursorInnerRef}
                className="fixed top-0 left-0 w-2 h-2 bg-neon-lime rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2 hidden md:block"
            />
        </>
    );
};

export default CustomCursor;
