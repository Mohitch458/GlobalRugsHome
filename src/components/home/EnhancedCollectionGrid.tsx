import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useContactLink } from '@/hooks/useContactLink';

// ─── Type ─────────────────────────────────────────────────────────────────────
interface Category {
  id: string;
  name: string;
  image: string;
  images?: string[];
  description?: string;
  path: string;
  className?: string;
  accent?: string;
}

// ─── Curated multi-image map per category keyword ─────────────────────────────
const CATEGORY_IMAGE_MAP: Record<string, string[]> = {
  persian: [
    'https://i.pinimg.com/736x/7d/a9/88/7da988b98f4978bc75624bafad90b54a.jpg',
    'https://i.pinimg.com/736x/7d/a9/88/7da988b98f4978bc75624bafad90b54a.jpg',
    'https://i.pinimg.com/736x/7d/a9/88/7da988b98f4978bc75624bafad90b54a.jpg',
    'https://i.pinimg.com/736x/7d/a9/88/7da988b98f4978bc75624bafad90b54a.jpg',
  ],
  floral: [
    'https://i.pinimg.com/736x/79/97/66/79976631573eae51e343f879efd418db.jpg',
    'https://i.pinimg.com/736x/79/97/66/79976631573eae51e343f879efd418db.jpg',
    'https://i.pinimg.com/736x/79/97/66/79976631573eae51e343f879efd418db.jpg',
    'https://i.pinimg.com/736x/79/97/66/79976631573eae51e343f879efd418db.jpg',
  ],
  animal: [
    'https://i.pinimg.com/736x/04/db/08/04db089fd6024258ba72616aef36454d.jpg',
    'https://i.pinimg.com/736x/04/db/08/04db089fd6024258ba72616aef36454d.jpg',
    'https://i.pinimg.com/736x/04/db/08/04db089fd6024258ba72616aef36454d.jpg',
    'https://i.pinimg.com/736x/04/db/08/04db089fd6024258ba72616aef36454d.jpg',
  ],
  modern: [
    'https://i.pinimg.com/736x/43/08/5c/43085c74a9425a10f957ca288afddfe9.jpg',
    'https://i.pinimg.com/736x/43/08/5c/43085c74a9425a10f957ca288afddfe9.jpg',
    'https://i.pinimg.com/736x/43/08/5c/43085c74a9425a10f957ca288afddfe9.jpg',
    'https://i.pinimg.com/736x/43/08/5c/43085c74a9425a10f957ca288afddfe9.jpg',
  ],
  traditional: [
    'https://i.pinimg.com/736x/55/56/0d/55560d12b64e24f4319ae399efe371e7.jpg',
    'https://i.pinimg.com/736x/55/56/0d/55560d12b64e24f4319ae399efe371e7.jpg',
    'https://i.pinimg.com/736x/55/56/0d/55560d12b64e24f4319ae399efe371e7.jpg',
    'https://i.pinimg.com/736x/55/56/0d/55560d12b64e24f4319ae399efe371e7.jpg',
  ],
  geometric: [
    'https://i.pinimg.com/736x/ad/f9/3d/adf93d7342ae7700df9fc8408c4c59fa.jpg',
    'https://i.pinimg.com/736x/ad/f9/3d/adf93d7342ae7700df9fc8408c4c59fa.jpg',
    'https://i.pinimg.com/736x/ad/f9/3d/adf93d7342ae7700df9fc8408c4c59fa.jpg',
    'https://i.pinimg.com/736x/ad/f9/3d/adf93d7342ae7700df9fc8408c4c59fa.jpg',
  ],
  abstract: [
    'https://i.pinimg.com/736x/ae/41/b7/ae41b76515e42a8bb1294e71bcc2c166.jpg',
    'https://i.pinimg.com/736x/ae/41/b7/ae41b76515e42a8bb1294e71bcc2c166.jpg',
    'https://i.pinimg.com/736x/ae/41/b7/ae41b76515e42a8bb1294e71bcc2c166.jpg',
    'https://i.pinimg.com/736x/ae/41/b7/ae41b76515e42a8bb1294e71bcc2c166.jpg',
  ],
  vintage: [
    'https://images.unsplash.com/photo-1558882224-dda166733046?w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    'https://images.unsplash.com/photo-1588688402435-0ab27d424b58?w=800&q=80',
    'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80',
  ],
  bohemian: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    'https://images.unsplash.com/photo-1558882224-dda166733046?w=800&q=80',
    'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80',
    'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80',
  ],
  natural: [
    'https://i.pinimg.com/736x/c2/ac/a1/c2aca1802010f07b8481bf24dcaeb410.jpg',
    'https://i.pinimg.com/736x/c2/ac/a1/c2aca1802010f07b8481bf24dcaeb410.jpg',
    'https://i.pinimg.com/736x/c2/ac/a1/c2aca1802010f07b8481bf24dcaeb410.jpg',
    'https://i.pinimg.com/736x/c2/ac/a1/c2aca1802010f07b8481bf24dcaeb410.jpg',
  ],
  fiber: [
    'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80',
    'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=800&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  ],
  handcrafted: [
    'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1588688402435-0ab27d424b58?w=800&q=80',
    'https://images.unsplash.com/photo-1558882224-dda166733046?w=800&q=80',
  ],
  luxury: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1588688402435-0ab27d424b58?w=800&q=80',
    'https://images.unsplash.com/photo-1558882224-dda166733046?w=800&q=80',
    'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80',
  ],
  contemporary: [
    'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=800&q=80',
    'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
    'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80',
  ],
  kids: [
    'https://i.pinimg.com/736x/2d/37/d0/2d37d01a8bef3ad549a4d52ec37c3f18.jpg',
    'https://i.pinimg.com/736x/2d/37/d0/2d37d01a8bef3ad549a4d52ec37c3f18.jpg',
    'https://i.pinimg.com/736x/2d/37/d0/2d37d01a8bef3ad549a4d52ec37c3f18.jpg',
    'https://i.pinimg.com/736x/2d/37/d0/2d37d01a8bef3ad549a4d52ec37c3f18.jpg',
  ],
  irregular: [
    'https://i.pinimg.com/736x/b0/0d/82/b00d823b255fed3454bfeaba402b84a3.jpg',
    'https://i.pinimg.com/736x/b0/0d/82/b00d823b255fed3454bfeaba402b84a3.jpg',
    'https://i.pinimg.com/736x/b0/0d/82/b00d823b255fed3454bfeaba402b84a3.jpg',
    'https://i.pinimg.com/736x/b0/0d/82/b00d823b255fed3454bfeaba402b84a3.jpg',
  ],
  round: [
    'https://i.pinimg.com/736x/f5/dc/fd/f5dcfd302742a6c84139f2397184cf25.jpg',
    'https://i.pinimg.com/736x/f5/dc/fd/f5dcfd302742a6c84139f2397184cf25.jpg',
    'https://i.pinimg.com/736x/f5/dc/fd/f5dcfd302742a6c84139f2397184cf25.jpg',
    'https://i.pinimg.com/736x/f5/dc/fd/f5dcfd302742a6c84139f2397184cf25.jpg',
  ],
  runner: [
    'https://i.pinimg.com/736x/7d/a9/88/7da988b98f4978bc75624bafad90b54a.jpg',
    'https://i.pinimg.com/736x/7d/a9/88/7da988b98f4978bc75624bafad90b54a.jpg',
    'https://i.pinimg.com/736x/7d/a9/88/7da988b98f4978bc75624bafad90b54a.jpg',
    'https://i.pinimg.com/736x/7d/a9/88/7da988b98f4978bc75624bafad90b54a.jpg',
  ],
  oushak: [
    'https://i.pinimg.com/736x/10/6b/d9/106bd96857f25a3e466ff36ff26b7ed8.jpg',
    'https://i.pinimg.com/736x/10/6b/d9/106bd96857f25a3e466ff36ff26b7ed8.jpg',
    'https://i.pinimg.com/736x/10/6b/d9/106bd96857f25a3e466ff36ff26b7ed8.jpg',
    'https://i.pinimg.com/736x/10/6b/d9/106bd96857f25a3e466ff36ff26b7ed8.jpg',
  ],
};

// ─── resolve multi-images for a category ─────────────────────────────────────
function resolveImages(col: Category): string[] {
  if (col.images && col.images.length > 0) return [col.images[0]];

  const nameLower = col.name.toLowerCase();
  for (const [key, imgs] of Object.entries(CATEGORY_IMAGE_MAP)) {
    if (nameLower.includes(key) && imgs.length > 0) return [imgs[0]];
  }
  
  return [col.image];
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
interface LightboxProps {
  images: string[];
  startIndex: number;
  categoryName: string;
  onClose: () => void;
}

const Lightbox = ({ images, startIndex, categoryName, onClose }: LightboxProps) => {
  const [current, setCurrent] = useState(startIndex);

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
  const next = () => setCurrent(i => (i + 1) % images.length);

  // keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all z-10"
        onClick={onClose}
      >
        <X size={24} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-sans tracking-widest">
        {current + 1} / {images.length}
      </div>

      {/* Category name */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-serif text-xl tracking-wide">
        {categoryName}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          className="absolute left-4 md:left-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10"
          onClick={e => { e.stopPropagation(); prev(); }}
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* Image */}
      <div className="w-full max-w-4xl mx-16 md:mx-24" onClick={e => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`${categoryName} ${current + 1}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
          />
        </AnimatePresence>

        {/* Dot thumbnails */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-12 h-8 rounded overflow-hidden transition-all duration-300 border-2 ${i === current ? 'border-amber-400 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          className="absolute right-4 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10"
          onClick={e => { e.stopPropagation(); next(); }}
        >
          <ChevronRight size={28} />
        </button>
      )}
    </motion.div>
  );
};

// ─── Collection Card ───────────────────────────────────────────────────────────
interface CollectionCardProps {
  col: Category;
  index: number;
  onOpenLightbox: (images: string[], idx: number, name: string) => void;
}

const CollectionCard = ({ col, index, onOpenLightbox }: CollectionCardProps) => {
  const { handleContactClick } = useContactLink();
  const images = resolveImages(col);
  const [activeImg, setActiveImg] = useState(0);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // auto-slide on hover, pause otherwise
  const startSlide = useCallback(() => {
    if (images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActiveImg(prev => (prev + 1) % images.length);
    }, 1800);
  }, [images.length]);

  const stopSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (hovered) startSlide();
    else stopSlide();
    return stopSlide;
  }, [hovered, startSlide, stopSlide]);

  // Auto cycle slowly when not hovered
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      if (!hovered) setActiveImg(prev => (prev + 1) % images.length);
    }, 4500 + index * 600);
    return () => clearInterval(timer);
  }, [hovered, images.length, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: 'easeOut' }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500 ${col.className || ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => handleContactClick(e, col.name)}
    >
      {/* ── Image gallery ── */}
      <div className="aspect-[4/5] relative bg-neutral-900 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={activeImg}
            src={images[activeImg]}
            alt={`${col.name} ${activeImg + 1}`}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: hovered ? 1.05 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent z-10 transition-opacity duration-500 group-hover:from-black/85" />

        {/* Thumbnail strip — revealed on hover */}
        {images.length > 1 && (
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.3 }}
            className="absolute top-3 right-3 z-20 flex flex-col gap-1.5"
          >
            {images.map((img, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setActiveImg(i); }}
                className={`w-10 h-7 rounded overflow-hidden border-2 transition-all duration-200 ${i === activeImg ? 'border-amber-400 scale-110' : 'border-white/40 opacity-70 hover:opacity-100'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </motion.div>
        )}

        {/* Zoom icon */}
        <button
          onClick={e => { e.stopPropagation(); onOpenLightbox(images, activeImg, col.name); }}
          className="absolute top-3 left-3 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
          title="Open gallery"
        >
          <ZoomIn size={16} />
        </button>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setActiveImg(i); }}
                className={`rounded-full transition-all duration-300 ${i === activeImg ? 'w-4 h-1.5 bg-amber-400' : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        )}

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-5">
          <h3 className="font-serif text-white text-lg sm:text-xl leading-tight mb-1">{col.name}</h3>
          {col.description && (
            <p className="font-sans text-white/70 text-xs leading-relaxed line-clamp-2 hidden sm:block">{col.description}</p>
          )}
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1.5 mt-2 text-xs font-sans font-medium"
            style={{ color: col.accent || '#D4AF37' }}
          >
            Enquire now <ChevronRight size={12} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Export ──────────────────────────────────────────────────────────────
interface EnhancedCollectionGridProps {
  categories: Category[];
}

const EnhancedCollectionGrid = ({ categories }: EnhancedCollectionGridProps) => {
  const [lightbox, setLightbox] = useState<{ images: string[]; idx: number; name: string } | null>(null);

  const openLightbox = (images: string[], idx: number, name: string) => setLightbox({ images, idx, name });
  const closeLightbox = () => setLightbox(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {categories.map((cat, index) => (
          <CollectionCard
            key={cat.id || cat.name}
            col={cat}
            index={index}
            onOpenLightbox={openLightbox}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            startIndex={lightbox.idx}
            categoryName={lightbox.name}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedCollectionGrid;
