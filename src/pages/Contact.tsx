import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-neutral-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 mb-6"
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
            Whether you have a question about our collections, need help with a custom order, or simply want to connect—we are here to assist you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          
          {/* Contact Information Cards */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                <Mail size={24} />
              </div>
              <h3 className="font-serif text-xl mb-2 text-neutral-900">Email Us</h3>
              <p className="text-neutral-500 font-sans text-sm mb-4">Our friendly team is here to help.</p>
              <a href="mailto:hello@globalrugshome.com" className="font-sans font-medium text-neutral-900 hover:text-gold transition-colors">
                hello@globalrugshome.com
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                <MessageCircle size={24} />
              </div>
              <h3 className="font-serif text-xl mb-2 text-neutral-900">WhatsApp</h3>
              <p className="text-neutral-500 font-sans text-sm mb-4">Chat with our design experts.</p>
              <a href="#" className="font-sans font-medium text-neutral-900 hover:text-gold transition-colors">
                Click here to chat
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                <MapPin size={24} />
              </div>
              <h3 className="font-serif text-xl mb-2 text-neutral-900">Studio</h3>
              <p className="text-neutral-500 font-sans text-sm mb-4">Come say hello at our showroom.</p>
              <p className="font-sans font-medium text-neutral-900">
                123 Artisan Avenue<br />New York, NY 10001
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-neutral-100"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="font-serif text-3xl mb-8 text-neutral-900">Send us a message</h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 font-sans">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors font-sans"
                    placeholder="Jane"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 font-sans">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors font-sans"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 font-sans">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors font-sans"
                  placeholder="jane@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 font-sans">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors font-sans"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 font-sans">Message</label>
                <textarea 
                  id="message" 
                  rows={6}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors font-sans resize-none"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full btn-luxury-primary py-4 flex items-center justify-center gap-2 text-base mt-4"
              >
                Send Message
                <Send size={18} />
              </button>
              
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
