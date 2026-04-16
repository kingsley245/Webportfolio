import { Link } from 'react-router';

// Direct SVG paths for reliability
const ICONS = {
  GITHUB:
    'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  LINKEDIN:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
  X: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.31 17.41z',
  ARROW_UP: 'M12 19V5M5 12l7-7 7 7',
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#0f0f0f] text-white pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Intro */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10  bg-purple-600 rounded-full flex items-center justify-center font-black text-black">
                KC
              </div>
              <span className="font-black text-2xl tracking-tighter uppercase">
                KANTHCODE
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm font-medium">
              Architecting high-performance web solutions. Based in Nigeria,
              building for the world.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-bold text-purple-600 uppercase tracking-widest text-xs mb-6">
              Explore
            </h4>
            <ul className="space-y-4">
              {['Home', 'Profile', 'Experience', 'Projects'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white font-bold text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons using SVGs */}
          <div>
            <h4 className="font-bold text-purple-600 uppercase tracking-widest text-xs mb-6">
              Connect
            </h4>
            <div className="flex gap-4">
              {[
                {
                  path: ICONS.GITHUB,
                  href: 'https://github.com/KingsleyOsuya',
                },
                {
                  path: ICONS.LINKEDIN,
                  href: 'https://linkedin.com/in/kingsleyosuya',
                },
                { path: ICONS.X, href: 'https://x.com' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-purple-600 hover:text-black transition-all"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm font-medium">
            © {new Date().getFullYear()} Kanthcode.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-gray-400 font-bold transition-colors"
          >
            Back to top
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center ">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={ICONS.ARROW_UP} />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
