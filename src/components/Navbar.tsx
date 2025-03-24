import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-coal/80 backdrop-blur-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8" />
            <span className="text-2xl font-bold">FIRA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/technology" className="hover:text-white transition-colors">Technology</Link>
            <Link to="/models" className="hover:text-white transition-colors">Models</Link>
            <Link to="/documentation" className="hover:text-white transition-colors">Documentation</Link>
            <Link to="/team" className="hover:text-white transition-colors">Team</Link>
            <Link to="/careers" className="hover:text-white transition-colors">Careers</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-metallic hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-coal/95 backdrop-blur-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/technology"
              className="block px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Technology
            </Link>
            <Link
              to="/models"
              className="block px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Models
            </Link>
            <Link
              to="/documentation"
              className="block px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Documentation
            </Link>
            <Link
              to="/team"
              className="block px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Team
            </Link>
            <Link
              to="/careers"
              className="block px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Careers
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;