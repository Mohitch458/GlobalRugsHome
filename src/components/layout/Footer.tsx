import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import logoImg from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-ivory">
      {/* Main Footer */}
      <div className="container-luxury section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src={logoImg} 
                alt="GlobalRugHome Logo" 
                className="h-12 w-auto object-contain rounded-sm"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-wide leading-none">
                  GLOBAL RUG <span className="text-gold">HOME</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase mt-1 text-ivory/70">
                  Find Your Perfect Floor
                </span>
              </div>
            </Link>
            <p className="text-ivory/70 font-sans text-sm leading-relaxed mb-6">
              Curating the world's finest handcrafted rugs since 1985. Each piece tells a story of tradition, artistry, and timeless elegance.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-ivory/30 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-ivory/30 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-ivory/30 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/history"
                  className="text-ivory/70 hover:text-gold transition-colors font-sans text-sm"
                >
                  History
                </Link>
              </li>
              {['Collection', 'New Arrivals', 'Bestsellers', 'Custom Orders'].map((item) => (
                <li key={item}>
                  <Link
                    to="/products"
                    className="text-ivory/70 hover:text-gold transition-colors font-sans text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-serif text-lg mb-6">Collections</h4>
            <ul className="space-y-3">
              {['Persian', 'Tribal', 'Contemporary', 'Silk', 'Kilim'].map((item) => (
                <li key={item}>
                  <Link
                    to="/products"
                    className="text-ivory/70 hover:text-gold transition-colors font-sans text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-1 flex-shrink-0" />
                <span className="text-ivory/70 font-sans text-sm">
                  123 Artisan Avenue<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold flex-shrink-0" />
                <a href="tel:+1234567890" className="text-ivory/70 hover:text-gold transition-colors font-sans text-sm">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold flex-shrink-0" />
                <a href="mailto:hello@globalrugshome.com" className="text-ivory/70 hover:text-gold transition-colors font-sans text-sm">
                  hello@globalrugshome.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10">
        <div className="container-luxury py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ivory/50 font-sans text-xs">
            © {new Date().getFullYear()} GlobalRugHome. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-ivory/50 hover:text-gold transition-colors font-sans text-xs">
              Privacy Policy
            </a>
            <a href="#" className="text-ivory/50 hover:text-gold transition-colors font-sans text-xs">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
