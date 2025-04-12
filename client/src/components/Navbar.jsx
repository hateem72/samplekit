import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useWindowScroll } from "react-use";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Courses", path: "/courses" },
  { label: "Events", path: "/events" },
  { label: "Contact", path: "/contact" },
  { label: "Developers", path: "/developers" },
];

const Navbar = () => {
  const navRef = useRef(null);
  const navigate = useNavigate();
  const { y: scrollY } = useWindowScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (scrollY === 0) {
      setIsVisible(true);
      gsap.to(navRef.current, { borderRadius: "0px", background: "transparent" });
    } else if (scrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
      gsap.to(navRef.current, {
        borderRadius: "9999px",
        background: "rgba(255, 255, 255, 0.95)",
      });
    }
    setLastScrollY(scrollY);

    gsap.to(navRef.current, {
      y: isVisible ? 0 : -120,
      opacity: isVisible ? 1 : 0,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [scrollY, lastScrollY]);

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-4 top-4 z-50 backdrop-blur-lg transition-all"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <button
          onClick={() => handleNavigate("/")}
          className="flex items-center gap-3"
        >
          <FontAwesomeIcon
            icon={faGraduationCap}
            className="text-3xl text-primary"
          />
          <span className="text-2xl font-display font-bold text-text-primary">
            EduPulse
          </span>
        </button>
        <div className="hidden space-x-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              className="relative text-text-primary transition-colors hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {item.label}
            </button>
          ))}
        </div>
        <Button
          title="Apply Now"
          className="hidden md:block"
          onClick={() => handleNavigate("/contact")}
        />
      </div>
    </nav>
  );
};

export default Navbar;