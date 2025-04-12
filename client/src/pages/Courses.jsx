import { useState, useRef, useEffect, memo } from "react";
import AnimatedTitle from "../components/AnimatedTitle";
import PulseCard from "../components/PulseCard";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes, faArrowLeft, faArrowRight, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "@react-spring/web";
import { gsap } from "gsap";
import confetti from "canvas-confetti";

const courses = [
  {
    id: 1,
    title: "Data Science",
    description: "Master AI and analytics with real-world projects.",
    category: "Technology",
    duration: "6 Months",
    level: "Intermediate",
    instructor: "Dr. Priya Sharma",
    price: "$599",
    tags: ["Certified", "Hands-On"],
    syllabus: ["Python Basics", "Machine Learning", "Deep Learning", "Data Visualization"],
    image: "https://via.placeholder.com/600x400?text=Data+Science",
  },
  {
    id: 2,
    title: "Design Arts",
    description: "Create stunning visuals with modern design tools.",
    category: "Arts",
    duration: "4 Months",
    level: "Beginner",
    instructor: "Ms. Anjali Verma",
    price: "$399",
    tags: ["Creative", "Portfolio"],
    syllabus: ["Graphic Design", "UI/UX", "Animation", "Branding"],
    image: "https://via.placeholder.com/600x400?text=Design+Arts",
  },
  {
    id: 3,
    title: "Business Analytics",
    description: "Drive strategic decisions with data insights.",
    category: "Business",
    duration: "5 Months",
    level: "Advanced",
    instructor: "Prof. Rajesh Gupta",
    price: "$499",
    tags: ["Certified", "Strategic"],
    syllabus: ["Statistics", "Predictive Analytics", "Business Intelligence", "Case Studies"],
    image: "https://via.placeholder.com/600x400?text=Business+Analytics",
  },
  {
    id: 4,
    title: "Music Production",
    description: "Learn to compose and produce professional tracks.",
    category: "Music",
    duration: "3 Months",
    level: "Beginner",
    instructor: "Mr. Vikram Singh",
    price: "$349",
    tags: ["Creative", "Practical"],
    syllabus: ["Music Theory", "DAW Basics", "Mixing", "Mastering"],
    image: "https://via.placeholder.com/600x400?text=Music+Production",
  },
  {
    id: 5,
    title: "Cybersecurity",
    description: "Protect systems with cutting-edge security skills.",
    category: "Technology",
    duration: "6 Months",
    level: "Intermediate",
    instructor: "Dr. Neha Kapoor",
    price: "$649",
    tags: ["Certified", "In-Demand"],
    syllabus: ["Network Security", "Ethical Hacking", "Cryptography", "Incident Response"],
    image: "https://via.placeholder.com/600x400?text=Cybersecurity",
  },
  {
    id: 6,
    title: "Financial Management",
    description: "Master budgeting and investment strategies.",
    category: "Business",
    duration: "4 Months",
    level: "Beginner",
    instructor: "Ms. Sonia Mehra",
    price: "$429",
    tags: ["Practical", "Career-Focused"],
    syllabus: ["Accounting", "Investment Analysis", "Risk Management", "Financial Planning"],
    image: "https://via.placeholder.com/600x400?text=Financial+Management",
  },
];

const CourseModal = memo(({ course, onClose, onPrev, onNext }) => {
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);
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
        className="relative max-w-2xl w-full rounded-3xl bg-background-white p-10 shadow-2xl border-2 border-accent/30 backdrop-blur-sm"
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-3xl text-accent hover:text-primary transition-colors"
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
          src={course.image}
          alt={course.title}
          className="h-64 w-full rounded-lg object-cover"
          loading="lazy"
        />
        <h3 className="mt-6 text-3xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {course.title}
        </h3>
        <p className="mt-3 text-lg text-text-secondary">{course.description}</p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <p className="text-accent"><strong>Category:</strong> {course.category}</p>
          <p className="text-accent"><strong>Duration:</strong> {course.duration}</p>
          <p className="text-accent"><strong>Level:</strong> {course.level}</p>
          <p className="text-accent"><strong>Instructor:</strong> {course.instructor}</p>
          <p className="text-accent"><strong>Price:</strong> {course.price}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {course.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm ${
                course.category === "Technology"
                  ? "bg-primary/20 text-primary"
                  : course.category === "Business"
                  ? "bg-secondary/20 text-secondary"
                  : course.category === "Arts"
                  ? "bg-accent/20 text-accent"
                  : "bg-text-primary/20 text-text-primary"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <button
            onClick={() => setIsSyllabusOpen(!isSyllabusOpen)}
            className="flex items-center gap-2 text-accent hover:text-primary transition-colors"
          >
            Syllabus <FontAwesomeIcon icon={isSyllabusOpen ? faChevronUp : faChevronDown} />
          </button>
          {isSyllabusOpen && (
            <ul className="mt-2 list-disc pl-6 text-text-secondary">
              {course.syllabus.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        <a
          href="#register"
          className="mt-6 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-background-white font-bold hover:scale-105 transition-transform"
        >
          Register Now
        </a>
      </animated.div>
    </div>
  );
});

const Courses = () => {
  const coursesRef = useRef(null);
  const filterRef = useRef(null);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = courses
    .filter(
      (course) =>
        category === "All" || course.category === category
    )
    .filter((course) =>
      course.title.toLowerCase().includes(search.toLowerCase())
    );

  const featuredCourse = courses[0]; 

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".course-card",
        { opacity: 0, scale: 0.9, rotate: 5 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
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

      gsap.fromTo(
        ".featured-banner",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        }
      );
    }, coursesRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="courses"
      className="min-h-screen bg-background-white bg-hero-pattern py-24"
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Ccircle cx=\"20\" cy=\"20\" r=\"4\" fill=\"%23B91C1C\" fill-opacity=\"0.1\"/%3E%3C/svg%3E')",
      }}
    >
      <div className="container mx-auto px-4">
        <AnimatedTitle
          title="Explore <br /> Courses"
          className="text-center text-5xl font-display text-text-primary md:text-7xl"
        />
        <p className="mt-6 text-center text-lg text-text-secondary max-w-2xl mx-auto">
          Discover transformative courses at Allenhouse Institute of Technology, designed to shape your future.
        </p>

        <div className="featured-banner mt-12 rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 p-8 relative">
          <h3 className="text-3xl font-display font-bold text-accent">
            Featured Course: {featuredCourse.title}
          </h3>
          <p className="mt-4 text-text-secondary max-w-lg">{featuredCourse.description}</p>
          <button
            onClick={() => setSelectedCourse(featuredCourse)}
            className="mt-6 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-background-white font-bold hover:scale-105 transition-transform"
          >
            Explore Now
          </button>
          <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-accent/30"></div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-6 py-3 rounded-full bg-background-white border border-accent/30 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <div ref={filterRef} className="flex flex-wrap justify-center gap-4">
            {["All", "Technology", "Business", "Arts", "Music"].map((cat) => (
              <Button
                key={cat}
                title={cat}
                icon={faFilter}
                className={`filter-btn rounded-full px-6 py-3 ${
                  category === cat
                    ? "bg-gradient-to-r from-primary to-secondary text-background-white"
                    : "bg-background-pattern text-primary hover:bg-accent/20 hover:text-accent"
                }`}
                onClick={() => {
                  setCategory(cat);
                  gsap.to(`.filter-btn-${cat}`, {
                    scale: 1.2,
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1,
                  });
                }}
              >
                <span className={`filter-btn-${cat}`}>{cat}</span>
              </Button>
            ))}
          </div>
        </div>

        <div ref={coursesRef} className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card relative">
              <PulseCard
                src={course.image}
                title={course.title}
                description={course.description}
                onExplore={() => setSelectedCourse(course)} 
              />
              <span
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold ${
                  course.category === "Technology"
                    ? "bg-primary text-background-white"
                    : course.category === "Business"
                    ? "bg-secondary text-background-white"
                    : course.category === "Arts"
                    ? "bg-accent text-background-white"
                    : "bg-text-primary text-background-white"
                }`}
              >
                {course.category}
              </span>
            </div>
          ))}
        </div>

        {selectedCourse && (
          <CourseModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
            onPrev={() => {
              const currentIndex = courses.findIndex((c) => c.id === selectedCourse.id);
              const prevIndex = (currentIndex - 1 + courses.length) % courses.length;
              setSelectedCourse(courses[prevIndex]);
            }}
            onNext={() => {
              const currentIndex = courses.findIndex((c) => c.id === selectedCourse.id);
              const nextIndex = (currentIndex + 1) % courses.length;
              setSelectedCourse(courses[nextIndex]);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Courses;