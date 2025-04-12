import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import AnimatedTitle from "../components/AnimatedTitle";
import Button from "../components/Button";
import PulseCard from "../components/PulseCard";
import TestimonialCarousel from "../components/TestimonialCarousel";
import VideoPreview from "../components/VideoPreview";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBookOpen,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";

const collegeInfo = {
  name: "Allenhouse Institute of Technology",
  tagline: "Engineering the Future, Inspiring Innovation",
};

const stats = [
  { value: "6000+", label: "Students", icon: faUsers },
  { value: "120+", label: "Courses", icon: faBookOpen },
  { value: "80+", label: "Faculty", icon: faChalkboardTeacher },
];

const courses = [
  {
    id: 1,
    title: "Data Science",
    description: "Dive into AI and analytics with real-world projects.",
    image: "https://via.placeholder.com/600x400?text=Data+Science",
  },
  {
    id: 2,
    title: "Design Arts",
    description: "Unleash creativity with cutting-edge tools.",
    image: "https://via.placeholder.com/600x400?text=Design+Arts",
  },
];

const highlights = [
  {
    id: 1,
    title: "Advanced Labs",
    description: "State-of-the-art facilities for hands-on learning.",
    image: "https://via.placeholder.com/600x400?text=Advanced+Labs",
  },
  {
    id: 2,
    title: "Modern Library",
    description: "A hub of knowledge with digital resources.",
    image: "https://via.placeholder.com/600x400?text=Modern+Library",
  },
  {
    id: 3,
    title: "Sports Arena",
    description: "World-class amenities for fitness and teamwork.",
    image: "https://via.placeholder.com/600x400?text=Sports+Arena",
  },
];

const testimonials = [
  {
    id: 1,
    quote: "Allenhouse transformed my career with hands-on projects!",
    author: "Priya S., B.Tech 2024",
  },
  {
    id: 2,
    quote: "The faculty here are true mentors and innovators.",
    author: "Rahul K., M.Tech 2023",
  },
  {
    id: 3,
    quote: "I've gained valuable industry insights through this college.",
    author: "Neha D., B.Tech 2025",
  },
  {
    id: 4,
    quote: "The library is a treasure trove of knowledge.",
    author: "Vijay S., B.Tech 2023",
  },

];

const events = [
  {
    id: 1,
    title: "Tech Symposium 2025",
    description: "Join industry leaders for cutting-edge insights.",
    image: "https://via.placeholder.com/600x400?text=Tech+Symposium",
  },
  {
    id: 2,
    title: "Cultural Fest",
    description: "Celebrate diversity with music and art.",
    image: "https://via.placeholder.com/600x400?text=Cultural+Fest",
  },
];

const Home = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const programsRef = useRef(null);
  const highlightsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const eventsRef = useRef(null);
  const ctaRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          onComplete: () => setLoading(false),
        }
      );

      gsap.fromTo(
        ".pulse-stat",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, stagger: 0.2, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        ".programs-title",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        ".pulse-highlight",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, stagger: 0.2, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        testimonialsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        ".pulse-event",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, stagger: 0.2, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="home" className="bg-background-white bg-hero-pattern">
      {loading && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-white">
    <Loading size="lg" />
  </div>
)}

      <div ref={heroRef}>
        <VideoPreview
          src="/videos/v.mp4"
          collegeName={collegeInfo.name}
          tagline={collegeInfo.tagline}
          fallbackImage="https://via.placeholder.com/1200x800?text=Campus+Video"
        />
        <div className="container mx-auto px-4 py-12 text-center">
          <AnimatedTitle
            title="Welcome to <br /> Allenhouse"
            className="text-5xl font-display text-text-primary md:text-7xl"
          />
          <p className="mt-6 max-w-lg mx-auto text-lg text-text-secondary">
            Fuel your passion for learning with a vibrant campus experience.
          </p>
          <Button title="Explore Now" className="mt-10" />
        </div>
      </div>

      <div ref={statsRef} className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="pulse-stat flex flex-col items-center rounded-3xl bg-background-white p-10 shadow-xl"
            >
              <FontAwesomeIcon
                icon={stat.icon}
                className="text-4xl text-primary mb-4"
              />
              <span className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="mt-3 text-lg text-text-secondary">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div ref={programsRef} className="container mx-auto px-4 py-24">
        <h2 className="programs-title text-center text-5xl font-display font-bold text-text-primary relative">
          Top Programs
          <span className="absolute left-1/2 -bottom-4 h-1 w-24 bg-gradient-to-r from-primary to-secondary transform -translate-x-1/2"></span>
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {courses.map((course) => (
            <PulseCard
              key={course.id}
              src={course.image}
              title={course.title}
              description={course.description}
            />
          ))}
        </div>
      </div>

      <div
        ref={highlightsRef}
        className="container mx-auto px-4 py-24 bg-gradient-to-br from-primary/10 to-secondary/10"
      >
        <h2 className="text-center text-5xl font-display font-bold text-text-primary relative">
          Campus Highlights
          <span className="absolute left-1/2 -bottom-4 h-1 w-24 bg-gradient-to-r from-primary to-secondary transform -translate-x-1/2"></span>
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="pulse-highlight">
              <PulseCard
                src={highlight.image}
                title={highlight.title}
                description={highlight.description}
              />
            </div>
          ))}
        </div>
      </div>

      <div ref={testimonialsRef} className="container mx-auto px-4 py-24">
        <h2 className="text-center text-5xl font-display font-bold text-text-primary relative">
          Student Voices
          <span className="absolute left-1/2 -bottom-4 h-1 w-24 bg-gradient-to-r from-primary to-secondary transform -translate-x-1/2"></span>
        </h2>
        <div className="mt-12">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </div>

      <div ref={eventsRef} className="container mx-auto px-4 py-24">
        <h2 className="text-center text-5xl font-display font-bold text-text-primary relative">
          Upcoming Events
          <span className="absolute left-1/2 -bottom-4 h-1 w-24 bg-gradient-to-r from-primary to-secondary transform -translate-x-1/2"></span>
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {events.map((event) => (
            <div key={event.id} className="pulse-event">
              <PulseCard
                src={event.image}
                title={event.title}
                description={event.description}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        ref={ctaRef}
        className="relative py-32 text-center bg-gradient-to-r from-primary to-secondary"
        style={{
          clipPath: "polygon(0% 15%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-display font-bold text-background-white">
            Ready to Shape Your Future?
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-lg text-background-white opacity-90">
            Join Allenhouse Institute of Technology and unleash your potential.
          </p>
          <Button title="Apply Now" className="mt-10 bg-accent text-background-white" />
        </div>
        <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-accent/30"></div>
        <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-background-white/20"></div>
      </div>
    </div>
  );
};

export default Home;