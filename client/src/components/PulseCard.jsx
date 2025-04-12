import { useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";


const PulseCard = ({ src, title, description , onExplore }) => {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const buttonRef = useRef(null);
  const iconRef = useRef(null);
  const animationRef = useRef(null);

  const imageSrc = src || `https://via.placeholder.com/600x400?text=${encodeURIComponent(title)}`;

  useEffect(() => {
   animationRef.current = gsap.context(() => {
      
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.8, rotateY: 15 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.5 }
      );

      gsap.set(iconRef.current, { opacity: 0, scale: 0, rotate: 180 });
    }, cardRef);

    return () => animationRef.current?.revert();
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y - rect.height / 2) / 20;
    const rotateY = (x - rect.width / 2) / 20;

    gsap.to(cardRef.current, {
      rotateX: -rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(spotlightRef.current, {
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(251, 191, 36, 0.3) 0%, transparent 50%)`,
      duration: 0.3,
    });
  };

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      boxShadow: "0 15px 30px rgba(185, 28, 28, 0.4)",
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(iconRef.current, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    });

    gsap.to(buttonRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });

    gsap.to(iconRef.current, {
      opacity: 0,
      scale: 0,
      rotate: 180,
      duration: 0.4,
      ease: "power2.in",
    });

    gsap.to(spotlightRef.current, {
      background: "transparent",
      duration: 0.3,
    });

    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative h-96 w-full overflow-hidden rounded-3xl bg-background-white shadow-lg transition-transform duration-300"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        clipPath: "polygon(10% 0%, 90% 0%, 100% 90%, 0% 100%)",
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Ccircle cx=\"20\" cy=\"20\" r=\"4\" fill=\"%23B91C1C\" fill-opacity=\"0.1\"/%3E%3C/svg%3E')",
      }}
    >
      <div
        ref={spotlightRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ mixBlendMode: "overlay" }}
      />

      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-115"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-secondary/20 z-20"></div>

      <div className="relative z-30 flex h-full flex-col justify-end p-8 text-background-white">
        <h3 className="text-3xl font-display font-bold bg-gradient-to-r from-accent to-background-white bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="mt-3 max-w-xs text-sm opacity-90">{description}</p>
        <button
          ref={buttonRef}
          onClick={onExplore}
          className="mt-5 flex items-center gap-3 text-accent hover:text-background-white transition-colors"
        >
          Explore <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      <div
        ref={iconRef}
        className="absolute top-4 right-4 h-12 w-12 rounded-full bg-accent flex items-center justify-center z-30"
      >
        <FontAwesomeIcon icon={faStar} className="text-background-white text-lg" />
      </div>

      <div className="absolute inset-0 border-2 border-accent/30 rounded-3xl z-20 pointer-events-none backdrop-blur-0"></div>
    </div>
  );
};

export default memo(PulseCard);