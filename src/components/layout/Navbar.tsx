import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User as UserIcon, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAuthenticatedUser, logoutUser, type User } from '@/lib/storage';
import logoImg from '@/assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

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
    setUser(getAuthenticatedUser());
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

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate('/');
  };

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-soft py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logoImg} 
              alt="GlobalRugHome Logo" 
              className="h-12 md:h-16 lg:h-20 w-auto object-contain rounded-sm"
            />
            <div className="flex flex-col">
              <span className={`font-serif text-xl md:text-2xl tracking-wide leading-none transition-colors duration-300 ${
                !useLightText ? 'text-foreground' : 'text-primary-foreground'
              }`}>
                Global Rugs <span className="text-gold">Homes</span>
              </span>
              <span className={`hidden md:block text-[10px] md:text-xs tracking-widest uppercase mt-1 transition-colors duration-300 ${
                !useLightText ? 'text-foreground/70' : 'text-primary-foreground/70'
              }`}>
                Find your perfect floor
              </span>
              <span className={`hidden md:block text-[9px] md:text-[10px] tracking-wider uppercase mt-0.5 transition-colors duration-300 ${
                !useLightText ? 'text-foreground/50' : 'text-primary-foreground/50'
              }`}>
                Hand Tufted | Hand Crafted
              </span>
            </div>
          </Link>

          {/* Universal Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 transition-colors ${
              !useLightText ? 'text-foreground' : 'text-primary-foreground'
            }`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
              
              <div className="flex flex-col items-center gap-4 mt-4 w-full px-8">
                {user ? (
                  <>
                    <span className="font-serif text-xl text-foreground mb-2 flex items-center gap-2">
                      <UserIcon size={20} />
                      {user.name}
                    </span>
                    <button 
                      onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} 
                      className="btn-luxury-outline w-full max-w-[200px]"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/auth" 
                      state={{ mode: 'login' }} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn-luxury-outline w-full max-w-[200px] text-center"
                    >
                      Sign In
                    </Link>
                    <Link 
                      to="/auth" 
                      state={{ mode: 'register' }} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn-luxury-primary w-full max-w-[200px] text-center"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>

              {/* Contact & Social Section */}
              <div className="w-full max-w-sm px-8 mt-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-full h-px bg-border my-6"></div>
                
                <div className="flex flex-row justify-center gap-8 w-full py-2">
                  <a href="#" className="flex items-center text-foreground/80 hover:text-gold transition-colors" aria-label="Facebook">
                    <Facebook size={24} />
                  </a>
                  <a href="#" className="flex items-center text-foreground/80 hover:text-gold transition-colors" aria-label="X (Twitter)">
                    <Twitter size={24} />
                  </a>
                  <a href="#" className="flex items-center text-foreground/80 hover:text-gold transition-colors" aria-label="Instagram">
                    <Instagram size={24} />
                  </a>
                  <a href="#" className="flex items-center text-foreground/80 hover:text-gold transition-colors" aria-label="LinkedIn">
                    <Linkedin size={24} />
                  </a>
                </div>

                <div className="w-full h-px bg-border my-6"></div>

                <div className="flex flex-col gap-4 w-full">
                  <a href="mailto:hello@globalrugshome.com" className="font-sans text-sm text-foreground/80 hover:text-gold transition-colors">
                    hello@globalrugshome.com
                  </a>
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
