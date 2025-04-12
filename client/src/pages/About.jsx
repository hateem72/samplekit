import { useEffect, useRef, useState, memo } from "react";
import { gsap } from "gsap";
import AnimatedTitle from "../components/AnimatedTitle";
import PulseCard from "../components/PulseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "@react-spring/web";
import confetti from "canvas-confetti";

const missionVision = {
  mission: "Empowering minds through innovative education and global collaboration.",
  vision: "To be a beacon of transformative learning, shaping leaders for tomorrow.",
};

const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Lee",
    role: "Director",
    bio: "With 25 years of expertise, Dr. Lee pioneers education with a focus on inclusivity and technology.",
    image: "https://via.placeholder.com/600x400?text=Sarah+Lee",
  },
  {
    id: 2,
    name: "Prof. Mark Chen",
    role: "Head of Innovation",
    bio: "Mark drives tech education, blending AI and hands-on learning for students worldwide.",
    image: "https://via.placeholder.com/600x400?text=Mark+Chen",
  },
  {
    id: 3,
    name: "Ms. Anita Rao",
    role: "Academic Dean",
    bio: "Anita shapes curricula that inspire creativity and critical thinking.",
    image: "https://via.placeholder.com/600x400?text=Anita+Rao",
  },
  {
    id: 4,
    name: "Mr. Raj Patel",
    role: "Community Lead",
    bio: "Raj fosters vibrant student communities, connecting ideas across borders.",
    image: "https://via.placeholder.com/600x400?text=Raj+Patel",
  },
];

const achievements = [
  {
    id: 1,
    title: "Global Impact Award",
    year: 2010,
    description: "Recognized for advancing education in underserved regions.",
    image: "https://via.placeholder.com/600x400?text=Global+Impact",
  },
  {
    id: 2,
    title: "Tech Innovation Prize",
    year: 2018,
    description: "Honored for virtual classroom technology breakthroughs.",
    image: "https://via.placeholder.com/600x400?text=Tech+Innovation",
  },
  {
    id: 3,
    title: "Excellence in Education",
    year: 2023,
    description: "Awarded for outstanding student outcomes globally.",
    image: "https://via.placeholder.com/600x400?text=Excellence",
  },
];

const stats = [
  { label: "Students", value: 6000, icon: faStar },
  { label: "Courses", value: 120, icon: faStar },
  { label: "Countries", value: 50, icon: faStar },
  { label: "Years", value: 30, icon: faStar },
];

const TeamModal = memo(({ member, onClose }) => {
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
        className="relative max-w-lg w-full rounded-3xl bg-background-white p-8 shadow-2xl border-2 border-accent/30 backdrop-blur-sm"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl text-accent hover:text-primary transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <img
          src={member.image}
          alt={member.name}
          className="h-48 w-full rounded-lg object-cover"
          loading="lazy"
        />
        <h3 className="mt-4 text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {member.name}
        </h3>
        <p className="mt-2 text-accent font-bold">{member.role}</p>
        <p className="mt-2 text-text-secondary">{member.bio}</p>
      </animated.div>
    </div>
  );
});

const About = () => {
  const timelineRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const achievementsRef = useRef(null);
  const statsRef = useRef(null);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-wave",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          duration: 0.8,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        missionRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        }
      );

      gsap.fromTo(
        ".team-card",
        { opacity: 0, rotate: 5 },
        {
          opacity: 1,
          rotate: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".achievement-card",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.7)",
        }
      );

      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="about"
      className="min-h-screen bg-background-white bg-hero-pattern py-24"
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Ccircle cx=\"20\" cy=\"20\" r=\"4\" fill=\"%23B91C1C\" fill-opacity=\"0.1\"/%3E%3C/svg%3E')",
      }}
    >
      <div className="container mx-auto px-4">
        <AnimatedTitle
          title="About <br /> Edu<b>Pulse</b>"
          className="text-center text-5xl font-display text-text-primary md:text-7xl"
        />
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-text-secondary">
          Born in 1995, EduPulse thrives on innovation, shaping futures with passion.
        </p>

        <div ref={missionRef} className="mt-20 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-12 relative">
          <h2 className="text-3xl font-display font-bold text-text-primary text-center">
            Our Mission & Vision
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-background-white shadow-lg border border-accent/30">
              <h3 className="text-xl font-bold text-accent">Mission</h3>
              <p className="mt-4 text-text-secondary">{missionVision.mission}</p>
            </div>
            <div className="p-6 rounded-2xl bg-background-white shadow-lg border border-accent/30">
              <h3 className="text-xl font-bold text-accent">Vision</h3>
              <p className="mt-4 text-text-secondary">{missionVision.vision}</p>
            </div>
          </div>
          <div className="absolute -top-6 -left-6 h-16 w-16 rounded-full bg-accent/30"></div>
        </div>

        <div ref={timelineRef} className="mt-20">
          <h2 className="flex items-center gap-3 text-3xl font-display font-bold text-primary">
            <FontAwesomeIcon icon={faHistory} /> Our Legacy
          </h2>
          <div className="mt-10 space-y-12">
            <div className="timeline-wave relative rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 text-background-white">
              <h3 className="text-2xl font-bold">1995</h3>
              <p>Founded with a vision for global education.</p>
              <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-accent"></div>
            </div>
            <div className="timeline-wave relative rounded-3xl bg-gradient-to-r from-secondary to-primary p-8 text-background-white">
              <h3 className="text-2xl font-bold">2005</h3>
              <p>Introduced virtual classrooms.</p>
              <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-accent"></div>
            </div>
            <div className="timeline-wave relative rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 text-background-white">
              <h3 className="text-2xl font-bold">2020</h3>
              <p>Reached 6000+ students worldwide.</p>
              <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-accent"></div>
            </div>
          </div>
        </div>

        <div ref={teamRef} className="mt-20">
          <h2 className="text-3xl font-display font-bold text-text-primary text-center">
            Our Visionaries
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card relative cursor-pointer" onClick={() => setSelectedMember(member)}>
                <PulseCard
                  src={member.image}
                  title={member.name}
                  description={member.role}
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm bg-accent text-background-white font-bold">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div ref={achievementsRef} className="mt-20">
          <h2 className="text-3xl font-display font-bold text-text-primary text-center">
            Our Achievements
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="achievement-card relative rounded-3xl bg-background-white shadow-lg overflow-hidden"
                style={{ perspective: "1000px" }}
              >
                <div
                  className="h-80 w-full transition-transform duration-500"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      rotateY: 180,
                      duration: 0.5,
                      ease: "power2.out",
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      rotateY: 0,
                      duration: 0.5,
                      ease: "power2.out",
                    });
                  }}
                >
                  <div
                    className="absolute inset-0 backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent"></div>
                    <div className="absolute bottom-0 p-6 text-background-white">
                      <h3 className="text-xl font-bold">{achievement.title}</h3>
                      <p className="text-sm">{achievement.year}</p>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 backface-hidden flex items-center justify-center p-6 text-center bg-gradient-to-r from-primary to-secondary text-background-white"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <p>{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={statsRef} className="mt-20">
          <h2 className="text-3xl font-display font-bold text-text-primary text-center">
            Our Impact
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item flex flex-col items-center p-6 rounded-3xl bg-background-white shadow-lg border border-accent/30"
              >
                <FontAwesomeIcon icon={stat.icon} className="text-4xl text-primary mb-4" />
                <span className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}+
                </span>
                <span className="mt-2 text-lg text-text-secondary">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {selectedMember && (
          <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </div>
    </div>
  );
};

export default About;