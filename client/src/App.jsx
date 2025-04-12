import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Developers from "./pages/Developers";
import Gallery from "./pages/Gallery";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/developers" element={<Developers />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;