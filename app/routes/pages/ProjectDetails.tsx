import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import { client, urlFor } from '../src/sanity';

export default function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "project" && slug.current == $slug][0]{
    ...,
    technologies 
  }`;
    client.fetch(query, { slug }).then((data) => {
      setProject(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-black uppercase italic text-4xl">
        Loading...
      </div>
    );
  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center font-black uppercase italic text-4xl text-red-500">
        Project Not Found
      </div>
    );

  return (
    <main className="min-h-screen bg-white pt-24 md:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Navigation Back */}
        <Link to="/projects" className="group flex items-center gap-2 mb-12">
          <div className="w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">
            Back to Work
          </span>
        </Link>

        {/* Project Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-orange-500 font-mono text-xs font-black uppercase tracking-widest block mb-4">
              Project / {project.type}
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.8] mb-8">
              {project.title.split(' ')[0]}
              <br />
              <span className="text-orange-500">
                {project.title.split(' ').slice(1).join(' ')}
              </span>
            </h1>
          </motion.div>

          <div className="pb-4">
            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xl">
              {project.description
                ?.map((block: any) =>
                  block.children?.map((c: any) => c.text).join(''),
                )
                .join(' ')}
            </p>
          </div>
        </div>

        {/* Large Feature Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full aspect-video rounded-[30px] md:rounded-[60px] overflow-hidden bg-slate-100 border border-slate-100 mb-20"
        >
          {project.thumbnail && (
            <img
              src={urlFor(project.thumbnail).url()}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>

        {/* Technical Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-100 pt-16">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">
              Technologies
            </h4>
            <ul className="space-y-2">
              {/* Check if technologies exist, then map through them */}
              {project.technologies ? (
                project.technologies.map((tech: string, index: number) => (
                  <li
                    key={index}
                    className="text-xl font-black text-slate-900 uppercase italic tracking-tighter italic"
                  >
                    {tech}
                  </li>
                ))
              ) : (
                <li className="text-slate-400 italic text-sm">
                  No stack specified
                </li>
              )}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">
              The Implementation
            </h4>
            <div className="prose prose-lg prose-slate max-w-none font-medium text-slate-600">
              {/* You can also use the project.description here if you have a separate summary */}
              <p>
                This {project.type} project was engineered to solve specific
                challenges using
                {project.technologies?.join(', ') || 'modern engineering tools'}
                .
              </p>
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-12 bg-orange-500 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-colors shadow-xl shadow-orange-500/20"
              >
                Launch Live System
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
