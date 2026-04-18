import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

export default function HomeProjectGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Inside HomeProjectGrid.tsx
  useEffect(() => {
    async function getProjects() {
      try {
        // We add pagination[pageSize]=3 to only get 3 items
        const response = await fetch(
          `${STRAPI_URL}/api/projects?populate=*&pagination[pageSize]=3&sort=createdAt:desc`,
        );
        const result = await response.json();
        setProjects(result.data || []);
      } catch (err) {
        console.error('Home Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    getProjects();
  }, []);

  if (loading)
    return (
      <div className="py-20 text-center font-mono">LOADING_SYSTEM_DATA...</div>
    );

  return (
    <section className="py-24 bg-white">
      <h1 className="text-center text-slate-400 font-bold uppercase tracking-[0.3em] text-sm mb-12">
        Selected <span className="text-orange-500">Projects</span>
      </h1>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project: any) => {
            const imgUrl = project.thumbnail?.url;
            return (
              <Link
                key={project.id}
                to={`/projects/${project.documentId}`}
                className="group relative block overflow-hidden rounded-[50px] aspect-16/10 bg-slate-100 border-10px border-white shadow-xl"
              >
                <img
                  src={
                    imgUrl?.startsWith('http')
                      ? imgUrl
                      : `${STRAPI_URL}${imgUrl}`
                  }
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={project.Title}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <p className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-2">
                    {project.Type}
                  </p>
                  <h4 className="text-white text-3xl font-black">
                    {project.Title}
                  </h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-20 text-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-4 text-slate-900 font-black text-xl uppercase tracking-tighter group"
        >
          <span className="border-b-4 border-orange-500 group-hover:text-orange-500 transition-colors">
            Explore All Projects
          </span>
          <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-all">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
}
