import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { client, urlFor } from '../src/sanity';

export default function HomeProjectGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "project"] | order(_createdAt desc)[0...3]{
      _id,
      title,
      type,
      thumbnail,
      "slug": slug.current
    }`;

    client
      .fetch(query)
      .then((data) => {
        setProjects(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Sanity Fetch error:', err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="py-20 text-center font-mono text-slate-400 animate-pulse">
        Loading
      </div>
    );

  return (
    <section className="py-24 bg-white">
      <h1 className="text-center text-slate-400 font-bold uppercase tracking-[0.3em] text-3xl mb-12">
        Selected <span className="text-orange-500">Projects</span>
      </h1>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={project._id}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group relative block overflow-hidden rounded-[40px] aspect-[16/10] bg-slate-100 border-[8px] border-white shadow-2xl"
              >
                {project.thumbnail && (
                  <img
                    src={urlFor(project.thumbnail).url()}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110  group-hover:grayscale-0"
                  />
                )}

                {/* Modern Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <p className="text-orange-500 font-bold uppercase tracking-widest text-[10px] mb-2">
                    {project.type}
                  </p>
                  <h4 className="text-white text-2xl font-black uppercase italic tracking-tighter">
                    {project.title}
                  </h4>
                </div>
              </Link>
            </motion.div>
          ))}
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
