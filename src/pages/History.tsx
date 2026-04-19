import { motion } from "framer-motion";
import { Clock, Globe, Crown, Factory } from "lucide-react";

const timelineEvents = [
  {
    id: 1,
    title: "Pre-Mughal Roots",
    period: "Ancient India",
    description: "Before the introduction of pile carpets, India had a long-standing tradition of flat-woven rugs known as dhurries. Traditionally woven by women within households, these were essential for domestic use, serving as floor coverings, meditation mats, and bedding.",
    image: "/images/history/pre_mughal.png",
    icon: <Clock className="w-6 h-6 text-[#8B5A2B]" />,
  },
  {
    id: 2,
    title: "The Mughal Era",
    period: "16th Century",
    description: "Emperor Akbar formalized the carpet-weaving industry by bringing skilled weavers from Persia. A distinct 'Mughal style' emerged, blending Persian techniques with Indian floral motifs and pictorial themes, turning carpets into highly coveted luxury artifacts.",
    image: "/images/history/mughal_era.png",
    icon: <Crown className="w-6 h-6 text-[#DAA520]" />,
  },
  {
    id: 3,
    title: "Colonial Influence",
    period: "18th - 19th Century",
    description: "During the British colonial period, Indian carpets gained significant international exposure. Exhibitions like the 1851 London Exhibition put Indian weaving on the global map, expanding production centers to meet the high Western demand.",
    image: "/images/history/colonial_era.png",
    icon: <Globe className="w-6 h-6 text-[#4682B4]" />,
  },
  {
    id: 4,
    title: "Modern Revival",
    period: "1947 - Present",
    description: "Following independence, the Indian government revived traditional craftsmanship through extensive training. Today, India is one of the world's largest exporters of handmade carpets, creating a stunning fusion of cultural heritage and modern design.",
    image: "/images/history/modern_revival.png",
    icon: <Factory className="w-6 h-6 text-[#2E8B57]" />,
  }
];

const History = () => {
  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <motion.h1 
          className="text-4xl md:text-5xl font-playfair font-bold text-neutral-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The Evolution of Handwoven Art
        </motion.h1>
        <motion.p 
          className="max-w-2xl mx-auto text-lg text-neutral-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover the rich heritage and centuries-old tradition behind India's world-renowned carpet making industry.
        </motion.p>
      </div>

      {/* Timeline Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-neutral-200 transform md:-translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-12 md:space-y-24">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Timeline Node */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-neutral-100 shadow-md items-center justify-center z-10">
                  {event.icon}
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 md:px-12 mb-8 md:mb-0">
                  <motion.div 
                    className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-neutral-100"
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 text-sm font-semibold rounded-full mb-4">
                      {event.period}
                    </span>
                    <h3 className="text-2xl font-playfair font-bold text-neutral-900 mb-3">{event.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Image Side */}
                <div className="w-full md:w-1/2 md:px-12 relative group">
                  <motion.div
                    className="relative rounded-2xl overflow-hidden shadow-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="aspect-w-16 aspect-h-10 w-full relative">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
