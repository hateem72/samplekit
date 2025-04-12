import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSpring, animated } from "@react-spring/web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faShare, faGlobe, faGraduationCap  } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { href: "https://connect.edu", icon: faLink, label: "Connect" },
  { href: "https://share.edu", icon: faShare, label: "Share" },
  { href: "https://global.edu", icon: faGlobe, label: "Global" },
];

const Footer = () => {
  const footerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-element", {
        opacity: 0,
        y: 50,
        scale: 0.8,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)",
        duration: 1.5
      });

      gsap.from(".footer-circle", {
        scale: 0,
        rotate: 360,
        stagger: 0.3,
        ease: "power2.out",
        duration: 1
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const [springProps, api] = useSpring(() => ({
    scale: 1,
    config: { tension: 400, friction: 15 },
  }));

  return (
    <footer
      ref={footerRef}
      className="relative bg-background-white bg-hero-pattern py-16"
      style={{
        clipPath: "polygon(0% 10%, 100% 0%, 100% 100%, 0% 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
      <div className="container relative mx-auto px-4">
        <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-3">
           <div className="footer-element flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="text-4xl text-primary"
              />
              <span className="text-3xl font-display font-bold text-text-primary">
                EduPulse
              </span>
            </div>
            <p className="mt-4 max-w-xs text-center text-text-secondary md:text-left">
              Igniting futures with vibrant education and innovation.
            </p>
          </div>
          <div className="footer-element flex flex-col items-center">
            <h3 className="text-2xl font-display font-bold text-primary">
              Connect With Us
            </h3>
            <div className="mt-6 flex gap-6">
              {socialLinks.map((link, index) => (
                <animated.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-element text-3xl text-secondary transition-colors hover:text-accent"
                  onMouseEnter={() => api.start({ scale: 1.4 })}
                  onMouseLeave={() => api.start({ scale: 1 })}
                  style={springProps}
                  aria-label={link.label}
                >
                  <FontAwesomeIcon icon={link.icon} />
                </animated.a>
              ))}
            </div>
          </div>

          <div className="footer-element flex flex-col items-center md:items-end">
            <a
              href="#privacy"
              className="text-lg text-text-primary hover:text-primary"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="mt-4 text-lg text-text-primary hover:text-primary"
            >
              Terms of Service
            </a>
            <p className="mt-6 text-sm text-text-secondary">
              © 2025 EduPulse. All rights reserved.
            </p>
          </div>
        </div>

        <div className="footer-circle absolute -top-12 left-12 h-24 w-24 rounded-full bg-accent/30"></div>
        <div className="footer-circle absolute -bottom-12 right-12 h-32 w-32 rounded-full bg-secondary/20"></div>
        <div className="footer-circle absolute bottom-8 left-1/3 h-16 w-16 rounded-full bg-primary/25"></div>
      </div>
    </footer>
  );
};

export default Footer;