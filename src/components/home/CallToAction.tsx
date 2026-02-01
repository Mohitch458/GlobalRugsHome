import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section className="section-padding bg-sand">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="font-sans text-xs tracking-luxury uppercase text-gold mb-4 block">
            Begin Your Journey
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
            Find Your Perfect
            <span className="block italic text-warm-brown">Heirloom Piece</span>
          </h2>
          <p className="font-sans text-muted-foreground mb-10 leading-relaxed">
            Every rug tells a story. Let us help you discover the piece that 
            will become a cherished part of your home's narrative for generations to come.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products" className="btn-luxury-gold">
              Browse Collection
            </Link>
            <Link to="/reviews" className="btn-luxury-outline">
              Read Reviews
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
