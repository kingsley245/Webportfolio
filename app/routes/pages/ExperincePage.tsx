import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client } from '../src/sanity';

export default function Experience() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const query = `*[_type == "experience"] | order(order asc)`;
    client.fetch(query).then((data) => setItems(data));
  }, []);

  return (
    <main className="min-h-screen bg-white pt-20 md:pt-32 pb-12 md:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* navbar */}
        <header className="mb-12 md:mb-20">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.8]">
            Path<span className="text-orange-500">way.</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs mt-4">
            Professional & Academic Timeline
          </p>
        </header>

        {/* Timeline Container */}
        <div className="relative border-l-2 md:border-l-4 border-slate-100 ml-2 sm:ml-4 md:ml-0">
          {items.map((item: any, index: number) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={item._id}
              className="mb-12 md:mb-16 ml-8 md:ml-12 relative"
            >
              <div className="absolute -left-10.5 md:-left-13.5 top-1 w-4 h-4 md:w-6 md:h-6 bg-white border-2 md:border-4 border-orange-500 rounded-full shadow-[0_0_0_4px_white] md:shadow-[0_0_0_8px_white]" />

              {/* Date/Duration */}
              <span className="text-orange-500 font-mono text-[10px] md:text-xs font-black uppercase tracking-widest block mb-1">
                {item.duration}
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 uppercase italic tracking-tighter mt-1 leading-tight">
                {item.role}
              </h2>

              {/* Company Name */}
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-400 uppercase tracking-tight mb-4 md:mb-6">
                {item.company}
              </h3>

              {/* Description Blocks */}
              <div className="prose prose-sm md:prose-base prose-slate font-medium text-slate-600 max-w-none">
                {item.description?.map((block: any, i: number) => (
                  <p key={i} className="mb-2 last:mb-0">
                    {block.children?.map((c: any) => c.text).join('')}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
