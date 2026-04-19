import { motion } from "framer-motion";
import { Clock, Globe, Crown, Factory, ScrollText, Pickaxe, MapPin } from "lucide-react";

// Importing images directly to resolve correctly on Github Pages 
import preMughalImg from "@/assets/history/pre_mughal.png";
import mughalEraImg from "@/assets/history/mughal_era.png";
import colonialEraImg from "@/assets/history/colonial_era.png";
import modernRevivalImg from "@/assets/history/modern_revival.png";

const timelineEvents = [
  {
    id: 1,
    title: "The Earliest Looms",
    period: "Pre-Mughal Roots",
    description: "Centuries before the introduction of intricate pile carpets, India boasted a vibrant and highly refined tradition of flat-woven rugs known as dhurries. Traditionally woven by women in royal pavilions and everyday households alike, these ubiquitous floor coverings were made of cotton, wool, jute, or silk. Embellished with simple geometric shapes or local tribal motifs, they served diverse roles—ranging from daily floor bedding and prayer mats to insulation against cold earthen floors. Even then, the rich heritage of dyeing techniques using indigo, madder, and turmeric was already taking shape.",
    image: preMughalImg,
    icon: <Clock className="w-6 h-6 text-[#8B5A2B]" />,
  },
  {
    id: 2,
    title: "The Golden Age of Weaving",
    period: "16th Century - The Mughal Era",
    description: "The grand transformation of Indian carpet weaving began when the Mughal Emperor Babur lamented the absence of the luxurious Persian carpets he adored. In the 16th century, his grandson, Emperor Akbar, invited master weavers from royal Persian courts to train Indian artisans in the art of pile weaving. What began as an imitation of Persian motifs quickly evolved into an unmistakable 'Mughal Style'. This distinct aesthetic married Persian structural techniques with quintessential Indian sensibilities—showcasing ultra-realistic botanical gardens, lush florals, intricate wildlife scenes, and dynamic portrayals of imperial court life. The royal workshops in Agra, Lahore, and Delhi became epicenters of opulence.",
    image: mughalEraImg,
    icon: <Crown className="w-6 h-6 text-[#DAA520]" />,
  },
  {
    id: 3,
    title: "Jail Carpets & Craft Revival",
    period: "17th - 18th Century",
    description: "To meet the empire’s insatiable demand for extravagant textiles and carpets, Emperor Akbar implemented a unique system: introducing carpet weaving into imperial prisons. High-quality raw materials alongside expert master craftsmen were brought to jails across North India to rehabilitate prisoners through art. Surprisingly, these 'jail carpets' achieved unprecedented mastery. By the 18th century, some of the most sought-after and complex carpets in the world were being woven in Agra and Yervada jails. They featured impossibly tight knots and mesmerizing designs that are still highly coveted items at auctions today.",
    image: mughalEraImg, 
    icon: <Pickaxe className="w-6 h-6 text-[#5b3b1c]" />,
  },
  {
    id: 4,
    title: "Global Recognition & Trade",
    period: "19th Century - Colonial Influence",
    description: "During the British Colonial period, the demand for Indian handwoven carpets surged throughout Europe and America. While native patronage slightly dwindled due to the fall of the Mughal Empire, the Great Exhibition of 1851 in London placed Indian craftsmanship squarely on the global map. European merchants flocked to India, establishing massive commercial weaving firms in towns like Mirzapur, Amritsar, and Srinagar. Indian weavers began adapting their traditional palettes to suit Western tastes, creating a lucrative export market but risking the loss of their most ancient esoteric patterns.",
    image: colonialEraImg,
    icon: <Globe className="w-6 h-6 text-[#4682B4]" />,
  },
  {
    id: 5,
    title: "The Heart of Indian Carpets",
    period: "20th Century - Regional Hubs",
    description: "Following India's independence, a conscious effort was made to decentralize and preserve the craft. Specific regions blossomed into legendary hubs of specialized weaving. Bhadohi, known today as the 'Carpet City of India', became the undisputed capital of the hand-knotted rug industry, responsible for millions of square feet exported annually. Meanwhile, Kashmir perfected the ultra-luxurious art of pure silk-on-silk weaving with 300+ knots per square inch. Jaipur and Panipat also rose to prominence, blending ancient dhurrie techniques with high-end wool tufting.",
    image: modernRevivalImg, 
    icon: <MapPin className="w-6 h-6 text-[#8c1c13]" />,
  },
  {
    id: 6,
    title: "Sustainable & Modern Innovation",
    period: "21st Century - Modern Revival",
    description: "Today, India commands a dominant share of the world’s handmade carpet export market. The contemporary industry honors its roots while dynamically innovating. Emphasizing sustainability, eco-friendly organic dyes, bamboo silk, and recycled materials are frequently used alongside premium wool. Government initiatives and powerful artisan networks ensure that the millions of weavers—many of them women from deep rural communities—receive fair wages and global recognition. Modern Indian rugs now proudly fuse centuries of ancestral soul with avant-garde global aesthetics.",
    image: modernRevivalImg,
    icon: <Factory className="w-6 h-6 text-[#2E8B57]" />,
  }
];

const History = () => {
  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-neutral-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The Journey of the Handwoven Canvas
        </motion.h1>
        <motion.p 
          className="max-w-3xl mx-auto text-lg text-neutral-600 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore the centuries-long chronicle of Indian rug making. From ancient royal courts and forgotten looms to becoming the world's most celebrated artisan hub—every knot weaves a story of resilience, luxury, and breathtaking artistry.
        </motion.p>
      </div>

      {/* Timeline Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-neutral-300 to-transparent transform md:-translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-16 md:space-y-32">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Timeline Node Center Circle */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-14 h-14 bg-white rounded-full border-[5px] border-neutral-100 shadow-md items-center justify-center z-10 hover:border-gold transition-colors duration-300">
                  {event.icon}
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 md:px-12 mb-8 md:mb-0 relative z-20">
                  <motion.div 
                    className="bg-white p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-neutral-100"
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="mb-4">
                      <span className="inline-block px-4 py-1.5 bg-neutral-100 text-neutral-700 text-xs font-bold uppercase tracking-widest rounded-full">
                        {event.period}
                      </span>
                    </div>
                    <h3 className="text-3xl font-serif text-neutral-900 mb-5">{event.title}</h3>
                    <p className="text-neutral-600 font-sans text-base leading-loose">
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Image Side */}
                <div className="w-full md:w-1/2 md:px-12 relative group z-20">
                  <motion.div
                    className="relative rounded-2xl overflow-hidden shadow-lg h-full"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="aspect-[4/3] w-full relative">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-neutral-900 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-500"></div>
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
