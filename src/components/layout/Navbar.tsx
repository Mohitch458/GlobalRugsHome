import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X as XIcon, Facebook, Instagram, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '@/assets/logo.png';
import { useContactLink } from '@/hooks/useContactLink';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { handleContactClick } = useContactLink();

  const isHomePage = location.pathname === '/';
  const useLightText = isHomePage && !isScrolled;

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'History', path: '/history' },
    { name: 'Collection', path: '/products' },
    { name: 'Custom Orders', path: '/custom-orders' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-soft py-4'
            : 'bg-transparent py-6'
          }`}
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Global Rug Homes Logo"
              className="h-12 md:h-16 lg:h-20 w-auto object-contain rounded-sm"
            />
            <div className="flex flex-col">
              <span className={`font-serif text-xl md:text-2xl tracking-wide leading-none transition-colors duration-300 ${!useLightText ? 'text-foreground' : 'text-primary-foreground'
                }`}>
                Global Rug <span className="text-gold">Homes</span>
              </span>
              <span className={`hidden md:block text-[10px] md:text-xs tracking-widest uppercase mt-1 transition-colors duration-300 ${!useLightText ? 'text-foreground/70' : 'text-primary-foreground/70'
                }`}>
                Find your perfect floor
              </span>
              <span className={`hidden md:block text-[9px] md:text-[10px] tracking-wider uppercase mt-0.5 transition-colors duration-300 ${!useLightText ? 'text-foreground/50' : 'text-primary-foreground/50'
                }`}>
                Hand Tufted | Hand Crafted
              </span>
            </div>
          </Link>

          {/* Universal Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 transition-colors ${!useLightText ? 'text-foreground' : 'text-primary-foreground'
              }`}
          >
            {isMobileMenuOpen ? <XIcon size={28} /> : <Menu size={28} />}
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
            className="fixed inset-0 z-40 bg-background pt-24 pb-8 overflow-y-auto"
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
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif text-3xl text-foreground hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

{/* Contact & Social Section */}
              <div className="w-full max-w-sm px-8 mt-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-full h-px bg-border my-6"></div>

                <div className="flex flex-row justify-center gap-8 w-full py-2">
                  <a href="https://www.pinterest.com/globalrughome/" target="_blank" rel="noopener noreferrer" className="flex items-center text-foreground/80 hover:text-gold transition-colors" aria-label="Pinterest">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z"/></svg>
                  </a>
                  <a href="#" className="flex items-center text-foreground/80 hover:text-gold transition-colors" aria-label="Facebook">
                    <Facebook size={24} />
                  </a>
                  <a href="https://x.com/GlobalRugHome" target="_blank" rel="noopener noreferrer" className="flex items-center text-foreground/80 hover:text-gold transition-colors" aria-label="X (Twitter)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/globalrughome/" target="_blank" rel="noopener noreferrer" className="flex items-center text-foreground/80 hover:text-gold transition-colors" aria-label="Instagram">
                    <Instagram size={24} />
                  </a>
                  <a href="#" className="flex items-center text-foreground/80 hover:text-gold transition-colors" aria-label="LinkedIn">
                    <Linkedin size={24} />
                  </a>
                </div>

                <div className="w-full h-px bg-border my-6"></div>

                <div className="flex flex-col gap-4 w-full">
                  <button onClick={handleContactClick} className="font-sans text-sm text-foreground/80 hover:text-gold transition-colors text-left bg-transparent border-none cursor-pointer p-0">
                    hello@globalrugshome.com
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
