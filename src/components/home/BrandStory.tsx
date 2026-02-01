import { motion } from 'framer-motion';

const BrandStory = () => {
  return (
    <section className="section-padding bg-gradient-warm">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="font-sans text-xs tracking-luxury uppercase text-gold mb-4 block">
              Our Heritage
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
              A Legacy of 
              <span className="block italic text-warm-brown">Master Craftsmanship</span>
            </h2>
            <div className="gold-line mb-8" />
            <div className="space-y-5 font-sans text-muted-foreground leading-relaxed">
              <p>
                For nearly four decades, GlobalRugHomes has been the destination for discerning 
                collectors seeking the world's finest handcrafted rugs. Our journey began 
                in a small workshop, where a passion for textile artistry ignited a 
                commitment to preserving ancient weaving traditions.
              </p>
              <p>
                Each rug in our collection represents countless hours of meticulous 
                craftsmanship. From the initial design to the final knot, our artisans 
                pour their expertise and devotion into every piece, creating heirlooms 
                meant to be treasured for generations.
              </p>
              <p>
                We source only the finest materials—hand-spun wool from highland sheep, 
                silk from heritage farms, and natural dyes extracted from plants and 
                minerals. This dedication to quality ensures each rug possesses 
                unparalleled beauty and durability.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { number: '38+', label: 'Years of Excellence' },
              { number: '10K+', label: 'Rugs Curated' },
              { number: '50+', label: 'Master Artisans' },
              { number: '30+', label: 'Countries Served' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-8 text-center shadow-soft"
              >
                <span className="font-serif text-4xl md:text-5xl text-gold block mb-2">
                  {stat.number}
                </span>
                <span className="font-sans text-sm text-muted-foreground tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
