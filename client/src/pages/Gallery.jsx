import { useEffect, useRef, useState, memo } from "react";
import { gsap } from "gsap";
import AnimatedTitle from "../components/AnimatedTitle";
import { useSpring, animated } from "@react-spring/web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import confetti from "canvas-confetti";

const galleryImages = [
  {
    id: 1,
    src: "./images/sample.png",
    title: "Campus View",
    category: "Campus",
    caption: "Aerial view of Allenhouse’s vibrant campus.",
  },
  {
    id: 2,
    src: "./images/sample.png",
    title: "Tech Summit",
    category: "Events",
    caption: "Innovation Summit 2025 keynote session.",
  },
  {
    id: 3,
    src: "./images/sample.png",
    
    title: "AI Lab",
    category: "Labs",
    caption: "Students working in the state-of-the-art AI lab.",
  },
  {
    id: 4,
    src: "./images/sample.png",
    title: "Graduation Day",
    category: "Students",
    caption: "Celebrating the Class of 2024’s success.",
  },
  {
    id: 5,
    src: "./images/sample.png",
    title: "Modern Library",
    category: "Campus",
    caption: "A hub of knowledge and innovation.",
  },
  {
    id: 6,
    src: "./images/sample.png",
    title: "Art Fest",
    category: "Events",
    caption: "Creative exhibitions at Allenhouse Art Fest.",
  },
  {
    id: 7,
    src: "./images/sample.png",
    title: "Robotics Lab",
    category: "Labs",
    caption: "Building the future with robotics.",
  },
  {
    id: 8,
    src: "./images/sample.png",
    title: "Sports Day",
    category: "Students",
    caption: "Students competing in thrilling matches.",
  },
];

const ImageModal = memo(({ image, onClose, onPrev, onNext }) => {
  const [springProps, api] = useSpring(() => ({
    from: { opacity: 0, scale: 0.7, rotate: 10 },
    to: { opacity: 1, scale: 1, rotate: 0 },
    config: { tension: 400, friction: 15 },
  }));

  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#B91C1C", "#1E3A8A", "#FBBF24"],
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <animated.div
        style={springProps}
        className="relative max-w-4xl w-full rounded-3xl bg-background-white p-8 shadow-2xl border-2 border-accent/30 backdrop-blur-0"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl text-accent hover:text-primary transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-accent hover:text-primary transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-accent hover:text-primary transition-colors"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        <img
          src={image.src}
          alt={image.title}
          className="w-full h-[60vh] object-contain rounded-lg"
          loading="lazy"
        />
        <div className="mt-4 text-center">
          <h3 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {image.title}
          </h3>
          <p className="mt-2 text-text-secondary">{image.caption}</p>
        </div>
      </animated.div>
    </div>
  );
});

const Gallery = () => {
  const galleryRef = useRef(null);
  const filterRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dragState, setDragState] = useState({ isDragging: false, startX: 0, translateX: 0 });

  const categories = ["All", "Campus", "Events", "Labs", "Students"];
  const filteredImages =
    categoryFilter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === categoryFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image entrance
      gsap.fromTo(
        ".gallery-image",
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        }
      );

      gsap.fromTo(
        ".filter-btn",
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, imageRef) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y - rect.height / 2) / 20;
    const rotateY = (x - rect.width / 2) / 20;

    gsap.to(imageRef.current, {
      rotateX: -rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(imageRef.current.querySelector(".spotlight"), {
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(251, 191, 36, 0.3) 0%, transparent 50%)`,
      duration: 0.3,
    });
  };

  const handleMouseLeave = (imageRef) => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
    gsap.to(imageRef.current.querySelector(".spotlight"), {
      background: "transparent",
      duration: 0.3,
    });
  };

  const handleMouseDown = (e) => {
    setDragState({
      isDragging: true,
      startX: e.clientX,
      translateX: dragState.translateX,
    });
  };

  const handleMouseMoveDrag = (e) => {
    if (!dragState.isDragging) return;
    const deltaX = e.clientX - dragState.startX;
    setDragState((prev) => ({ ...prev, translateX: prev.translateX + deltaX }));
  };

  const handleMouseUp = () => {
    if (!dragState.isDragging) return;
    setDragState({ isDragging: false, startX: 0, translateX: 0 });
  };

  return (
    <div
      id="gallery"
      className="min-h-screen bg-background-white bg-hero-pattern py-24"
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Ccircle cx=\"20\" cy=\"20\" r=\"4\" fill=\"%23B91C1C\" fill-opacity=\"0.1\"/%3E%3C/svg%3E')",
      }}
    >
      <div className="container mx-auto px-4">
        <AnimatedTitle
          title="Our <br /> Gallery"
          className="text-center text-5xl font-display text-text-primary md:text-7xl"
        />
        <p className="mt-6 text-center text-lg text-text-secondary max-w-2xl mx-auto">
          Explore vibrant moments at Allenhouse Institute of Technology, from campus life to thrilling events.
        </p>

        <div ref={filterRef} className="mt-12 flex justify-center flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn px-6 py-2 rounded-full font-bold transition-transform ${
                category === categoryFilter
                  ? "bg-gradient-to-r from-primary to-secondary text-background-white scale-110"
                  : "bg-background-pattern text-text-primary hover:bg-accent/20 hover:text-accent"
              }`}
              onClick={() => {
                setCategoryFilter(category);
                gsap.to(`.filter-btn-${category}`, {
                  scale: 1.2,
                  duration: 0.3,
                  yoyo: true,
                  repeat: 1,
                });
              }}
            >
              <span className={`filter-btn-${category}`}>{category}</span>
            </button>
          ))}
        </div>

        <div
          ref={galleryRef}
          className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-8"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMoveDrag}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {filteredImages.map((image) => {
            const imageRef = useRef(null);
            return (
              <div
                key={image.id}
                className="gallery-image mb-8 break-inside-avoid relative rounded-3xl overflow-hidden shadow-lg cursor-pointer"
                style={{ perspective: "1000px" }}
                onClick={() => setSelectedImage(image)}
                onMouseMove={(e) => handleMouseMove(e, imageRef)}
                onMouseEnter={() => {
                  gsap.to(imageRef.current, {
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(185, 28, 28, 0.4)",
                    duration: 0.4,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={() => handleMouseLeave(imageRef)}
                ref={imageRef}
              >
                <div className="spotlight absolute inset-0 z-10 pointer-events-none" style={{ mixBlendMode: "overlay" }} />
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-115"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent z-20"></div>
                <div className="absolute bottom-0 p-6 z-30 text-background-white">
                  <h3 className="text-xl font-display font-bold bg-gradient-to-r from-accent to-background-white bg-clip-text text-transparent">
                    {image.title}
                  </h3>
                </div>
                <span
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold ${
                    image.category === "Campus"
                      ? "bg-primary text-background-white"
                      : image.category === "Events"
                      ? "bg-accent text-background-white"
                      : image.category === "Labs"
                      ? "bg-secondary text-background-white"
                      : "bg-text-primary text-background-white"
                  }`}
                >
                  {image.category}
                </span>
                <div className="absolute inset-0 border-2 border-accent/30 rounded-3xl z-20 pointer-events-none backdrop-blur-0"></div>
              </div>
            );
          })}
        </div>

        {selectedImage && (
          <ImageModal
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
            onPrev={() => {
              const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage.id);
              const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
              setSelectedImage(galleryImages[prevIndex]);
            }}
            onNext={() => {
              const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage.id);
              const nextIndex = (currentIndex + 1) % galleryImages.length;
              setSelectedImage(galleryImages[nextIndex]);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;