import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCategories, type Category } from '@/lib/storage';
import { useContactLink } from '@/hooks/useContactLink';
import EnhancedCollectionGrid from '@/components/home/EnhancedCollectionGrid';

// Assets for collage
import weavingImg from '@/assets/weaving_loom.png';
import drapedImg from '@/assets/rug_draped.png';
import heroImg from '@/assets/hero-rug.jpg';


const Products = () => {
  const navigate = useNavigate();
  const { handleContactClick } = useContactLink();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchedCategories = getCategories().filter(s => s.isActive !== false && s.name !== "Luxury Rugs" && s.name !== "New Arrivals" && s.name !== "Best Sellers");
    setCategories(fetchedCategories);
  }, []);

  return (
    <main className="pt-24 pb-20 bg-neutral-50 min-h-screen">
      <section className="pt-16 pb-24 relative overflow-hidden bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="container-luxury max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex justify-center relative z-30 pointer-events-none mb-[-40px] sm:mb-[-60px] md:mb-[-100px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center bg-background/60 backdrop-blur-xl px-6 py-6 sm:px-12 md:px-20 sm:py-8 md:py-10 rounded-[2rem] sm:rounded-[3rem] border border-border shadow-[0_8px_32px_rgba(0,0,0,0.04)] mx-4"
            >
              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[110px] text-foreground leading-none tracking-tight">Rugs</h1>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[90px] text-foreground/80 -mt-2 md:-mt-6 mb-0 italic">Collection</h2>
            </motion.div>
          </div>
          
          <div className="flex justify-center items-start gap-4 lg:gap-8 w-full max-w-5xl mx-auto mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden md:block w-[30%] lg:w-[28%] mt-[250px] lg:mt-[300px] shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-500"
            >
              <img src={drapedImg} alt="Draped rug" className="w-full h-[350px] lg:h-[400px] object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full md:w-[45%] lg:w-[40%] relative z-20 shadow-2xl rounded-2xl md:rounded-[2rem] overflow-hidden group mx-4 md:mx-0"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent z-10 pointer-events-none" />
              <img src={weavingImg} alt="Weaving loom" className="w-full h-[280px] sm:h-[450px] md:h-[600px] lg:h-[650px] object-cover group-hover:scale-105 transition-transform duration-1000" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden md:block w-[28%] lg:w-[25%] mt-[350px] lg:mt-[400px] shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-500"
            >
              <img src={heroImg} alt="Rug texture" className="w-full h-[280px] lg:h-[350px] object-cover object-left hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>

          <div className="flex justify-center relative z-30 -mt-8 sm:-mt-12 md:-mt-20 mx-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-center max-w-2xl px-6 py-6 sm:px-8 sm:py-10 bg-background/80 backdrop-blur-xl border border-border shadow-soft rounded-3xl"
            >
              <span className="font-serif text-xl sm:text-2xl text-gold block mb-3 italic">Speak your style</span>
              <p className="font-sans text-xs sm:text-sm md:text-base text-foreground/80 leading-relaxed">
                Explore our massive new collection of over 80 premium handcrafted rugs. Filter by category, price, or search for your perfect match below.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-gold mb-3 block">Browse by Style</span>
            <h1 className="font-serif text-4xl sm:text-5xl text-neutral-900 mb-4">Our Collections</h1>
            <p className="font-sans text-neutral-500 max-w-xl mx-auto text-sm sm:text-base">Explore the styles we specialise in. Interested in a piece? Contact us for more details.</p>
          </motion.div>
          <EnhancedCollectionGrid categories={categories} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 text-center bg-neutral-900 rounded-3xl px-8 py-12 sm:py-16"
          >
            <span className="font-serif text-gold text-xl italic block mb-3">Like what you see?</span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white mb-4">Get in touch with us</h3>
            <p className="font-sans text-white/60 max-w-lg mx-auto mb-8 text-sm sm:text-base">Our team is ready to help you find the perfect rug for your space. Reach out for pricing, sizing, and availability.</p>
            <button onClick={handleContactClick} className="btn-luxury-primary">Contact Us</button>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Products;
