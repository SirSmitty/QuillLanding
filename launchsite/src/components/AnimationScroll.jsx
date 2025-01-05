import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function AnimationScroll() {
    const canvasRef = useRef(null);
    const scrollWrapperRef = useRef(null);
    const titleRef = useRef(null); // Ref for the title
    const frameCount = 80;
    const slowFactor = 5;

    const currentFrame = (index) =>
        `/quillAnimation/Downloads${String(index).padStart(4, '0')}.png`;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const scrollWrapper = scrollWrapperRef.current;
        scrollWrapper.style.height = `${frameCount * slowFactor}vh`;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const img = new Image();
        const preloadImages = [];

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            preloadImages.push(img);
        }

        const renderFrame = (index) => {
            img.src = currentFrame(index);
            img.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
        };

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxScrollTop = scrollWrapper.scrollHeight - window.innerHeight;
            const scrollFraction = scrollTop / maxScrollTop;
            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(scrollFraction * frameCount)
            );
            renderFrame(frameIndex + 1);
        };

        window.addEventListener('scroll', handleScroll);

        renderFrame(1);

        // GSAP Typewriter Effect for text
        gsap.fromTo(
            titleRef.current,
            { width: '0' }, // Start with 0 width
            {
                width: '40%', // Matches the desired width of the title
                duration: 3, // Duration of the typewriter effect
                ease: 'steps(40)', // Step easing for typewriter effect
            }
        );

        // GSAP Cursor Blink Effect
        gsap.fromTo(
            titleRef.current,
            { borderRightColor: 'white' },
            {
                borderRightColor: 'transparent',
                repeat: -1,
                duration: 1, // Cursor blink speed
                ease: 'steps(1)',
            }
        );

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={scrollWrapperRef}>
            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                }}
            />
            <div
                ref={titleRef}
                className="anim-typewriter"
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: 'monospace',
                    fontSize: '2rem',
                    color: 'white',
                    borderRight: '2px solid white',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                }}
            >
                <span style={{ fontSize: '5rem' }}>QUILL.</span><br /> <span style={{ fontSize: '1.4vw' }}>Quantum. Universal. Interface. Lock & Ledger.</span>
                <br /> <span style={{ fontSize: '1.3vw' }}>A Commercial Cybersecurity System</span>
            </div>
        </div>
    );
}

export default AnimationScroll;