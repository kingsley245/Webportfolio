import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      {/* Soft Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-purple-50 rounded-full blur-[120px] opacity-40 -z-10" />

      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Large Stylized 404 */}
          <h1 className="text-[12rem] font-black leading-none text-transparent bg-clip-text bg-linear-to-b from-purple-600 to-fuchsia-400 opacity-20 select-none">
            404
          </h1>

          <div className="relative -mt-20">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
              Lost in Space?
            </h2>
            <p className="text-slate-500 mb-10 leading-relaxed font-medium">
              The page you are looking for doesn't exist or has been moved.
              Let's get you back to the main branch.
            </p>

            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-100 hover:bg-purple-700 transition-all transform hover:-translate-y-1"
              >
                <Home size={20} /> Back to Home
              </Link>

              <button
                onClick={() => window.history.back()}
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-100 text-slate-600 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all"
              >
                <ArrowLeft size={20} /> Go Back
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
