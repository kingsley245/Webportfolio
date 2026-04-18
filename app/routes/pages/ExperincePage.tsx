import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    async function fetchExp() {
      // Sort by createdAt:desc so your newest jobs appear at the top
      const res = await fetch(
        `${STRAPI_URL}/api/experiences?sort=createdAt:desc`,
      );
      const result = await res.json();
      setExperiences(result.data || []);
    }
    fetchExp();
  }, []);

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Page Header */}
        <header className="mb-20 text-center">
          <h1 className="text-7xl font-black text-slate-900 uppercase italic">
            Exp<span className="text-orange-500">erience.</span>
          </h1>
          <p className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs mt-4">
            Professional & Academic Journey
          </p>
        </header>

        {/* Timeline Container */}
        <div className="relative border-l-4 border-slate-100 ml-4 md:ml-0">
          {experiences.map((exp: any, index: number) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-16 ml-10 relative"
            >
              {/* The Orange Timeline Dot */}
              <div className="absolute -left-[46px] top-1 w-6 h-6 bg-white border-4 border-orange-500 rounded-full z-10"></div>

              {/* Date/Duration */}
              <span className="text-orange-500 font-bold text-sm tracking-widest uppercase">
                {exp.Duration}
              </span>

              {/* Role & Company */}
              <div className="mt-2 mb-4">
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight italic">
                  {exp.Role}
                </h3>
                <p className="text-xl font-bold text-slate-400">
                  {exp.Company} <span className="text-slate-200 mx-2">|</span>{' '}
                  {exp.Location}
                </p>
              </div>

              {/* Description (Manual Map for simple text) */}
              <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
                {exp.Description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 p-12 bg-slate-50 rounded-[50px] text-center border-2 border-dashed border-slate-200">
          <h4 className="text-2xl font-bold text-slate-900 mb-2">
            Looking for a Full-Stack Engineer?
          </h4>
          <p className="text-slate-500 mb-6 font-medium">
            I'm currently open to hardware and software collaborations.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-slate-900 text-white font-bold py-4 px-10 rounded-full hover:bg-orange-500 transition-all"
          >
            GET IN TOUCH
          </Link>
        </div>
      </div>
    </main>
  );
}
