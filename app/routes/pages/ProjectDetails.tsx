import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        // Use documentId for fetching in Strapi v5
        const res = await fetch(`${STRAPI_URL}/api/projects/${id}?populate=*`);
        const result = await res.json();
        setProject(result.data);
      } catch (err) {
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-black text-slate-200 tracking-[1em]">
        LOADING_SYSTEM...
      </div>
    );
  if (!project)
    return <div className="p-24 text-center">Project not found.</div>;

  const imgUrl = project.thumbnail?.url;
  const fullImgUrl = imgUrl?.startsWith('http')
    ? imgUrl
    : `${STRAPI_URL}${imgUrl}`;

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation Breadcrumb */}
        <Link
          to="/projects"
          className="group flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest mb-12 hover:text-orange-500 transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>{' '}
          Back to Archive
        </Link>

        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-orange-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
              {project.Type}
            </span>
            <span className="text-slate-300 font-mono text-xs">
              ID: {project.documentId?.slice(0, 8)}
            </span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.8]">
            {project.Title}
          </h1>
        </header>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[60px] overflow-hidden border-12px border-slate-50 shadow-2xl mb-20"
        >
          <img
            src={fullImgUrl}
            className="w-full aspect-video object-cover"
            alt={project.Title}
          />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8">
            <h2 className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-8">
              / Technical Overview
            </h2>
            <div className="prose prose-xl max-w-none text-slate-600 leading-relaxed font-medium">
              {project.Description?.map((block: any, i: number) => (
                <p key={i} className="mb-6">
                  {block.children?.map((child: any) => child.text).join('')}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="p-10 bg-slate-900 rounded-[50px] text-white">
                <h3 className="text-orange-500 font-bold uppercase tracking-widest text-[10px] mb-6">
                  System Links
                </h3>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-white text-slate-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-orange-500 hover:text-white transition-all uppercase italic tracking-tighter"
                >
                  Visit Project
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              </div>

              <div className="p-10 bg-slate-50 rounded-[50px] border border-slate-100">
                <h3 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-6">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Strapi', 'Tailwind', 'Cloudinary'].map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
