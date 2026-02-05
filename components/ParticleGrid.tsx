import React, { useEffect, useRef } from 'react';

const ParticleGrid: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles: { x: number; y: number; z: number; size: number; color: string }[] = [];
        const particleCount = 4000; // Dense field
        const cx = width / 2;
        const cy = height / 2;

        const init = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                // Distribute mainly near the horizon (y = center)
                const x = (Math.random() - 0.5) * width * 3;
                // Exponential distribution for horizon concentration
                const ySpread = Math.pow(Math.random(), 3) * height * (Math.random() < 0.5 ? 1 : -1);
                const z = Math.random() * 2000;

                // Color based on distance from center - Adapted to Brand (Neon Lime/Teal)
                const dist = Math.sqrt(x * x + ySpread * ySpread);
                let color = 'rgba(200, 200, 255, 0.3)'; // default white/blueish stars

                if (dist < 400) {
                    color = `rgba(201, 255, 0, ${Math.random() * 0.8})`; // Neon Lime Core
                } else if (dist < 800) {
                    color = `rgba(50, 200, 180, ${Math.random() * 0.6})`; // Teal/Emerald mid
                }
                particles.push({
                    x: x,
                    y: ySpread, // Relative to center
                    z: z,
                    size: Math.random() * 1.5,
                    color: color
                });
            }
        };

        const animate = () => {
            ctx.fillStyle = '#030303'; // Deep space bg
            ctx.fillRect(0, 0, width, height);

            particles.forEach(p => {
                // Move towards viewer - Slower, majestic speed
                p.z -= 0.5;
                if (p.z <= 0) p.z = 2000;

                // 3D Projection
                const scale = 500 / (500 + p.z); // Perspective
                const x2d = cx + p.x * scale;
                const y2d = cy + p.y * scale * 0.5; // Flatten y for horizon effect

                // Draw
                const alpha = (1 - p.z / 2000);
                ctx.fillStyle = p.color;

                // Optional: vary size by z
                const s = p.size * scale;

                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(x2d, y2d, s, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            });

            requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            // Re-init mainly to fix center position
            particles.length = 0;
            init();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none bg-deep-space"
        />
    );
};

export default ParticleGrid;
