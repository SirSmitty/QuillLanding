import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

const VerticalParallax = () => {
    gsap.registerPlugin(ScrollTrigger);
    useEffect(() => {
        gsap.set(".panel", { zIndex: (i, target, targets) => targets.length - i });

        // Animate panels
        const images = gsap.utils.toArray(".panel");
        images.forEach((image, i) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".black",
                    start: () => `top -${window.innerHeight * i}`,
                    end: () => `+=${window.innerHeight}`,
                    scrub: true,
                    toggleActions: "play none reverse none",
                    invalidateOnRefresh: true,
                },
            }).fromTo(
                image,
                { height: "100%" },
                { height: "0%" }
            );
        });

        // Animate panel texts
        gsap.set(".panel-text", { zIndex: (i, target, targets) => targets.length - i });
        const texts = gsap.utils.toArray(".panel-text");
        texts.forEach((text, i) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".black",
                    start: () => `top -${window.innerHeight * i}`,
                    end: () => `+=${window.innerHeight}`,
                    scrub: true,
                    toggleActions: "play none reverse none",
                    invalidateOnRefresh: true,
                },
            })
                .fromTo(text, { y: "100%", opacity: 0 }, { y: "50%", opacity: 1, duration: 0.33 })
                .to(text, { y: "0%", opacity: 0, duration: 0.33 }, 0.66);
        });

        ScrollTrigger.create({
            trigger: ".black",
            scrub: true,
            markers: true,
            pin: true,
            start: "top top",
            end: () => `+=${(images.length + 1) * window.innerHeight}`,
            invalidateOnRefresh: true,
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="scroller">
            <div className="black">
                <div className="text-wrap">
                    <div className="panel-text blue-text">Blue</div>
                    <div className="panel-text red-text">Red</div>
                    <div className="panel-text orange-text">Orange</div>
                    <div className="panel-text purple-text">Purple</div>
                </div>
                <div className="p-wrap">
                    <div className="panel blue"></div>
                    <div className="panel red"></div>
                    <div className="panel orange"></div>
                    <div className="panel purple"></div>
                </div>
            </div>
        </div>
    );
};

export default VerticalParallax;