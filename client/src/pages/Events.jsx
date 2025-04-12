import { useEffect, useRef, useState, memo } from "react";
import { gsap } from "gsap";
import AnimatedTitle from "../components/AnimatedTitle";
import PulseCard from "../components/PulseCard";
import { useSpring, animated } from "@react-spring/web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCalendar, faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import confetti from "canvas-confetti";

const events = [
  {
    id: 1,
    title: "Innovation Summit 2025",
    description: "Join tech leaders for a transformative experience in AI and robotics.",
    category: "Tech",
    date: "March 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Main Auditorium",
    organizer: "Allenhouse Tech Club",
    tags: ["Free", "Keynote Speakers"],
    registrationLink: "https://example.com/register/summit",
    images: [
      "https://via.placeholder.com/600x400?text=Innovation+Summit+1",
      "https://via.placeholder.com/600x400?text=Innovation+Summit+2",
    ],
  },
  {
    id: 2,
    title: "Art Fest",
    description: "Celebrate creativity with workshops, exhibitions, and live performances.",
    category: "Cultural",
    date: "April 10, 2025",
    time: "12:00 PM - 8:00 PM",
    location: "Art Gallery",
    organizer: "Allenhouse Cultural Society",
    tags: ["Open to All", "Workshops"],
    registrationLink: "https://example.com/register/artfest",
    images: [
      "https://via.placeholder.com/600x400?text=Art+Fest+1",
      "https://via.placeholder.com/600x400?text=Art+Fest+2",
    ],
  },
  {
    id: 3,
    title: "Sports Extravaganza",
    description: "Compete in thrilling matches and cheer for your team!",
    category: "Sports",
    date: "May 20, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Sports Arena",
    organizer: "Allenhouse Sports Committee",
    tags: ["Free Entry", "Prizes"],
    registrationLink: "https://example.com/register/sports",
    images: [
      "https://via.placeholder.com/600x400?text=Sports+Extravaganza+1",
      "https://via.placeholder.com/600x400?text=Sports+Extravaganza+2",
    ],
  },
  {
    id: 4,
    title: "Research Symposium",
    description: "Present your ideas and learn from cutting-edge research.",
    category: "Academic",
    date: "June 5, 2025",
    time: "11:00 AM - 3:00 PM",
    location: "Conference Hall",
    organizer: "Allenhouse Research Wing",
    tags: ["Students Only", "Certificates"],
    registrationLink: "https://example.com/register/symposium",
    images: [
      "https://via.placeholder.com/600x400?text=Research+Symposium+1",
      "https://via.placeholder.com/600x400?text=Research+Symposium+2",
    ],
  },
];

const EventModal = memo(({ event, onClose }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [springProps, api] = useSpring(() => ({
    from: { opacity: 0, scale: 0.7, rotate: 10 },
    to: { opacity: 1, scale: 1, rotate: 0 },
    config: { tension: 400, friction: 15 },
  }));

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#B91C1C", "#1E3A8A", "#FBBF24"],
    });

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % event.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [event.images.length]);

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
        <div className="relative h-64 rounded-lg overflow-hidden">
          {event.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${event.title} ${index + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
        </div>
        <h3 className="mt-6 text-3xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {event.title}
        </h3>
        <p className="mt-3 text-lg text-text-secondary">{event.description}</p>
        <div className="mt-4 grid grid-cols-1 gap-2">
          <p className="flex items-center gap-2 text-accent">
            <FontAwesomeIcon icon={faCalendar} /> {event.date}
          </p>
          <p className="flex items-center gap-2 text-accent">
            <FontAwesomeIcon icon={faClock} /> {event.time}
          </p>
          <p className="flex items-center gap-2 text-accent">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {event.location}
          </p>
        </div>
        <p className="mt-4 italic text-text-secondary">Organized by: {event.organizer}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {event.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm ${
                event.category === "Tech"
                  ? "bg-primary/20 text-primary"
                  : event.category === "Cultural"
                  ? "bg-accent/20 text-accent"
                  : event.category === "Sports"
                  ? "bg-secondary/20 text-secondary"
                  : "bg-text-primary/20 text-text-primary"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={event.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-background-white font-bold hover:scale-105 transition-transform"
        >
          Register Now
        </a>
      </animated.div>
    </div>
  );
});

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-8 flex justify-center gap-4">
      <div className="text-center">
        <span className="block text-4xl font-bold text-primary">{timeLeft.days}</span>
        <span className="text-sm text-text-secondary">Days</span>
      </div>
      <div className="text-center">
        <span className="block text-4xl font-bold text-primary">{timeLeft.hours}</span>
        <span className="text-sm text-text-secondary">Hours</span>
      </div>
      <div className="text-center">
        <span className="block text-4xl font-bold text-primary">{timeLeft.minutes}</span>
        <span className="text-sm text-text-secondary">Minutes</span>
      </div>
    </div>
  );
};

const Events = () => {
  const eventRef = useRef(null);
  const filterRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", "Tech", "Cultural", "Sports", "Academic"];
  const filteredEvents =
    categoryFilter === "All"
      ? events
      : events.filter((event) => event.category === categoryFilter);

  const nextEvent = events.reduce((earliest, event) => {
    const eventDate = new Date(event.date);
    if (!earliest || eventDate < new Date(earliest.date)) return event;
    return earliest;
  }, null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".event-pulse",
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
    }, eventRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="events"
      className="min-h-screen bg-background-white bg-hero-pattern py-24"
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Ccircle cx=\"20\" cy=\"20\" r=\"4\" fill=\"%23B91C1C\" fill-opacity=\"0.1\"/%3E%3C/svg%3E')",
      }}
    >
      <div className="container mx-auto px-4">
        <AnimatedTitle
          title="Campus <br /> Events"
          className="text-center text-5xl font-display text-text-primary md:text-7xl"
        />
        <p className="mt-6 text-center text-lg text-text-secondary max-w-2xl mx-auto">
          Discover exciting events at Allenhouse Institute of Technology, from tech summits to cultural fests!
        </p>

        {nextEvent && (
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-display font-bold text-accent">
              Countdown to {nextEvent.title}
            </h3>
            <CountdownTimer targetDate={nextEvent.date} />
          </div>
        )}

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

        <div ref={eventRef} className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="event-pulse cursor-pointer relative"
              onClick={() => setSelectedEvent(event)}
            >
              <PulseCard
                src={event.images[0]}
                title={event.title}
                description={event.description}
              />
              <span
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold ${
                  event.category === "Tech"
                    ? "bg-primary text-background-white"
                    : event.category === "Cultural"
                    ? "bg-accent text-background-white"
                    : event.category === "Sports"
                    ? "bg-secondary text-background-white"
                    : "bg-text-primary text-background-white"
                }`}
              >
                {event.category}
              </span>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </div>
    </div>
  );
};

export default Events;