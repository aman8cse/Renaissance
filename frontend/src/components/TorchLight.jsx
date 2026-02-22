import { useEffect, useRef } from "react";
import "../styles/torch.css";

const TorchLight = ({ size = 220, smoothness = 0.12 }) => {
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const current = useRef({ x: mouse.current.x, y: mouse.current.y });

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMove);

    const animate = () => {
      current.current.x +=
        (mouse.current.x - current.current.x) * smoothness;
      current.current.y +=
        (mouse.current.y - current.current.y) * smoothness;

      document.documentElement.style.setProperty(
        "--torch-x",
        `${current.current.x}px`
      );
      document.documentElement.style.setProperty(
        "--torch-y",
        `${current.current.y}px`
      );
      document.documentElement.style.setProperty(
        "--torch-size",
        `${size}px`
      );

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("mousemove", handleMove);
  }, [size, smoothness]);

  return (
    <>
      <div className="torch-overlay" />
      <div className="torch-glow" />
    </>
  );
};

export default TorchLight;