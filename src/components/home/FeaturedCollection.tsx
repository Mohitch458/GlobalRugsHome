import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import { getFeaturedProducts, type Product } from '@/lib/storage';

const FeaturedCollection = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getFeaturedProducts().slice(0, 4));
  }, []);

  return (
    <section className="section-padding bg-background">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-luxury uppercase text-gold mb-4 block">
            Curated Selection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Featured Collection
          </h2>
          <div className="gold-line-center mb-6" />
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            Discover our most sought-after pieces, each representing the pinnacle 
            of artisanal craftsmanship and timeless design.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/products" className="btn-luxury-primary">
            View All Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
