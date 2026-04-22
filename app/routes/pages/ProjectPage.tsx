import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { client, urlFor } from '../src/sanity';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const query = `*[_type == "project"] | order(_createdAt desc){
      _id,
      title,
      type,
      thumbnail,
      description,
      "slug": slug.current 
    }`;
    client.fetch(query).then((data) => setProjects(data));
  }, []);

  return (
    <main className="min-h-screen bg-white pt-20 md:pt-32 pb-12 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <header className="mb-12 md:mb-20">
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.8]">
            Work<span className="text-orange-500">.</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs mt-4">
            Selected Engineering & Software Systems
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project: any, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              key={project._id}
              className="group"
            >
              {/* 1. Image wraps in a Link */}
              <Link to={`/projects/${project.slug}`}>
                <div className="relative aspect-16/10 overflow-hidden rounded-[30px] md:rounded-[50px] bg-slate-100 border border-slate-100 cursor-pointer">
                  {project.thumbnail && (
                    <img
                      src={urlFor(project.thumbnail).url()}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-in-out"
                    />
                  )}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                      {project.type}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="mt-8 px-2">
                <div className="flex items-center justify-between">
                  {/* Title also links to details */}
                  <Link to={`/projects/${project.slug}`}>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none group-hover:text-orange-500 transition-colors">
                      {project.title}
                    </h2>
                  </Link>

                  <div className="w-10 h-10 rounded-full border-2 border-slate-100 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>

                <div className="mt-4 text-slate-500 font-medium text-sm md:text-base max-w-md line-clamp-2">
                  {project.description
                    ?.map((block: any) =>
                      block.children?.map((c: any) => c.text).join(''),
                    )
                    .join(' ')}
                </div>

                <div className="mt-6">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 border-b-2 border-orange-500 pb-1 hover:text-slate-900 hover:border-slate-900 transition-all"
                  >
                    View Implementation
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
