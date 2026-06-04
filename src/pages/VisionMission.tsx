import { motion } from 'framer-motion';

const VisionMission = () => {
  return (
    <div className="min-h-screen bg-neutral-50 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Vision & Mission
        </motion.h1>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Vision</h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            To be the world’s most celebrated curator of timeless, handcrafted rugs –
            where each masterpiece weaves together heritage, artistry, and sustainable
            luxury, enriching homes and hearts across the globe.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Mission</h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            • Preserve and celebrate the ancient craft of hand‑tufted rug making.<br />
            • Source the finest natural fibers, embracing ethical and eco‑friendly practices.<br />
            • Offer an exclusive, curated collection that blends heritage with contemporary design.<br />
            • Deliver an unparalleled customer experience, from inspiration to installation.
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default VisionMission;
