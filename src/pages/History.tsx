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
    description: [
      "Centuries before the introduction of intricate pile carpets, the Indian subcontinent boasted a vibrant and highly refined tradition of flat-woven rugs known as dhurries. These ubiquitous floor coverings were integral to both daily life and royal comfort, meticulously crafted from indigenous materials like cotton, wool, jute, and occasionally silk.",
      "Traditionally woven by women in everyday households and royal pavilions alike, these pieces were embellished with simple yet striking geometric shapes and regional tribal motifs. They served diverse functional roles—ranging from daily floor bedding and prayer mats to providing essential insulation against cold earthen floors.",
      "Even in these early stages, a rich heritage of natural dyeing techniques was taking shape. Artisans mastered the use of local botanical extracts, utilizing indigo for deep blues, madder root for rich reds, and turmeric for vibrant yellows, laying the foundational color palettes that would define Indian textiles for centuries."
    ],
    image: preMughalImg,
    icon: <Clock className="w-6 h-6 text-[#8B5A2B]" />,
  },
  {
    id: 2,
    title: "The Golden Age of Weaving",
    period: "16th Century - The Mughal Era",
    description: [
      "The grand transformation of Indian carpet weaving began in the early 16th century when the Mughal Emperor Babur, longing for the comforts of his homeland, lamented the absence of the luxurious Persian carpets he adored. However, it was his grandson, Emperor Akbar the Great, who truly revolutionized the craft.",
      "Akbar invited master weavers from royal Persian courts to establish imperial workshops in India, tasked with training local artisans in the complex art of pile weaving. What began as an imitation of Persian motifs quickly evolved into an unmistakable 'Mughal Style', marrying Persian structural techniques with quintessential Indian sensibilities.",
      "This new aesthetic showcased ultra-realistic botanical gardens, lush exotic florals, intricate wildlife hunting scenes, and dynamic portrayals of imperial court life. The royal workshops situated in Agra, Lahore, and Delhi soon became epicenters of global opulence, producing masterpieces characterized by their exceptional knot density and brilliant, jewel-toned colors."
    ],
    image: mughalEraImg,
    icon: <Crown className="w-6 h-6 text-[#DAA520]" />,
  },
  {
    id: 3,
    title: "Jail Carpets & Craft Revival",
    period: "17th - 18th Century",
    description: [
      "To meet the empire’s insatiable and growing demand for extravagant textiles, Emperor Akbar implemented a highly unique and unprecedented system: introducing fine carpet weaving into imperial prisons. High-quality raw materials alongside expert master craftsmen were brought to jails across North India to rehabilitate prisoners through dedicated artistic labor.",
      "Surprisingly, these 'jail carpets' achieved unprecedented mastery and became famous in their own right. Removed from commercial pressures, the captive artisans had the time to focus entirely on perfection. By the 18th century, some of the most sought-after and complex carpets in the world were being woven in the Agra and Yervada jails.",
      "These carpets featured impossibly tight knots, immense durability, and mesmerizing, complex designs. Today, antique Indian jail carpets from this era remain highly coveted items at prestigious international auctions, celebrated for their unique history and flawless execution."
    ],
    image: mughalEraImg, 
    icon: <Pickaxe className="w-6 h-6 text-[#5b3b1c]" />,
  },
  {
    id: 4,
    title: "Global Recognition & Trade",
    period: "19th Century - Colonial Influence",
    description: [
      "During the British Colonial period, the dynamic of the Indian carpet industry shifted significantly. While native royal patronage slightly dwindled due to the gradual fall of the Mughal Empire, the international demand for Indian handwoven carpets surged throughout Europe and America.",
      "The turning point came during the Great Exhibition of 1851 in London, which placed Indian craftsmanship squarely on the global map. Attendees were captivated by the intricate designs and superior quality of Indian textiles. Consequently, European merchants flocked to the subcontinent, establishing massive commercial weaving firms in strategic towns like Mirzapur, Amritsar, and Srinagar.",
      "To cater to this booming export market, Indian weavers began adapting their traditional vibrant palettes to suit more muted Western tastes. While this commercialization created a lucrative global trade network, it also sparked a delicate balancing act to prevent the loss of their most ancient and esoteric regional patterns."
    ],
    image: colonialEraImg,
    icon: <Globe className="w-6 h-6 text-[#4682B4]" />,
  },
  {
    id: 5,
    title: "The Heart of Indian Carpets",
    period: "20th Century - Regional Hubs",
    description: [
      "Following India's independence in 1947, a conscious and structured effort was made by the new government to decentralize, protect, and preserve the country's rich weaving craft. Specific regions across the country blossomed into legendary hubs of specialized weaving techniques.",
      "Bhadohi and Mirzapur in Uttar Pradesh emerged as the undisputed capital of the hand-knotted rug industry, eventually earning the title 'Carpet City of India' and becoming responsible for millions of square feet exported annually worldwide. Meanwhile, artisans in Kashmir perfected the ultra-luxurious art of pure silk-on-silk weaving, achieving astounding densities of 300 to over 1000 knots per square inch.",
      "Simultaneously, cities like Jaipur and Panipat rose to prominence by blending ancient dhurrie flat-weave techniques with high-end wool tufting, ensuring that India offered an unparalleled diversity of rug styles, textures, and price points to the global market."
    ],
    image: modernRevivalImg, 
    icon: <MapPin className="w-6 h-6 text-[#8c1c13]" />,
  },
  {
    id: 6,
    title: "Sustainable & Modern Innovation",
    period: "21st Century - Modern Revival",
    description: [
      "Today, India confidently commands a dominant share of the world’s handmade carpet export market. The contemporary industry is characterized by its ability to deeply honor its ancestral roots while dynamically innovating to meet modern environmental and aesthetic standards.",
      "There is a massive, industry-wide emphasis on sustainability. Eco-friendly organic dyes, renewable bamboo silk, undyed natural wools, and recycled PET yarns are now frequently utilized alongside premium New Zealand wool. This shift ensures the craft remains environmentally responsible.",
      "Furthermore, government initiatives and powerful artisan networks like Care & Fair ensure that the millions of weavers—many of whom are women working from deep rural communities—receive fair wages, healthcare, and global recognition. Modern Indian rugs proudly fuse centuries of ancestral soul with avant-garde, conscientious global design."
    ],
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
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The Journey of the Handwoven Canvas
        </motion.h1>
        <motion.p 
          className="max-w-3xl mx-auto text-lg text-neutral-600 leading-relaxed font-sans"
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
                    <div className="text-neutral-600 font-sans text-base leading-loose space-y-4">
                      {event.description.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
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
