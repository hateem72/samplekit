import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AnimatedTitle from "../components/AnimatedTitle";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "leaflet/dist/leaflet.css";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        opacity: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          end: "bottom 20%",
        },
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="contact" className="min-h-screen bg-background-white bg-hero-pattern py-20">
      <div className="container mx-auto px-4">
        <AnimatedTitle
          title="Connect <br /> With Us"
          className="text-center text-5xl font-display text-text-primary md:text-7xl"
        />
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div
            ref={formRef}
            className="relative rounded-3xl bg-background-white p-8 shadow-2xl"
            style={{
              clipPath: "polygon(5% 0%, 95% 0%, 100% 95%, 0% 100%)",
            }}
          >
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-lg border border-background-pattern p-4 text-text-primary focus:border-primary focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-lg border border-background-pattern p-4 text-text-primary focus:border-primary focus:outline-none"
              />
              <textarea
                placeholder="Your Message"
                className="w-full rounded-lg border border-background-pattern p-4 text-text-primary focus:border-primary focus:outline-none"
                rows="6"
              ></textarea>
              <Button title="Send Message" icon={faPaperPlane} />
            </form>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-secondary/30"></div>
          </div>
          <div className="relative h-96 overflow-hidden rounded-3xl">
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>EduPulse Campus</Popup>
              </Marker>
            </MapContainer>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;