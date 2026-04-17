import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch(`${STRAPI_URL}/api/profiles?populate=*`);
      const result = await res.json();
      setProfile(result.data);
    }
    fetchProfile();
  }, []);

  if (!profile)
    return <div className="p-24 text-center font-mono">LOADING_PROFILE...</div>;

  const data = profile;
  const imgUrl = data.ProfileImage?.url;

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT COLUMN: Visuals & Core Info */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-32"
            >
              <div className="relative mb-8">
                <div className="absolute -inset-4 border-2 border-orange-500 rounded-[60px] opacity-20 rotate-3"></div>
                <img
                  src={
                    imgUrl?.startsWith('http')
                      ? imgUrl
                      : `${STRAPI_URL}${imgUrl}`
                  }
                  className="w-full aspect-[4/5] object-cover rounded-[50px] shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                  alt="Kingsley Festus Osuya"
                />
              </div>

              <h1 className="text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-4">
                Kingsley{' '}
                <span className="text-orange-500 text-3xl block not-italic font-bold tracking-widest mt-2">
                  Osuya
                </span>
              </h1>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-500">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <p className="font-bold text-sm uppercase tracking-widest">
                    {data.Role}
                  </p>
                </div>
                <p className="text-slate-400 font-medium">
                  {data.Location} | NDU EEE '26
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: The Story & Skills */}
          <div className="lg:col-span-7 space-y-20">
            {/* Bio Section */}
            <section>
              <h2 className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-6">
                / The Vision
              </h2>
              <p className="text-2xl text-slate-700 leading-relaxed font-medium">
                {data.Bio ||
                  'As an Electronics Engineering student at Niger Delta University and a full-stack developer, I bridge the gap between hardware and software.'}
              </p>
            </section>

            {/* Technical Skills Grid */}
            <section>
              <h2 className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-8">
                / Technical Stack
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Frontend', items: 'React, Next.js, Tailwind' },
                  { label: 'Backend', items: 'Java, Node.js, Strapi' },
                  { label: 'Hardware', items: 'Arduino, ESP32, PCB Design' },
                  { label: 'Database', items: 'MySQL, PostgreSQL, SQLite' },
                ].map((skill, i) => (
                  <div
                    key={i}
                    className="p-6 bg-slate-50 rounded-[30px] border border-slate-100 hover:border-orange-200 transition-colors"
                  >
                    <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-2">
                      {skill.label}
                    </h3>
                    <p className="text-slate-500 font-bold">{skill.items}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Leadership Section (Course Rep) */}
            <section className="bg-slate-900 p-12 rounded-[50px] text-white">
              <h2 className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-6">
                / Leadership
              </h2>
              <h3 className="text-3xl font-black mb-4 uppercase italic tracking-tighter">
                Departmental Course Representative
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Managing academic coordination and student relations for the EEE
                department at NDU, ensuring seamless communication between
                faculty and peers.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
