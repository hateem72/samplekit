import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useSpring, animated } from "@react-spring/web";
import { TiArrowRight } from "react-icons/ti";

const BentoCard = ({ src, title, description, isVideo = false }) => {
  const cardRef = useRef(null);
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    gsap.to(cardRef.current, {
      rotateX: -y,
      rotateY: x,
      perspective: 700,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.3,
    });
    setHoverOpacity(0);
  };

  const [springProps, api] = useSpring(() => ({
    scale: 1,
    config: { tension: 300, friction: 20 },
  }));

  return (
    <animated.div
      ref={cardRef}
      className="relative h-96 overflow-hidden rounded-lg bg-background-subtle shadow-lg"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setHoverOpacity(1);
        api.start({ scale: 1.05 });
      }}
      onMouseLeave={() => {
        handleMouseLeave();
        api.start({ scale: 1 });
      }}
      style={springProps}
    >
      {isVideo ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <img
          src={src}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="relative z-10 flex h-full flex-col justify-end p-5 text-text-primary">
        <h3 className="text-2xl font-display font-bold">{title}</h3>
        <p className="mt-2 max-w-xs text-sm text-text-secondary">{description}</p>
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: hoverOpacity,
            background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(29, 78, 216, 0.2), transparent)`,
          }}
        />
        <button className="mt-4 flex items-center gap-1 text-primary">
          Learn More <TiArrowRight />
        </button>
      </div>
    </animated.div>
  );
};

export default BentoCard;