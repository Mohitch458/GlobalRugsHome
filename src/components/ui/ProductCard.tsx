import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Star, StarHalf } from 'lucide-react';
import { getImageUrl } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import type { Product } from '@/lib/storage';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  const renderStars = (rating: number = 5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={14} className="fill-gold text-gold" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={14} className="fill-gold text-gold" />);
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={14} className="text-muted-foreground/30" />);
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/products/${product.id}`} className="block h-full">
        <div className="luxury-card overflow-hidden h-full flex flex-col bg-white">
          {/* Image Container */}
          <div className="img-hover-zoom aspect-[4/5] bg-neutral-100 relative overflow-hidden">
            
            {/* Badges */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium uppercase tracking-wider text-neutral-900 shadow-sm rounded-sm">
                {product.category}
              </span>
              {product.salePrice && product.showPricing && (
                <span className="bg-gold px-3 py-1 text-xs font-medium uppercase tracking-wider text-white shadow-sm rounded-sm self-start">
                  Sale
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button 
              onClick={handleToggleWishlist}
              className="absolute top-3 right-3 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors duration-300"
              aria-label="Toggle Wishlist"
            >
              <Heart size={18} className={`transition-colors duration-300 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-600 hover:text-red-500'}`} />
            </button>

            <img
              src={getImageUrl(product.images[0])}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110 ${product.images.length > 1 ? 'group-hover:opacity-0' : ''}`}
              referrerPolicy="no-referrer"
            />
            {product.images.length > 1 && (
              <img
                src={getImageUrl(product.images[1])}
                alt={`${product.name} alternate view`}
                className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-all duration-1000 ease-in-out group-hover:opacity-100 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            )}

            {/* Quick View / Add to Cart Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-white text-neutral-900 py-3.5 px-4 font-sans text-sm font-medium uppercase tracking-widest hover:bg-gold hover:text-white transition-all duration-300 shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
              >
                {product.enablePurchase ? 'Add to Cart' : 'Request Information'}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 md:p-6 flex flex-col flex-1">
            <div className="flex items-center gap-1.5 mb-2.5">
              {renderStars(product.rating || 5)}
              <span className="text-xs text-muted-foreground ml-1 font-sans">
                ({product.reviewsCount || Math.floor(Math.random() * 50) + 5})
              </span>
            </div>
            
            <h3 className="font-serif text-lg md:text-xl text-foreground mb-2 group-hover:text-gold transition-colors line-clamp-1">
              {product.name}
            </h3>
            
            <p className="font-sans text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
              {product.shortDescription}
            </p>
            
            <div className="flex items-end justify-between mt-auto pt-4 border-t border-border/50">
              <div className="flex flex-col">
                {product.showPricing && (
                  product.salePrice ? (
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-base md:text-lg text-red-600 font-medium">
                        ${product.salePrice.toFixed(2)}
                      </span>
                      <span className="font-sans text-xs md:text-sm text-muted-foreground line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="font-sans text-base md:text-lg text-foreground font-medium">
                      ${product.price.toFixed(2)}
                    </span>
                  )
                )}
              </div>
              <span className="font-sans text-[10px] md:text-xs tracking-luxury uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Details
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
