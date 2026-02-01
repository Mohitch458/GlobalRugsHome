import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import { getReviews, type Review } from '@/lib/storage';

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    setReviews(getReviews().slice(0, 3));
  }, []);

  return (
    <section className="section-padding bg-charcoal text-ivory">
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
            Client Stories
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mb-4">
            Words of Appreciation
          </h2>
          <div className="gold-line-center mb-6" />
          <p className="font-sans text-ivory/70 max-w-2xl mx-auto">
            Hear from our valued clients who have transformed their homes 
            with our handcrafted masterpieces.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-8 bg-ivory/5 backdrop-blur border border-ivory/10"
            >
              <Quote className="text-gold/30 mb-4" size={32} />
              <p className="font-sans text-ivory/80 leading-relaxed mb-6 italic">
                "{review.comment}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg text-ivory mb-1">
                    {review.name}
                  </h4>
                  <StarRating rating={review.rating} readonly size="sm" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
