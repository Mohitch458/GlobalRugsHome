import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import { getProducts, type Product } from '@/lib/storage';

// Assets for collage
import weavingImg from '@/assets/weaving_loom.png';
import drapedImg from '@/assets/rug_draped.png';
import heroImg from '@/assets/hero-rug.jpg';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return (
    <main className="pt-24 pb-20 bg-background">
      {/* Collage Hero Section */}
      <section className="pt-16 pb-24 relative overflow-hidden bg-background">
        {/* Subtle background gradient blob for better visual depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="container-luxury max-w-6xl mx-auto px-4 relative z-10">
          
          {/* Titles */}
          <div className="flex justify-center relative z-30 pointer-events-none mb-[-60px] md:mb-[-100px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center bg-background/60 backdrop-blur-xl px-12 md:px-20 py-8 md:py-10 rounded-[3rem] border border-border shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
            >
              <h1 className="font-serif text-6xl md:text-8xl lg:text-[110px] text-foreground leading-none tracking-tight">
                Rugs
              </h1>
              <h2 className="font-serif text-5xl md:text-7xl lg:text-[90px] text-foreground/80 -mt-2 md:-mt-6 mb-0 italic">
                Collection
              </h2>
            </motion.div>
          </div>

          {/* Collage Images Container - Flex layout for perfect natural document flow */}
          <div className="flex justify-center items-start gap-4 lg:gap-8 w-full max-w-5xl mx-auto mb-8 md:mb-12">
            
            {/* Left Small Image (Draped Rug) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden md:block w-[30%] lg:w-[28%] mt-[250px] lg:mt-[300px] shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-500"
            >
              <img src={drapedImg} alt="Draped rug" className="w-full h-[350px] lg:h-[400px] object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>

            {/* Center Main Image (Weaving Loom) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full md:w-[45%] lg:w-[40%] relative z-20 shadow-2xl rounded-2xl md:rounded-[2rem] overflow-hidden group"
            >
              {/* Image Gradient Overlay for subtle contrast at top */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent z-10 pointer-events-none" />
              <img src={weavingImg} alt="Weaving loom" className="w-full h-[450px] md:h-[600px] lg:h-[650px] object-cover group-hover:scale-105 transition-transform duration-1000" />
            </motion.div>

            {/* Right Small Image (Texture) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden md:block w-[28%] lg:w-[25%] mt-[350px] lg:mt-[400px] shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-500"
            >
              <img src={heroImg} alt="Rug texture" className="w-full h-[280px] lg:h-[350px] object-cover object-left hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>

          {/* Bottom Text Card */}
          <div className="flex justify-center relative z-30 -mt-12 md:-mt-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-center max-w-2xl px-8 py-8 md:py-10 bg-background/80 backdrop-blur-xl border border-border shadow-soft rounded-3xl"
            >
              <span className="font-serif text-2xl text-gold block mb-3 italic">Speak your style</span>
              <p className="font-sans text-sm md:text-base text-foreground/80 leading-relaxed">
                Add elegance to your customers' home and office spaces with exclusive rugs by GlobalRugHome. As a trusted curator of the finest weaves, we bring timeless luxury directly to you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-background">
        <div className="container-luxury">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="font-serif text-2xl text-muted-foreground">
                No products found in our collection.
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
              {products.map((product, index) => (
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
