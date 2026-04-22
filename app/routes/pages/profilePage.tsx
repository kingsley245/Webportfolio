import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client, urlFor } from '../src/sanity';

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const query = `*[_type == "profile"][0]`;
    client.fetch(query).then((data) => setProfile(data));
  }, []);

  if (!profile) return null;

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4"
          >
            <div className="aspect-square rounded-[60px] overflow-hidden bg-slate-100 border-[12px] border-white shadow-2xl mb-8">
              {profile.avatar && (
                <img
                  src={urlFor(profile.avatar).url()}
                  alt={profile.name}
                  className="w-full h-full object-cover  hover:grayscale-0 transition-all duration-700"
                />
              )}
            </div>
            <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
              {profile.name}
            </h1>
            <p className="text-orange-500 font-bold uppercase tracking-widest text-xs mt-2">
              {profile.role}
            </p>
            <p className="text-slate-400 font-medium text-sm mt-1">
              Based in {profile.location}
            </p>
          </motion.div>

          {/* Right Side: Bio & Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8"
          >
            <section className="mb-20">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">
                About Me
              </h2>
              <div className="prose prose-2xl prose-slate font-medium text-slate-700 leading-tight">
                {profile.bio?.map((block: any, i: number) => (
                  <p key={i}>
                    {block.children?.map((c: any) => c.text).join('')}
                  </p>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
              {profile.skills?.map((skillGroup: any, i: number) => (
                <div key={i}>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items?.map((skill: string, j: number) => (
                      <span
                        key={j}
                        className="text-xl font-black text-slate-900 uppercase italic tracking-tighter"
                      >
                        {skill}
                        {j < skillGroup.items.length - 1 && (
                          <span className="text-orange-500 mx-2">/</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
