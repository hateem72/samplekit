import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faBook, 
  faFlask, 
  faUsers, 
  faCalendarAlt,
  faBriefcase,
  faHandshake,
  faChalkboardTeacher,
  faUserGraduate
} from '@fortawesome/free-solid-svg-icons';


const App = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { name: "Admissions", icon: faGraduationCap, link: "/admissions", color: "bg-indigo-100 text-indigo-700" },
    { name: "Academics", icon: faBook, link: "/academics", color: "bg-blue-100 text-blue-700" },
    { name: "Research", icon: faFlask, link: "/research", color: "bg-emerald-100 text-emerald-700" },
    { name: "Campus Life", icon: faUsers, link: "/campus-life", color: "bg-purple-100 text-purple-700" },
    { name: "Events", icon: faCalendarAlt, link: "/events", color: "bg-pink-100 text-pink-700" },
  ];

  const stats = [
    { value: "95%", label: "Placement Rate", icon: faBriefcase },
    { value: "50+", label: "Industry Partners", icon: faHandshake },
    { value: "25", label: "Programs", icon: faChalkboardTeacher },
    { value: "10K+", label: "Alumni", icon: faUserGraduate },
  ];

  const newsItems = [
    { 
      id: 1, 
      title: "Placement Drive 2024", 
      date: "May 15, 2024", 
      excerpt: "85% students placed in top firms with record-high packages.",
      category: "Placements"
    },
    { 
      id: 2, 
      title: "AI Lab Launch", 
      date: "April 28, 2024", 
      excerpt: "New state-of-the-art lab established through TechNova partnership.",
      category: "Research"
    },
    { 
      id: 3, 
      title: "InnovateX Fest", 
      date: "March 20, 2024", 
      excerpt: "Annual tech fest attracted 50+ colleges and 1200+ attendees.",
      category: "Events"
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-800 overflow-hidden">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-95"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-400 rounded-full filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
        </div>
        
        <Tilt 
          tiltMaxAngleX={5} 
          tiltMaxAngleY={5} 
          glareEnable={true}
          glareMaxOpacity={0.2}
          glareColor="#ffffff"
          glarePosition="all"
          className="relative z-10"
        >
          <div className="max-w-7xl mx-auto px-6 py-32 md:py-40 text-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Welcome to <span className="text-yellow-400">Allenhouse</span>
              </h1>
              <motion.p
                className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Innovate. Excel. Lead. - Allenhouse Institute of Technology
              </motion.p>
              <motion.button
                onClick={() => navigate("/admissions")}
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Apply Now
              </motion.button>
            </motion.div>
          </div>
        </Tilt>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Explore <span className="text-blue-600">Allenhouse</span>
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {quickLinks.map((link, idx) => (
              <motion.div
                key={link.name}
                variants={item}
                whileHover={{ y: -10 }}
              >
                <Tilt 
                  tiltMaxAngleX={5} 
                  tiltMaxAngleY={5} 
                  glareEnable={true}
                  glareMaxOpacity={0.1}
                  className="h-full"
                >
                  <div 
                    onClick={() => navigate(link.link)}
                    className={`${link.color} p-6 rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center justify-center border border-transparent hover:border-opacity-20`}
                  >
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-inner">
                      <FontAwesomeIcon icon={link.icon} className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-center">{link.name}</h3>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 text-center border border-white border-opacity-20"
              >
                <Tilt scale={1.05} tiltMaxAngleX={5} tiltMaxAngleY={5}>
                  <div className="p-4">
                    <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                      <FontAwesomeIcon icon={stat.icon} className="text-2xl text-yellow-300" />
                    </div>
                    <p className="text-4xl font-bold mb-2 text-yellow-300">{stat.value}</p>
                    <p className="text-lg">{stat.label}</p>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Latest <span className="text-blue-600">News</span> & Updates
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {newsItems.map((news) => (
              <motion.div
                key={news.id}
                variants={item}
                whileHover={{ y: -10 }}
              >
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-700 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <span className="absolute top-4 left-4 bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold">
                        {news.category}
                      </span>
                    </div>
                    <div className="p-6 flex-grow">
                      <p className="text-sm text-gray-500 mb-2">{news.date}</p>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">{news.title}</h3>
                      <p className="text-gray-600 mb-4">{news.excerpt}</p>
                    </div>
                    <div className="px-6 pb-6">
                      <button 
                        onClick={() => navigate(`/news/${news.id}`)}
                        className="text-blue-600 font-semibold hover:underline flex items-center"
                      >
                        Read more
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-yellow-400 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        </div>
        
        <Tilt 
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareEnable={true}
          glareMaxOpacity={0.2}
          className="relative z-10 py-20 px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Experience Our <span className="text-yellow-400">Campus</span> Virtually
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Take a 360° tour of our state-of-the-art facilities from anywhere in the world
            </p>
            <motion.button
              onClick={() => navigate("/virtual-tour")}
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Virtual Tour
            </motion.button>
          </motion.div>
        </Tilt>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Allenhouse</h3>
              <p className="mb-4">Innovate. Excel. Lead.</p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <motion.a 
                    key={social}
                    href={`https://${social}.com/allenhouse`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                  </motion.a>
                ))}
              </div>
            </div>
            
            {['Academics', 'Admissions', 'Campus', 'Contact'].map((section, i) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">{section}</h4>
                <ul className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-yellow-400 transition-colors">{section} Link {item}</a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="border-t border-gray-800 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p>&copy; {new Date().getFullYear()} Allenhouse Institute of Technology. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default App;