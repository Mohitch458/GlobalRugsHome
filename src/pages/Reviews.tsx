import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, X } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import { getReviews, addReview, getAuthenticatedUser, type Review, type User } from '@/lib/storage';
import { getImageUrl } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [media, setMedia] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setReviews(getReviews());
    setUser(getAuthenticatedUser());
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setMedia(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      } else {
        toast({ title: "Invalid file type", description: "Only images are allowed.", variant: "destructive" });
      }
    });
  };

  const removeMedia = (index: number) => {
    setMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({ title: "Authentication required", variant: "destructive" });
      return;
    }
    
    if (!comment.trim()) {
      toast({
        title: "Please write a comment",
        variant: "destructive"
      });
      return;
    }

    const newReview = addReview({ 
      name: user.name, 
      userId: user.id,
      rating, 
      comment: comment.trim(),
      media 
    });
    
    setReviews([newReview, ...reviews]);
    setRating(5);
    setComment('');
    setMedia([]);
    
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
                  We'd love to hear about your GlobalRugsHome experience.
                </p>
                
                {user ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
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

                    <div>
                      <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                        Add Photos (Optional)
                      </label>
                      
                      {media.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {media.map((img, i) => (
                            <div key={i} className="relative w-16 h-16 rounded overflow-hidden group">
                              <img src={getImageUrl(img)} alt="upload" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removeMedia(i)}
                                className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 border border-border rounded font-sans text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <ImageIcon size={16} />
                        Upload Photos
                      </button>
                    </div>
                    
                    <button type="submit" className="btn-luxury-primary w-full">
                      Submit Review
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6 border border-border bg-muted/30">
                    <p className="font-sans text-sm text-muted-foreground mb-4">
                      Please log in to submit a review.
                    </p>
                    <Link to="/auth" state={{ mode: 'login' }} className="btn-luxury-gold inline-block">
                      Sign In to Review
                    </Link>
                  </div>
                )}
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
                      <p className="font-sans text-muted-foreground leading-relaxed mb-4">
                        "{review.comment}"
                      </p>
                      
                      {review.media && review.media.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {review.media.map((img, i) => (
                            <div key={i} className="w-20 h-20 rounded overflow-hidden">
                              <img src={getImageUrl(img)} alt={`Review photo ${i+1}`} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
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
