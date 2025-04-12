import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "../components/AnimatedTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

gsap.registerPlugin(ScrollTrigger);

const Developers = () => {
  const devRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dev-pulse", {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        stagger: 0.4,
        scrollTrigger: {
          trigger: devRef.current,
          start: "top 80%",
          end: "bottom 20%",
        },
      });

      gsap.from(".skill-wave", {
        width: 0,
        stagger: 0.3,
        scrollTrigger: {
          trigger: devRef.current,
          start: "top 60%",
          end: "bottom 20%",
        },
      });
    }, devRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="developers" className="min-h-screen bg-background-white bg-hero-pattern py-20">
      <div className="container mx-auto px-4">
        <AnimatedTitle
          title="Our <br /> Creators"
          className="text-center text-5xl font-display text-text-primary md:text-7xl"
        />
        <div ref={devRef} className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div
            className="dev-pulse relative rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 text-background-white"
            style={{
              clipPath: "polygon(5% 0%, 95% 0%, 100% 95%, 0% 100%)",
            }}
          >
            <img
              src="/assets/images/dev1.jpg"
              alt="Dev 1"
              className="mx-auto h-40 w-40 rounded-full object-cover shadow-lg"
            />
            <h3 className="mt-6 text-center text-3xl font-display font-bold">
              Alex Nova
            </h3>
            <p className="mt-3 text-center opacity-90">
              Animation wizard and React enthusiast.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <span className="text-sm">React Mastery</span>
                <div className="h-3 w-full rounded-full bg-background-white/20">
                  <div className="skill-wave h-3 w-[92%] rounded-full bg-accent"></div>
                </div>
              </div>
              <div>
                <span className="text-sm">GSAP Expertise</span>
                <div className="h-3 w-full rounded-full bg-background-white/20">
                  <div className="skill-wave h-3 w-[88%] rounded-full bg-accent"></div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-6">
              <a href="https://github.com" className="text-3xl hover:text-accent">
                <FontAwesomeIcon icon={faGraduationCap} />
              </a>
              <a href="https://linkedin.com" className="text-3xl hover:text-accent">
                <FontAwesomeIcon icon={faGraduationCap} />
              </a>
            </div>
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-accent/30"></div>
          </div>
          <div
            className="dev-pulse relative rounded-3xl bg-gradient-to-br from-secondary to-primary p-8 text-background-white"
            style={{
              clipPath: "polygon(5% 0%, 95% 0%, 100% 95%, 0% 100%)",
            }}
          >
            <img
              src="/assets/images/dev2.jpg"
              alt="Dev 2"
              className="mx-auto h-40 w-40 rounded-full object-cover shadow-lg"
            />
            <h3 className="mt-6 text-center text-3xl font-display font-bold">
              Maya Star
            </h3>
            <p className="mt-3 text-center opacity-90">
              UI/UX guru and Tailwind maestro.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <span className="text-sm">UI/UX Design</span>
                <div className="h-3 w-full rounded-full bg-background-white/20">
                  <div className="skill-wave h-3 w-[95%] rounded-full bg-accent"></div>
                </div>
              </div>
              <div>
                <span className="text-sm">Tailwind CSS</span>
                <div className="h-3 w-full rounded-full bg-background-white/20">
                  <div className="skill-wave h-3 w-[90%] rounded-full bg-accent"></div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-6">
              <a href="https://github.com" className="text-3xl hover:text-accent">
                <FontAwesomeIcon icon={faGraduationCap} />
              </a>
              <a href="https://linkedin.com" className="text-3xl hover:text-accent">
                <FontAwesomeIcon icon={faGraduationCap} />
              </a>
            </div>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-accent/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;