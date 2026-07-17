import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCategories } from '@/lib/storage';
import EnhancedCollectionGrid from '@/components/home/EnhancedCollectionGrid';

const CollectionsSection = () => {
  const [categories, setCategories] = useState<any[]>([]);

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

        <EnhancedCollectionGrid categories={categories} />
      </div>
    </section>
  );
};

export default CollectionsSection;
