import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/products' },
    { name: 'Reviews', path: '/reviews' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-soft py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className={`font-serif text-2xl md:text-3xl tracking-wide transition-colors duration-300 ${
              isScrolled ? 'text-foreground' : 'text-primary-foreground'
            }`}>
              Global<span className="text-gold">Rugs</span>Home
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`elegant-underline font-sans text-sm tracking-luxury uppercase transition-colors duration-300 ${
                  isScrolled ? 'text-foreground' : 'text-primary-foreground'
                } ${location.pathname === link.path ? 'after:scale-x-100' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className={`btn-luxury-outline text-xs py-2 px-5 ${
                isScrolled ? '' : 'border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary'
              }`}
            >
              Login / Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? 'text-foreground' : 'text-primary-foreground'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background pt-24"
          >
            <div className="container-luxury flex flex-col items-center gap-8 py-12">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="font-serif text-3xl text-foreground hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/admin" className="btn-luxury-primary mt-4">
                  Login / Signup
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
