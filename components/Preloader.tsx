import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Simulate loading progress
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, 20); // Adjust speed of counter

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress === 100 && containerRef.current) {
            const tl = gsap.timeline();

            // Exit Animation sequence
            tl.to(counterRef.current, {
                opacity: 0,
                y: -50,
                duration: 0.5,
                ease: "power2.in"
            })
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: "power4.inOut",
                    delay: 0.2
                })
                .set(containerRef.current, { display: 'none' });
        }
    }, [progress]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-deep-space flex items-center justify-center text-neon-lime"
        >
            <div ref={counterRef} className="text-[12vw] md:text-[8vw] font-display font-bold leading-none tabular-nums mix-blend-difference">
                {progress}%
            </div>

            {/* Decorative curtain lines */}
            <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="border-r border-white/5 h-full" />
                ))}
            </div>
        </div>
    );
};

export default Preloader;
