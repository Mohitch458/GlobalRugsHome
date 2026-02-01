import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StarRating from '@/components/ui/StarRating';
import { getReviews, addReview, type Review } from '@/lib/storage';
import { toast } from '@/hooks/use-toast';

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    setReviews(getReviews());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !comment.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newReview = addReview({ name: name.trim(), rating, comment: comment.trim() });
    setReviews([newReview, ...reviews]);
    setName('');
    setRating(5);
    setComment('');
    
    toast({
      title: "Thank you for your review!",
      description: "Your feedback helps us serve you better."
    });
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
              Client Stories
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Reviews & Testimonials
            </h1>
            <div className="gold-line-center mb-6" />
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
              Read what our valued clients have to say about their experience 
              with our handcrafted rugs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Review Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-card p-8 shadow-soft sticky top-28">
                <h2 className="font-serif text-2xl text-foreground mb-2">
                  Share Your Experience
                </h2>
                <p className="font-sans text-sm text-muted-foreground mb-6">
                  We'd love to hear about your GlobalRugHomes experience.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 bg-background border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                      Your Rating
                    </label>
                    <StarRating rating={rating} onChange={setRating} size="lg" />
                  </div>
                  
                  <div>
                    <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      rows={4}
                      className="w-full px-4 py-3 bg-background border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>
                  
                  <button type="submit" className="btn-luxury-primary w-full">
                    Submit Review
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Reviews List */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="font-serif text-xl text-muted-foreground">
                      Be the first to share your experience!
                    </p>
                  </div>
                ) : (
                  reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="bg-card p-6 md:p-8 shadow-soft"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-serif text-lg text-foreground mb-1">
                            {review.name}
                          </h3>
                          <StarRating rating={review.rating} readonly size="sm" />
                        </div>
                        <span className="font-sans text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="font-sans text-muted-foreground leading-relaxed">
                        "{review.comment}"
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Reviews;
