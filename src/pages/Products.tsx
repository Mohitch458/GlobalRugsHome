import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import { getProducts, type Product } from '@/lib/storage';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const allProducts = getProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  return (
    <main className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-warm py-20">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-sans text-xs tracking-luxury uppercase text-gold mb-4 block">
              Our Collection
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Artisan Rugs
            </h1>
            <div className="gold-line-center mb-6" />
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
              Each piece in our collection is a testament to centuries of weaving tradition, 
              meticulously handcrafted by master artisans.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border bg-background sticky top-20 z-30">
        <div className="container-luxury">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`font-sans text-sm tracking-wide-luxury uppercase px-6 py-2 transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="font-serif text-2xl text-muted-foreground">
                No products found in this category.
              </h3>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Products;
