import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getContactSettings } from '@/lib/storage';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    const emailSubject = subject || `Inquiry from ${firstName} ${lastName}`;
    const body = `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`;

    const settings = getContactSettings();
    const mailtoLink = `mailto:${settings.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      form.reset();

      toast({
        title: "Message Prepared",
        description: "Your email client has been opened with your message details. Please send the email to complete the process.",
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-5xl md:text-6xl font-serif font-bold text-[#2A2A2A] mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            className="max-w-2xl mx-auto text-lg text-neutral-600 font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Whether you have a question about our collections, need help with a custom
            order, or simply want to connect—we are here to assist you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          
          {/* Contact Information Cards */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-100 text-center">
              <div className="w-12 h-12 bg-[#FDF9F3] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                <Mail size={20} />
              </div>
              <h3 className="font-serif text-xl mb-2 text-[#2A2A2A]">Email Us</h3>
              <p className="text-neutral-500 font-sans text-sm mb-4">Our friendly team is here to help.</p>
              <a href={`mailto:${getContactSettings().email}`} className="font-sans font-semibold text-[#2A2A2A] hover:text-[#D4AF37] transition-colors">
                {getContactSettings().email}
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2 bg-white p-8 md:p-12 rounded-xl shadow-sm border border-neutral-100"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="font-serif text-3xl mb-8 text-[#2A2A2A]">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-600 font-sans">First Name</label>
                  <input 
                    required
                    type="text" 
                    name="firstName"
                    className="w-full bg-[#FAFAFA] border border-neutral-200 rounded text-neutral-800 px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-600 font-sans">Last Name</label>
                  <input 
                    required
                    type="text" 
                    name="lastName"
                    className="w-full bg-[#FAFAFA] border border-neutral-200 rounded text-neutral-800 px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-600 font-sans">Email Address</label>
                <input 
                  required
                  type="email" 
                  name="email"
                  className="w-full bg-[#FAFAFA] border border-neutral-200 rounded text-neutral-800 px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="jane@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-600 font-sans">Subject</label>
                <input 
                  required
                  type="text" 
                  name="subject"
                  className="w-full bg-[#FAFAFA] border border-neutral-200 rounded text-neutral-800 px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="How can we help?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-600 font-sans">Message</label>
                <textarea 
                  required
                  name="message"
                  rows={5}
                  className="w-full bg-[#FAFAFA] border border-neutral-200 rounded text-neutral-800 px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#3D3A35] hover:bg-[#2A2A2A] text-white tracking-widest font-semibold uppercase text-sm py-4 rounded transition-colors flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? 'PREPARING...' : (
                  <>
                    SEND MESSAGE
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
