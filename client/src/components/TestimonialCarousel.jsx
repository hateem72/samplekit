import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const TestimonialCarousel = ({ testimonials }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const [springProps, api] = useSpring(() => ({
    opacity: 1,
    transform: "translateY(0px)",
    config: { tension: 300, friction: 20 },
  }));

  useEffect(() => {
    api.start({
      opacity: 0,
      transform: "translateY(50px)",
      onRest: () =>
        api.start({ opacity: 1, transform: "translateY(0px)", immediate: false }),
    });
  }, [index, api]);

  return (
    <animated.div style={springProps} className="relative max-w-2xl mx-auto">
      <div className="rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 text-background-white">
        <FontAwesomeIcon icon={faQuoteLeft} className="text-4xl opacity-50" />
        <p className="mt-4 text-lg italic">{testimonials[index].quote}</p>
        <p className="mt-4 font-bold text-accent">
          — {testimonials[index].author}
        </p>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 rounded-full ${
              i === index ? "bg-primary" : "bg-background-pattern"
            }`}
          ></button>
        ))}
      </div>
    </animated.div>
  );
};

export default TestimonialCarousel;