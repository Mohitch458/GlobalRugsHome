import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, ArrowRight } from 'lucide-react';
import logoImg from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-ivory relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
      
      {/* Main Footer */}
      <div className="container-luxury pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand */}
          <div className="lg:col-span-5 pr-0 lg:pr-12">
            <Link to="/" className="flex items-center gap-4 mb-8 group inline-flex">
              <div className="relative">
                <img 
                  src={logoImg} 
                  alt="GlobalRugHome Logo" 
                  className="h-16 md:h-20 w-auto object-contain rounded-sm transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl md:text-3xl tracking-wide leading-none transition-colors duration-300">
                  GLOBAL RUGS <span className="text-gold">HOMES</span>
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase mt-2 text-ivory/80 font-medium">
                  Find your perfect floor
                </span>
                <span className="text-[9px] tracking-wider uppercase mt-1 text-gold-muted">
                  Hand Tufted | Hand Crafted
                </span>
              </div>
            </Link>
            <p className="text-ivory/70 font-sans text-sm leading-relaxed mb-8 max-w-md">
              Curating the world's finest handcrafted rugs since 1985. Each piece tells a story of tradition, artistry, and timeless elegance for your sanctuary.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-ivory/5 border border-ivory/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300 hover:shadow-gold hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-ivory/5 border border-ivory/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300 hover:shadow-gold hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-ivory/5 border border-ivory/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300 hover:shadow-gold hover:-translate-y-1"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-xl mb-6 relative inline-block">
              Explore
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-gold"></span>
            </h4>
            <ul className="space-y-3.5 mt-2">
              {['History', 'Custom Orders', 'Contact Us', 'Collection', 'New Arrivals', 'Bestsellers'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Contact Us' ? '/contact' : item === 'History' ? '/history' : item === 'Custom Orders' ? '/custom-orders' : '/products'}
                    className="text-ivory/70 hover:text-gold transition-colors font-sans text-sm inline-flex items-center group"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-gold">
                      <ArrowRight size={14} />
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-xl mb-6 relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-gold"></span>
            </h4>
            <ul className="space-y-5 mt-2">
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-ivory/5 flex items-center justify-center group-hover:bg-gold transition-colors duration-300 flex-shrink-0">
                  <Phone size={14} className="text-gold group-hover:text-charcoal transition-colors duration-300" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-ivory/50 mb-1">Call Us</span>
                  <a href="tel:+1234567890" className="text-ivory/80 hover:text-gold transition-colors font-sans text-sm">
                    +1 (234) 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-ivory/5 flex items-center justify-center group-hover:bg-gold transition-colors duration-300 flex-shrink-0">
                  <Mail size={14} className="text-gold group-hover:text-charcoal transition-colors duration-300" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-ivory/50 mb-1">Email Us</span>
                  <a href="mailto:globalrughome@gmail.com" className="text-ivory/80 hover:text-gold transition-colors font-sans text-sm">
                    globalrughome@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-xl mb-6 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-gold"></span>
            </h4>
            <div className="mt-2">
              <p className="text-ivory/70 font-sans text-sm leading-relaxed mb-6">
                Subscribe to receive updates, access to exclusive deals, and more.
              </p>
              <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="w-full bg-ivory/5 border border-ivory/20 text-ivory px-4 py-3 sm:py-3.5 rounded-sm focus:outline-none focus:border-gold focus:bg-ivory/10 transition-all font-sans text-sm placeholder:text-ivory/40"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-gold hover:bg-gold-muted text-charcoal font-semibold px-4 py-3 sm:py-3.5 rounded-sm transition-all duration-300 font-sans text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-gold group"
                >
                  Subscribe
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10 bg-charcoal/50">
        <div className="container-luxury py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ivory/50 font-sans text-xs flex items-center gap-1">
            &copy; {new Date().getFullYear()} <span className="text-gold-muted">GlobalRugsHome</span>. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-ivory/50 hover:text-gold relative elegant-underline transition-colors font-sans text-xs uppercase tracking-wider">
              Privacy Policy
            </a>
            <a href="#" className="text-ivory/50 hover:text-gold relative elegant-underline transition-colors font-sans text-xs uppercase tracking-wider">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
