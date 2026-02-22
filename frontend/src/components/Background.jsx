import React, { useRef, useEffect } from "react";
import '../styles/background.css';
import { gsap } from "gsap";

export default function Background() {
  const canvasRef = useRef(null);
  const torchRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    let mouse = { x: null, y: null };
    let animationFrame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    //  Particle Class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 4 + 2;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = "rgba(180, 180, 255, 0.2)";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        // Repel from mouse
        if (mouse.x && mouse.y) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const force = (120 - dist) / 120;
            this.x += dx * force * 0.02;
            this.y += dy * force * 0.02;
          }
        }

        this.x += this.vx;
        this.y += this.vy;

        // Wrap edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.draw();
      }
    }

    // Create particles
    for (let i = 0; i < 120; i++) {
      particles.push(new Particle());
    }

      const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          particles.forEach(p => p.update());

          animationFrame = requestAnimationFrame(animate);
          ctx.beginPath();
          ctx.fillStyle = "rgba(100, 150, 255, 0.05)";
          ctx.arc(canvas.width * 0.3, canvas.height * 0.4, 200, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = "rgba(255, 120, 180, 0.04)";
          ctx.arc(canvas.width * 0.7, canvas.height * 0.6, 250, 0, Math.PI * 2);
          ctx.fill();
      };

    animate();

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Torch follow animation (GSAP smoothness)
      gsap.to(torchRef.current, {
        x: e.clientX - 150,
        y: e.clientY - 150,
        duration: 0.2,
        ease: "power2.out"
      });

        gsap.to(bubble, {
            x: "+=50",
            duration: 10,
            repeat: -1,
            yoyo: true
        });
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="bgCanvas" />
      <div ref={torchRef} className="torchOverlay" />
    </>
  );
}