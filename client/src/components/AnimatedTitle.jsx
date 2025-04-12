import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, className }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = containerRef.current.querySelectorAll(".animated-word");
      gsap.from(words, {
        opacity: 0,
        y: 100,
        rotateY: 90,
        stagger: 0.15,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={clsx("animated-title", className)}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex flex-wrap justify-center gap-3 md:gap-4"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word inline-block"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;