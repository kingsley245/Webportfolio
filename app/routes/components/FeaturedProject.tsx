import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const STRAPI_URL = 'http://localhost:1337';

export default function HomeProjectGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProjects() {
      try {
        // Your specific endpoint
        const response = await fetch(`${STRAPI_URL}/api/projects?populate=*`);
        const result = await response.json();

        // In Strapi v5, data is directly in result.data
        setProjects(result.data || []);
      } catch (error) {
        console.error('Kanthcode API Error:', error);
      } finally {
        setLoading(false);
      }
    }
    getProjects();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">
          Fetching Data...
        </p>
      </div>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-4">
            Portfolio
          </h2>
          <h3 className="text-5xl font-black text-slate-900 tracking-tight italic">
            DYNAMIC <span className="text-slate-300">WORKS.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project: any, idx: number) => {
            // Strapi v5 flat structure: fields are directly on the project object
            const title = project.Title;
            const type = project.Type;
            const projectLink = project.link; // Note: lowercase 'l' from your JSON

            // Get image URL (handles local vs Cloudinary)
            const relativeUrl = project.thumbnail?.url;
            const imgUrl = relativeUrl?.startsWith('http')
              ? relativeUrl
              : `${STRAPI_URL}${relativeUrl}`;

            return (
              <motion.a
                key={project.id}
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -15 }}
                className="group relative block overflow-hidden rounded-[60px] aspect-[16/11] bg-slate-50 border-[10px] border-white shadow-2xl transition-all"
              >
                <img
                  src={imgUrl || '/placeholder.jpg'}
                  alt={title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-orange-500 font-black text-xs uppercase tracking-[0.2em] mb-3">
                      {type}
                    </p>
                    <div className="flex items-center justify-between">
                      <h4 className="text-white text-4xl font-black uppercase tracking-tighter italic">
                        {title}
                      </h4>
                      <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/40">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
