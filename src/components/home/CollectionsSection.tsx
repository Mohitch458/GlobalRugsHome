import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCategories, type Category } from '@/lib/storage';

const CollectionsSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4 block">
            Discover
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-6">
            Curated Collections
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto font-sans text-lg">
            Explore our meticulously curated selection of handcrafted rugs by design style, material, and aesthetic.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px] md:auto-rows-[350px]">
          {categories.map((item, index) => (
            <motion.div
              key={item.id}
              className={`${item.className || 'md:col-span-1 lg:col-span-1'} h-full`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index % 4) * 0.05 }}
            >
              <Link 
                to={item.path} 
                className="relative block w-full h-full group overflow-hidden bg-neutral-100"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-10">
                  <h3 className="text-white font-serif text-2xl md:text-3xl lg:text-4xl mb-3 drop-shadow-md">
                    {item.name}
                  </h3>
                  <div className="flex items-center text-white/90 font-sans text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <span>Explore</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
