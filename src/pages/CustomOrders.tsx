import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Mail, Paintbrush, Ruler, Sparkles, Image as ImageIcon, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useContactLink } from '@/hooks/useContactLink';
import { getContactSettings } from '@/lib/storage';

const CustomOrders = () => {
  const { toast } = useToast();
  const { handleContactClick } = useContactLink();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const dimensions = formData.get('dimensions') as string;
    const colors = formData.get('colors') as string;
    const description = formData.get('description') as string;

    const subject = `Custom Order Request from ${fullName}`;
    let body = `Name: ${fullName}\nEmail: ${email}\n\n`;
    if (dimensions) body += `Dimensions: ${dimensions}\n`;
    if (colors) body += `Colors/Materials: ${colors}\n`;
    body += `\nDescription:\n${description}`;

    const settings = getContactSettings();
    const mailtoLink = `mailto:${settings.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedImage(null);
      form.reset();

      toast({
        title: "Request Prepared",
        description: "Your email client has been opened with your request details. Please send the email to complete the process.",
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-serif text-xl sm:text-2xl text-gold block mb-4 italic">Bring Your Vision to Life</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
            Bespoke Custom Orders
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground font-sans leading-relaxed">
            Collaborate with our master weavers to create a truly one-of-a-kind masterpiece.
            Share your inspiration, dimensions, and color palette, and we will translate your dream into a handwoven reality.
          </p>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Info Column */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card p-8 rounded-2xl border border-border shadow-soft"
            >
              <h3 className="text-2xl font-serif mb-6 text-foreground">The Custom Process</h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0 text-gold">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-foreground mb-1">1. Share Your Idea</h4>
                    <p className="text-sm text-muted-foreground font-sans">Provide us with your design inspiration, colors, and required dimensions.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0 text-gold">
                    <Paintbrush size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-foreground mb-1">2. Design Review</h4>
                    <p className="text-sm text-muted-foreground font-sans">Our artisans will create a digital render for your approval.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0 text-gold">
                    <Ruler size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-foreground mb-1">3. Weaving Begins</h4>
                    <p className="text-sm text-muted-foreground font-sans">Once approved, the intricate hand-knotting process starts.</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Form Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card p-8 md:p-10 rounded-2xl border border-border shadow-elevated"
            >
              <h2 className="text-3xl font-serif mb-8 text-foreground">Submit Your Request</h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground tracking-wide uppercase font-sans">Full Name</label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors text-foreground"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground tracking-wide uppercase font-sans">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors text-foreground"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground tracking-wide uppercase font-sans">Desired Dimensions</label>
                    <input
                      type="text"
                      name="dimensions"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors text-foreground"
                      placeholder="e.g., 8' x 10', 250x300cm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground tracking-wide uppercase font-sans">Preferred Colors/Materials</label>
                    <input
                      type="text"
                      name="colors"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors text-foreground"
                      placeholder="e.g., Indigo, Silk, Wool"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground tracking-wide uppercase font-sans">Design Description & Inspiration</label>
                  <textarea
                    required
                    name="description"
                    rows={5}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors text-foreground resize-none"
                    placeholder="Describe your vision, patterns you like, or specific details you want included..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground tracking-wide uppercase font-sans">Upload Inspiration Image (Optional)</label>
                  <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-lg bg-background hover:border-gold/50 transition-colors relative group overflow-hidden">
                    {selectedImage ? (
                      <div className="relative w-full h-48">
                        <img src={selectedImage} alt="Preview" className="w-full h-full object-contain" />
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setSelectedImage(null); }}
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur text-foreground p-1 rounded-md text-xs hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center z-10">
                        <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div className="flex text-sm text-muted-foreground">
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-gold hover:text-gold-muted focus-within:outline-none">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-luxury-primary flex items-center justify-center gap-2 mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">Processing <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /></span>
                  ) : (
                    <span className="flex items-center gap-2">Submit Request <Send size={16} /></span>
                  )}
                </button>

              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomOrders;
