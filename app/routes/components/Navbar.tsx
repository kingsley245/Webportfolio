import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-100 transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 backdrop-blur-lg border-b border-slate-100 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 transition-transform group-hover:scale-110">
            <img src="/favicon.ico" alt="KC" className="w-full h-full" />
          </div>
          <span className="font-black text-2xl tracking-tighter text-slate-900">
            KANTHCODE
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => `
                    text-sm font-bold uppercase tracking-widest transition-all duration-300
                    ${isActive ? 'text-purple-600' : 'text-slate-500 hover:text-purple-600'}
                  `}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            className="px-7 py-3 bg-purple-600 text-white rounded-full font-bold text-sm shadow-lg shadow-purple-100 hover:bg-purple-700 hover:shadow-purple-200 transition-all transform hover:-translate-y-0.5"
          >
            CONTACT
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-slate-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-6 md:hidden shadow-xl animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                text-lg font-bold uppercase tracking-widest
                ${isActive ? 'text-purple-600' : 'text-slate-500'}
              `}
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-4 bg-purple-600 text-white rounded-2xl font-bold"
          >
            CONTACT
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
