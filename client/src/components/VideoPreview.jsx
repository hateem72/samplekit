import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const VideoPreview = ({ src, collegeName, tagline, fallbackImage }) => {
  const videoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      videoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        preload="auto"
        poster={fallbackImage}
        className="absolute inset-0 h-full w-full object-cover"
        onError={() => {
          console.warn("Video failed to load, using fallback image");
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40"></div>
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-background-white"
      >
        <h1 className="text-5xl font-display font-bold md:text-8xl">
          {collegeName}
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-accent md:text-2xl">
          {tagline}
        </p>
      </div>
    </div>
  );
};

export default VideoPreview;