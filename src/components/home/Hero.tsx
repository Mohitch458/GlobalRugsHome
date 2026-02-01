import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-rug.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury handcrafted rug"
          className="w-full h-full object-cover"
        />
        <div className="overlay-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxury text-center text-primary-foreground">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="inline-block font-sans text-xs tracking-luxury uppercase text-gold-muted mb-6">
            Handcrafted Excellence Since 1985
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6 max-w-4xl mx-auto"
        >
          Where Artistry Meets
          <span className="block italic text-gold-muted">Timeless Elegance</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-sans text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Discover our curated collection of handwoven masterpieces, 
          where centuries of tradition meet contemporary sophistication.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/products" className="btn-luxury-gold">
            Explore Collection
          </Link>
          <Link 
            to="/reviews" 
            className="btn-luxury-outline border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            Read Reviews
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-primary-foreground/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
