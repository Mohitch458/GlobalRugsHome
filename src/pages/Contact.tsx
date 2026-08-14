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
            className="lg:col-span-1 flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Email Card */}
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

            {/* Amazon Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-100 text-center">
              <div className="w-12 h-12 bg-[#FDF9F3] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10.813 11.968c.157.083.36.074.5-.05l.005.005a90 90 0 0 1 1.623-1.405c.173-.143.143-.372.006-.563l-.125-.17c-.345-.465-.673-.906-.673-1.791v-3.3l.001-.335c.008-1.265.014-2.421-.933-3.305C10.404.274 9.06 0 8.03 0 6.017 0 3.77.75 3.296 3.24c-.047.264.143.404.316.443l2.054.22c.19-.009.33-.196.366-.387.176-.857.896-1.271 1.703-1.271.435 0 .929.16 1.188.55.264.39.26.91.257 1.376v.432q-.3.033-.621.065c-1.113.114-2.397.246-3.36.67C3.873 5.91 2.94 7.08 2.94 8.798c0 2.2 1.387 3.298 3.168 3.298 1.506 0 2.328-.354 3.489-1.54l.167.246c.274.405.456.675 1.047 1.166ZM6.03 8.431C6.03 6.627 7.647 6.3 9.177 6.3v.57c.001.776.002 1.434-.396 2.133-.336.595-.87.961-1.465.961-.812 0-1.286-.619-1.286-1.533M.435 12.174c2.629 1.603 6.698 4.084 13.183.997.28-.116.475.078.199.431C13.538 13.96 11.312 16 7.57 16 3.832 16 .968 13.446.094 12.386c-.24-.275.036-.4.199-.299z"/><path d="M13.828 11.943c.567-.07 1.468-.027 1.645.204.135.176-.004.966-.233 1.533-.23.563-.572.961-.762 1.115s-.333.094-.23-.137c.105-.23.684-1.663.455-1.963-.213-.278-1.177-.177-1.625-.13l-.09.009q-.142.013-.233.024c-.193.021-.245.027-.274-.032-.074-.209.779-.556 1.347-.623"/></svg>
              </div>
              <h3 className="font-serif text-xl mb-2 text-[#2A2A2A]">Amazon Store</h3>
              <p className="text-neutral-500 font-sans text-sm mb-4">Shop our collections directly on Amazon.</p>
              <a href="https://www.amazon.com/s?ie=UTF8&marketplaceID=ATVPDKIKX0DER&me=A2Y0L8AKTLT1LI" target="_blank" rel="noopener noreferrer" className="font-sans font-semibold text-[#D4AF37] hover:text-[#2A2A2A] transition-colors">
                Visit Amazon Store &rarr;
              </a>
            </div>

            {/* Etsy Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-100 text-center">
              <div className="w-12 h-12 bg-[#FDF9F3] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                <svg width="20" height="20" viewBox="0 0 384 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M384 348c-1.8 10.8-13.8 110-15.5 132-117.9-4.3-219.9-4.7-368.5 0v-25.5c45.5-8.9 60.6-8 61-35.3 1.8-72.3 3.5-244.1 0-322-1-28.5-12.1-26.8-61-36v-25.5c73.9 2.4 255.9 8.6 363-3.8-3.5 38.3-7.8 126.5-7.8 126.5H332C320.9 115.7 313.2 68 277.3 68h-137c-10.3 0-10.8 3.5-10.8 9.8V241.5c58 .5 88.5-2.5 88.5-2.5 29.8-1 27.6-8.5 40.8-65.3h25.8c-4.4 101.4-3.9 61.8-1.8 160.3H257c-9.2-40.1-9.1-61-39.5-61.5 0 0-21.5-2-88-2v139c0 26 14.3 38.3 44.3 38.3H263c63.6 0 66.6-25 98.8-99.8H384z"/></svg>
              </div>
              <h3 className="font-serif text-xl mb-2 text-[#2A2A2A]">Etsy Shop</h3>
              <p className="text-neutral-500 font-sans text-sm mb-4">Browse our custom handmade rugs on Etsy.</p>
              <a href="https://globalrughome.etsy.com" target="_blank" rel="noopener noreferrer" className="font-sans font-semibold text-[#D4AF37] hover:text-[#2A2A2A] transition-colors">
                Visit Etsy Shop &rarr;
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
