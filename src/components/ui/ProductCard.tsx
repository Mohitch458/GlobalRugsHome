import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getImageUrl } from '@/lib/utils';
import type { Product } from '@/lib/storage';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link to={`/products/${product.id}`} className="group block">
        <div className="luxury-card overflow-hidden">
          {/* Image Container */}
          <div className="img-hover-zoom aspect-[4/5] bg-muted relative">
            <img
              src={getImageUrl(product.images[0])}
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${product.images.length > 1 ? 'group-hover:opacity-0' : ''}`}
              referrerPolicy="no-referrer"
            />
            {product.images.length > 1 && (
              <img
                src={getImageUrl(product.images[1])}
                alt={`${product.name} alternate view`}
                className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <span className="font-sans text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">
              {product.category}
            </span>
            <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-gold transition-colors">
              {product.name}
            </h3>
            <p className="font-sans text-sm text-muted-foreground mb-4 line-clamp-2">
              {product.shortDescription}
            </p>
            <div className="flex items-center justify-end mt-2">
              <span className="font-sans text-xs tracking-luxury uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                View Details →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
