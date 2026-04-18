import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeType, setActiveType] = useState('All');

  useEffect(() => {
    async function fetchAll() {
      const res = await fetch(
        `${STRAPI_URL}/api/projects?populate=*&sort=createdAt:desc`,
      );
      const result = await res.json();
      setProjects(result.data || []);
      setFiltered(result.data || []);
    }
    fetchAll();
  }, []);

  // Filter Logic
  useEffect(() => {
    if (activeType === 'All') {
      setFiltered(projects);
    } else {
      const filteredData = projects.filter((p: any) => p.Type === activeType);
      setFiltered(filteredData);
    }
  }, [activeType, projects]);

  const categories = ['All', 'Fullstack', 'Hardware', 'Software'];

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h1 className="text-8xl font-black text-slate-900 tracking-tighter uppercase italic">
              Arch<span className="text-orange-500">ive.</span>
            </h1>
            <p className="text-slate-400 font-bold tracking-[0.2em] uppercase text-xs mt-4">
              {projects.length} Total Systems Developed
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 bg-slate-50 p-2 rounded-full border border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveType(cat)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  activeType === cat
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project: any) => {
              const imgUrl = project.thumbnail?.url;
              const fullImgUrl = imgUrl?.startsWith('http')
                ? imgUrl
                : `${STRAPI_URL}${imgUrl}`;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={project.id}
                >
                  <Link
                    to={`/projects/${project.documentId}`}
                    className="group block bg-slate-50 rounded-[40px] p-4 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-slate-100"
                  >
                    <div className="aspect-square overflow-hidden rounded-[30px] mb-6 relative">
                      <img
                        src={fullImgUrl}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt={project.Title}
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter text-slate-900">
                        {project.Type}
                      </div>
                    </div>

                    <div className="px-2 pb-2">
                      <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter group-hover:text-orange-500 transition-colors">
                        {project.Title}
                      </h3>
                      <p className="text-slate-400 text-sm font-bold mt-1 uppercase tracking-widest">
                        View Project Details —→
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-slate-300 font-mono uppercase tracking-widest text-sm">
              No systems found in this sector.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
