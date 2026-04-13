import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User as UserIcon } from 'lucide-react';
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

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate('/');
  };

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
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logoImg} 
              alt="GlobalRugsHome Logo" 
              className="h-10 md:h-12 w-auto object-contain rounded-sm"
            />
            <div className="flex flex-col">
              <span className={`font-serif text-xl md:text-2xl tracking-wide leading-none transition-colors duration-300 ${
                !useLightText ? 'text-foreground' : 'text-primary-foreground'
              }`}>
                Global Rug <span className="text-gold">Home</span>
              </span>
              <span className={`text-[10px] md:text-xs tracking-widest uppercase mt-1 transition-colors duration-300 ${
                !useLightText ? 'text-foreground/70' : 'text-primary-foreground/70'
              }`}>
                Find Your Perfect Floor
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`elegant-underline font-sans text-sm tracking-luxury uppercase transition-colors duration-300 ${
                  !useLightText ? 'text-foreground' : 'text-primary-foreground'
                } ${location.pathname === link.path ? 'after:scale-x-100' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className={`flex items-center gap-2 font-sans text-sm ${!useLightText ? 'text-foreground' : 'text-primary-foreground'}`}>
                  <UserIcon size={16} />
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className={`btn-luxury-outline text-xs py-2 px-5 ${
                    !useLightText ? '' : 'border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary'
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/auth"
                  state={{ mode: 'login' }}
                  className={`font-sans text-sm tracking-luxury uppercase transition-colors duration-300 ${
                    !useLightText ? 'text-foreground hover:text-gold' : 'text-primary-foreground hover:text-gold/80'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  state={{ mode: 'register' }}
                  className={`btn-luxury-outline text-xs py-2 px-5 ${
                    !useLightText ? '' : 'border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary'
                  }`}
                >
                  Register
                </Link>
              </div>
            )}
            

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              !useLightText ? 'text-foreground' : 'text-primary-foreground'
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
              
              <div className="flex flex-col items-center gap-4 mt-4 w-full px-8">
                {user ? (
                  <>
                    <span className="font-serif text-xl text-foreground mb-2 flex items-center gap-2">
                      <UserIcon size={20} />
                      {user.name}
                    </span>
                    <button onClick={handleLogout} className="btn-luxury-outline w-full max-w-[200px]">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" state={{ mode: 'login' }} className="btn-luxury-outline w-full max-w-[200px] text-center">
                      Sign In
                    </Link>
                    <Link to="/auth" state={{ mode: 'register' }} className="btn-luxury-primary w-full max-w-[200px] text-center">
                      Register
                    </Link>
                  </>
                )}
                

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
