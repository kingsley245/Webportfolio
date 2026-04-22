import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Send } from 'lucide-react';
import { Link } from 'react-router';
import Navbar from '~/routes/components/Navbar';
import ProjectCard from '~/routes/components/FeaturedProject';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen pt-20 bg-white overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-purple-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[10%] left-[-5%] w-100 h-100 bg-fuchsia-50 rounded-full blur-[100px] opacity-60" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-12 md:py-24 relative z-10">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-purple-50 border border-purple-100">
              <span className="text-purple-600 text-xs font-bold tracking-widest uppercase">
                Full-Stack Web Architect
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
              Hello, I’m <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-fuchsia-500">
                Kingsley Osuya
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-lg mb-10 leading-relaxed font-medium">
              I build immersive and high-performance web applications using
              modern frameworks. Focused on clean code and exceptional user
              experiences.
            </p>

            <div className="flex flex-wrap gap-10">
              <Link
                to="/contact"
                className="group flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-100 hover:bg-purple-700 hover:shadow-purple-200 transition-all transform hover:-translate-y-1"
              >
                Say Hello!{' '}
                <Send
                  size={20}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </Link>

              <Link
                to="/projects"
                className="flex items-center gap-2 px-8 py-4 border-2 border-slate-100 text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all"
              >
                Portfolio <ArrowUpRight size={20} />
              </Link>
            </div>

            {/* Stats Summary */}
            <div className="mt-16 pt-10 border-t border-slate-100 grid grid-cols-3 gap-8">
              <div>
                <h4 className="text-3xl font-black text-slate-900 tracking-tight">
                  Level 4
                </h4>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
                  Engineer
                </p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-slate-900 tracking-tight">
                  15+
                </h4>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
                  Projects
                </p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-slate-900 tracking-tight">
                  React
                </h4>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
                  Core Stack
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT PORTRAIT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeIn', delay: 0.2 }}
            className="relative lg:justify-self-end"
          >
            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -left-12 top-24 z-20 hidden md:block"
            >
              <Link
                to="/contact"
                className="bg-linear-to-br from-fuchsia-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-black shadow-2xl rotate-[-8deg] border-4 border-white tracking-widest text-sm"
              >
                AVAILABLE FOR HIRE
              </Link>
            </motion.div>

            {/* Main Image Container */}
            <div className="relative w-75 h-100 md:w-120 md:h-155">
              {/* The Background Shape */}
              <div className="absolute inset-0 bg-slate-100 rounded-[80px] rotate-3 scale-105" />

              {/* The Image Wrapper */}
              <div className="relative h-full w-full rounded-[70px] bg-slate-200 overflow-hidden border-12 border-white shadow-2xl">
                <img
                  src="/fetus.jpeg"
                  alt="Kingsley Osuya"
                  className="w-full h-full object-cover grayscale-20 hover:grayscale-0 transition-all duration-500"
                />

                {/* Glassmorphic Quote Card */}
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/60 backdrop-blur-xl rounded-4xml border border-white/50 shadow-lg">
                  <p className="text-slate-900 font-bold text-center leading-tight">
                    "Architecting the future of the web, one component at a
                    time."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <ProjectCard />
    </>
  );
};

export default HomePage;
