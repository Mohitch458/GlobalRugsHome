import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Check } from 'lucide-react';
import { getProduct, type Product } from '@/lib/storage';
import { getImageUrl } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activePrice, setActivePrice] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = getProduct(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setActivePrice(foundProduct.price);
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

  const parseVariants = (desc: string) => {
    if (!desc.includes("Available Sizes & Pricing:")) return null;
    const parts = desc.split("Available Sizes & Pricing:");
    const variantsText = parts[1].trim();
    const lines = variantsText.split('\n').filter(l => l.trim().startsWith('-'));
    return lines.map(line => {
      const match = line.match(/^-\s+(.+?):\s+\$([\d,.]+)/);
      if (match) {
        return { name: match[1], price: parseFloat(match[2].replace(/,/g, '')) };
      }
      return null;
    }).filter(Boolean) as { name: string, price: number }[];
  };

  const variants = parseVariants(product.description);
  const displayDescription = variants ? product.description.split("Available Sizes & Pricing:")[0].trim() : product.description;

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
                src={getImageUrl(product.images[selectedImage])}
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
                      src={getImageUrl(image)}
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
            
            <p className="font-serif text-3xl text-foreground mb-8">
              ${(activePrice ?? product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>

            <p className="font-sans text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
              {displayDescription}
            </p>

            {variants && variants.length > 0 && (
              <div className="mb-8">
                <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                  Select Size
                </label>
                <div className="relative">
                  <select 
                    onChange={(e) => setActivePrice(Number(e.target.value))}
                    className="w-full appearance-none bg-muted border border-border px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-gold transition-colors cursor-pointer"
                  >
                    {variants.map(v => (
                      <option key={v.name} value={v.price}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                  </div>
                </div>
              </div>
            )}

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
