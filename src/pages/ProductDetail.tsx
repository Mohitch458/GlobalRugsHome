import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Check } from 'lucide-react';
import { getProduct, type Product } from '@/lib/storage';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      const foundProduct = getProduct(id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Product Not Found</h1>
          <Link to="/products" className="btn-luxury-primary">
            Back to Collection
          </Link>
        </div>
      </main>
    );
  }

  const features = [
    { label: 'Material', value: product.material },
    { label: 'Size', value: product.size },
    { label: 'Category', value: product.category },
  ];

  return (
    <main className="pt-24 pb-20">
      <div className="container-luxury">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Collection
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="img-hover-zoom aspect-square bg-muted mb-4 overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 overflow-hidden transition-all ${
                      selectedImage === index
                        ? 'ring-2 ring-gold ring-offset-2'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-sans text-xs tracking-luxury uppercase text-gold mb-3 block">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              {product.name}
            </h1>
            <div className="gold-line mb-6" />

            <p className="font-sans text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Features */}
            <div className="border-t border-b border-border py-6 mb-8">
              <div className="grid grid-cols-3 gap-4">
                {features.map((feature) => (
                  <div key={feature.label}>
                    <span className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-1">
                      {feature.label}
                    </span>
                    <span className="font-sans text-sm text-foreground">
                      {feature.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-10">
              <h3 className="font-serif text-lg text-foreground mb-4">Why Choose This Rug</h3>
              <ul className="space-y-3">
                {[
                  'Handcrafted by master artisans',
                  'Premium quality materials',
                  'Unique one-of-a-kind piece',
                  'Sustainable and ethical production'
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 font-sans text-sm text-muted-foreground">
                    <Check size={16} className="text-gold flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <a
              href={product.amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-gold inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Buy Now on Amazon
              <ExternalLink size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
