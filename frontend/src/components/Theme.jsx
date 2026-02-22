import React, { useRef, useEffect } from "react";
import '../styles/theme.css';
import { gsap } from "gsap";

export default function Background() {
  const canvasRef = useRef(null);
  const torchRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let shapes = [];
    let bubbles = [];
    let mouse = { x: null, y: null };
    let animationFrame;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    ctx.globalCompositeOperation = "lighter";

    // 🌌 Oil Bubble Class (Breathing + Blur)
    class OilBubble {
      constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.baseRadius = radius;
        this.radius = radius;
        this.color = color;
        this.phase = Math.random() * Math.PI * 2;
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );

        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        // Breathing
        this.radius =
          this.baseRadius +
          Math.sin(time * 0.002 + this.phase) * 10;

        // Mouse repulsion
        if (mouse.x && mouse.y) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            this.x += dx * 0.01;
            this.y += dy * 0.01;
          }
        }

        this.draw();
      }
    }

    // 🔷 Shape Class (Circle + Triangle)
    class Shape {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 8;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.type = Math.random() > 0.6 ? "triangle" : "circle";

        const colors = [
          "rgba(180, 0, 255, 0.6)",
          "rgba(0, 200, 255, 0.6)",
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        if (this.type === "circle") {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else {
          ctx.moveTo(this.x, this.y - this.size);
          ctx.lineTo(this.x - this.size, this.y + this.size);
          ctx.lineTo(this.x + this.size, this.y + this.size);
          ctx.closePath();
        }

        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Subtle mouse repulsion
        if (mouse.x && mouse.y) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            this.x += dx * 0.015;
            this.y += dy * 0.015;
          }
        }

        // Wrap edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.draw();
      }
    }

    // 🌌 Create limited bubbles (ONLY 3)
    bubbles.push(
      new OilBubble(canvas.width * 0.3, canvas.height * 0.4, 200, "rgba(150, 0, 255, 0.25)")
    );
    bubbles.push(
      new OilBubble(canvas.width * 0.7, canvas.height * 0.6, 240, "rgba(0, 180, 255, 0.2)")
    );
    bubbles.push(
      new OilBubble(canvas.width * 0.5, canvas.height * 0.8, 180, "rgba(120, 0, 255, 0.18)")
    );

    // 🔷 Create few geometric shapes (ONLY 12)
    for (let i = 0; i < 12; i++) {
      shapes.push(new Shape());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      bubbles.forEach(b => b.update());
      shapes.forEach(s => s.update());

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      gsap.to(torchRef.current, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2,
        ease: "power2.out"
      });
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="bgCanvas" />
      <div ref={torchRef} className="torchOverlay" />
    </>
  );
}