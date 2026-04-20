import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';

// Accessing the ID from your .env file
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

export default function Contact() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  // Success State View
  if (state.succeeded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-12 md:p-20 bg-slate-50 rounded-[60px] border border-slate-100 max-w-2xl w-full"
        >
          <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-10 text-white shadow-xl shadow-orange-500/20">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter mb-6 leading-none">
            Connection <br />{' '}
            <span className="text-orange-500">Initialized.</span>
          </h2>
          <p className="text-slate-500 font-bold text-lg mb-10">
            Data transmitted successfully. Kingsley will respond to your inquiry
            shortly.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-slate-900 font-black uppercase tracking-[0.2em] text-xs border-b-4 border-slate-900 pb-2 hover:text-orange-500 hover:border-orange-500 transition-all"
          >
            Send Another Transmission
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* LEFT COLUMN: Contact Details */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.8] mb-12">
                Get in <br />
                <span className="text-orange-500">Touch.</span>
              </h1>

              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-md mb-16">
                Whether you have a software inquiry for{' '}
                <span className="text-slate-900 font-bold">Kanthcode</span> or a
                hardware collaboration, my terminal is always open.
              </p>

              <div className="space-y-10">
                <div className="group">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">
                    Direct Line
                  </h4>
                  <a
                    href="mailto:kingsley@kanthcode.com"
                    className="text-2xl md:text-3xl font-black text-slate-900 hover:text-orange-500 transition-colors italic tracking-tighter uppercase"
                  >
                    kingsleyfestus24@gmail.com
                  </a>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">
                    Location
                  </h4>
                  <p className="text-2xl md:text-3xl font-black text-slate-900 italic tracking-tighter uppercase">
                    Bayelsa, Nigeria{' '}
                    <span className="text-slate-300 not-italic font-bold ml-2">
                      GMT+1
                    </span>
                  </p>
                </div>

                <div className="flex gap-8 pt-4">
                  {['LinkedIn', 'Freelancer', 'GitHub'].map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-xs font-black uppercase tracking-widest border-b-2 border-orange-500 pb-1 hover:text-orange-500 transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: The Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-50 p-8 md:p-14 rounded-[60px] border border-slate-100 shadow-2xl shadow-slate-200/50"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Field */}
                <div className="space-y-3">
                  <label
                    htmlFor="name"
                    className="text-[10px] font-black uppercase tracking-[0.2em] ml-6 text-slate-400"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="E.g. Festus Osuya"
                    className="w-full bg-white border-none rounded-[30px] p-6 text-slate-900 font-bold placeholder:text-slate-200 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-sm"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-3">
                  <label
                    htmlFor="email"
                    className="text-[10px] font-black uppercase tracking-[0.2em] ml-6 text-slate-400"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full bg-white border-none rounded-[30px] p-6 text-slate-900 font-bold placeholder:text-slate-200 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-sm"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-orange-500 text-[10px] font-bold ml-6 mt-1 uppercase"
                  />
                </div>
              </div>

              {/* Subject Selection */}
              <div className="space-y-3">
                <label
                  htmlFor="subject"
                  className="text-[10px] font-black uppercase tracking-[0.2em] ml-6 text-slate-400"
                >
                  Nature of Inquiry
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full bg-white border-none rounded-[30px] p-6 text-slate-900 font-bold focus:ring-4 focus:ring-orange-500/10 outline-none appearance-none cursor-pointer shadow-sm"
                >
                  <option>Full-Stack Development</option>
                  <option>Electronics / IoT Project</option>
                  <option>Corporate Partnership</option>
                  <option>Academic Collaboration</option>
                </select>
              </div>

              {/* Message Field */}
              <div className="space-y-3">
                <label
                  htmlFor="message"
                  className="text-[10px] font-black uppercase tracking-[0.2em] ml-6 text-slate-400"
                >
                  Message Payload
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project or vision..."
                  className="w-full bg-white border-none rounded-[40px] p-8 text-slate-900 font-bold placeholder:text-slate-200 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-sm resize-none"
                ></textarea>
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-orange-500 text-[10px] font-bold ml-6 mt-1 uppercase"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-slate-900 text-white font-black py-8 rounded-[35px]  disabled:bg-slate-200 transition-all uppercase italic tracking-tighter text-2xl shadow-xl shadow-slate-900/10  cursor-pointer"
              >
                {state.submitting ? 'sending...' : 'send a message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
