import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const VideoOrb = ({ src, collegeName, tagline }) => {
  const orbRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orbRef.current, {
        boxShadow: "0 0 20px rgba(185, 28, 28, 0.5)",
        scale: 1.05,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.from(orbRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      });

      gsap.from(".orb-text", {
        opacity: 0,
        y: 50,
        stagger: 0.3,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });
    }, orbRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = ({ clientX, clientY }) => {
    const rect = orbRef.current.getBoundingClientRect();
    const xOffset = (clientX - (rect.left + rect.width / 2)) / 15;
    const yOffset = (clientY - (rect.top + rect.height / 2)) / 15;

    if (isHovering) {
      gsap.to(orbRef.current, {
        x: xOffset,
        y: yOffset,
        rotateY: xOffset / 5,
        rotateX: -yOffset / 5,
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(orbRef.current, {
      x: 0,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={orbRef}
      className="relative mx-auto h-80 w-80 rounded-full overflow-hidden shadow-2xl"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        handleMouseLeave();
      }}
      style={{ perspective: "800px" }}
    >
      <video
        src={src}
        loop
        muted
        autoPlay
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-secondary/30"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-background-white">
        <h1 className="orb-text text-3xl font-display font-bold">
          {collegeName}
        </h1>
        <p className="orb-text mt-2 text-sm max-w-[200px] text-accent">
          {tagline}
        </p>
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center bg-secondary/50 transition-opacity ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
      >
        <FontAwesomeIcon icon={faPlay} className="text-5xl text-background-white" />
      </div>
    </div>
  );
};

export default VideoOrb;