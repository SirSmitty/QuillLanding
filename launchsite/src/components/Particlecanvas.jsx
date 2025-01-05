import React, { useRef, useEffect } from "react";

const ParticleCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, "white");

        ctx.fillStyle = gradient;
        ctx.strokeStyle = "white";

        class Particle {
            constructor(effect) {
                this.effect = effect;
                this.radius = Math.floor(Math.random() * 5 + 1);
                this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
                this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
                this.vx = Math.random() * 1 - 0.5;
                this.vy = Math.random() * 1 - 0.5;
                this.pushX = 0;
                this.pushY = 0;
                this.friction = 0.75;
            }
            draw(context) {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.fill();
            }
            update() {
                const dx = this.x - this.effect.mouse.x;
                const dy = this.y - this.effect.mouse.y;
                const distance = Math.hypot(dx, dy);
                const force = this.effect.mouse.radius / distance;

                if (distance < this.effect.mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    this.pushX += Math.cos(angle) * force;
                    this.pushY += Math.sin(angle) * force;
                }

                this.x += (this.pushX *= this.friction) + this.vx;
                this.y += (this.pushY *= this.friction) + this.vy;

                if (this.x < this.radius) {
                    this.x = this.radius;
                    this.vx *= -1;
                } else if (this.x > this.effect.width - this.radius) {
                    this.x = this.effect.width - this.radius;
                    this.vx *= -1;
                }
                if (this.y < this.radius) {
                    this.y = this.radius;
                    this.vy *= -1;
                } else if (this.y > this.effect.height - this.radius) {
                    this.y = this.effect.height - this.radius;
                    this.vy *= -1;
                }
            }
            reset() {
                this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
                this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
            }
        }


        class Effect {
            constructor(canvas, context) {
                this.canvas = canvas;
                this.context = context;
                this.width = this.canvas.width;
                this.height = this.canvas.height;
                this.particles = [];
                this.numberOfParticles = 250;
                this.createParticles();

                this.mouse = {
                    x: -100, // Start off-screen
                    y: -100, // Start off-screen
                    radius: 200,
                };

                window.addEventListener("resize", this.resize.bind(this));
                window.addEventListener("mousemove", (e) => {
                    this.mouse.x = e.x;
                    this.mouse.y = e.y;
                });
            }
            createParticles() {
                for (let i = 0; i < this.numberOfParticles; i++) {
                    this.particles.push(new Particle(this));
                }
            }
            handleParticles() {
                this.connectParticles();
                this.particles.forEach((particle) => {
                    particle.draw(this.context);
                    particle.update();
                });
            }
            connectParticles() {
                // connection line distance
                const maxDistance = 125;
                for (let a = 0; a < this.particles.length; a++) {
                    for (let b = a; b < this.particles.length; b++) {
                        const dx = this.particles[a].x - this.particles[b].x;
                        const dy = this.particles[a].y - this.particles[b].y;
                        const distance = Math.hypot(dx, dy);
                        if (distance < maxDistance) {
                            this.context.save();
                            const opacity = 1 - distance / maxDistance;
                            this.context.globalAlpha = opacity;
                            this.context.beginPath();
                            this.context.moveTo(this.particles[a].x, this.particles[a].y);
                            this.context.lineTo(this.particles[b].x, this.particles[b].y);
                            this.context.stroke();
                            this.context.restore();
                        }
                    }
                }
            }
            resize() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
                this.width = window.innerWidth;
                this.height = window.innerHeight;
                const gradient = this.context.createLinearGradient(0, 0, this.width, this.height);
                gradient.addColorStop(0, "white");
                this.context.fillStyle = gradient;
                this.context.strokeStyle = "white";
                this.particles.forEach((particle) => {
                    particle.reset();
                });
            }
        }


        const effect = new Effect(canvas, ctx);

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            effect.handleParticles();
            requestAnimationFrame(animate);
        }
        animate();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="canvas1"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 0,
                opacity: '0.5',
                width: "100vw",
                height: "100vh",
            }}
        ></canvas>
    );
};

export default ParticleCanvas;