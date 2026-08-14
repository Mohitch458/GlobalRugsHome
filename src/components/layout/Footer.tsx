import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, ArrowRight, Linkedin } from 'lucide-react';
import logoImg from '@/assets/logo.png';
import { useContactLink } from '@/hooks/useContactLink';

const Footer = () => {
  const { handleContactClick } = useContactLink();
  return (
    <footer className="bg-charcoal text-ivory relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
      
      {/* Main Footer */}
      <div className="container-luxury pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Brand */}
          <div className="lg:col-span-4 pr-0 lg:pr-8">
            <Link to="/" className="flex items-center gap-4 mb-8 group inline-flex">
              <div className="relative">
                <img 
                  src={logoImg} 
                  alt="Global Rug Home Logo" 
                  className="h-16 md:h-20 w-auto object-contain rounded-sm transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl md:text-3xl tracking-wide leading-none transition-colors duration-300">
                  GLOBAL RUG <span className="text-gold">HOME</span>
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
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-xl mb-6 relative inline-block">
              Explore
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-gold"></span>
            </h4>
            <ul className="space-y-4 mt-2">
              {['History', 'Custom Orders', 'Collection', 'Contact Us'].map((item) => (
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
          <div className="lg:col-span-3">
            <h4 className="font-serif text-xl mb-6 relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-gold"></span>
            </h4>
            <ul className="space-y-5 mt-2">

              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-10 h-10 rounded-full bg-ivory/5 border border-ivory/20 flex items-center justify-center group-hover:bg-gold transition-all duration-300 flex-shrink-0">
                  <Mail size={16} className="text-gold group-hover:text-charcoal transition-colors duration-300" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-ivory/50 mb-1 mt-1">Email Us</span>
                  <button onClick={handleContactClick} className="text-ivory/80 hover:text-gold transition-colors font-sans text-sm break-all text-left bg-transparent border-none cursor-pointer p-0">
                    globalrughome@gmail.com
                  </button>
                </div>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-xl mb-6 relative inline-block">
              Connect With Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-gold"></span>
            </h4>
            <p className="text-ivory/70 font-sans text-sm leading-relaxed mb-6">
              Follow us for the latest collections, inspiration, and exclusive offers.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.pinterest.com/globalrughome/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-transparent border border-ivory/30 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300 hover:shadow-gold"
                aria-label="Pinterest"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z"/></svg>
              </a>
              <a
                href="https://www.amazon.com/s?ie=UTF8&marketplaceID=ATVPDKIKX0DER&me=A2Y0L8AKTLT1LI"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-transparent border border-ivory/30 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300 hover:shadow-gold"
                aria-label="Amazon Store"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.002 2C6.48 2 2 6.48 2 12s4.48 10 10.002 10c5.52 0 10-4.48 10-10s-4.48-10-10-10zm2.25 14.28c-.85.34-1.74.52-2.65.52-1.92 0-3.35-1.03-3.35-3.07 0-2.45 1.93-3.31 4.54-3.31.25 0 .5.01.74.03v-.35c0-.82-.44-1.32-1.39-1.32-.9 0-1.84.34-2.53.86l-.68-1.28c.95-.71 2.37-1.12 3.73-1.12 2.45 0 3.37 1.28 3.37 3.42v3.7c0 .76.22 1.09.48 1.34v.26h-2.28c-.14-.26-.24-.65-.24-.97-.56.78-1.5 1.28-2.77 1.28zm.72-3.83c-.22-.02-.45-.03-.68-.03-1.46 0-2.54.27-2.54 1.54 0 .76.5 1.15 1.21 1.15 1.14 0 1.83-.71 2.01-1.74v-.92z"/></svg>
              </a>
              <a
                href="https://globalrughome.etsy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-transparent border border-ivory/30 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300 hover:shadow-gold"
                aria-label="Etsy Shop"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm3.77 13.06c0 .35-.14.68-.4.92s-.6.37-.96.37H9.59c-.36 0-.7-.13-.96-.37a1.275 1.275 0 0 1-.4-.92V8.94c0-.35.14-.68.4-.92.26-.24.6-.37.96-.37h4.82c.36 0 .7.13.96.37.26.24.4.57.4.92v1.17h-1.5V9.44h-3.32v1.78h2.57v1.5h-2.57v1.89h3.32v-1.06h1.5v1.06z"/></svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-transparent border border-ivory/30 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300 hover:shadow-gold"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://x.com/GlobalRugHome"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-transparent border border-ivory/30 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300 hover:shadow-gold"
                aria-label="Twitter"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-transparent border border-ivory/30 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300 hover:shadow-gold"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/globalrughome/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-transparent border border-ivory/30 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300 hover:shadow-gold"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>


        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10 bg-charcoal/50">
        <div className="container-luxury py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ivory/50 font-sans text-xs flex items-center gap-1">
            &copy; {new Date().getFullYear()} <span className="text-gold-muted">Global Rug Home</span>. All rights reserved.
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
