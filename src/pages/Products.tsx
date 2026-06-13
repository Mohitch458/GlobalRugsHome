import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown, X, Filter } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { getProducts, getCategories, type Product, type Category } from '@/lib/storage';

// Assets for collage
import weavingImg from '@/assets/weaving_loom.png';
import drapedImg from '@/assets/rug_draped.png';
import heroImg from '@/assets/hero-rug.jpg';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'best-selling', label: 'Best Selling' },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
    setCategories(getCategories());
  }, []);

  // Sync state when URL params change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Handle category selection
  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
    setIsMobileFiltersOpen(false);
    
    // Scroll to products section
    const productsSection = document.getElementById('products-grid');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== 'All' && selectedCategory !== 'Entire Collection') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p => 
          p.name.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'best-selling':
        result.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        break;
      case 'featured':
      default:
        // Sort featured first, then fallback to newest
        result.sort((a, b) => {
          if (a.featured === b.featured) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
          return a.featured ? -1 : 1;
        });
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Extract unique category names for the sidebar/filters
  const categoryNames = ['All', ...Array.from(new Set(categories.map(c => c.name).filter(n => n !== 'Entire Collection')))];

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      {/* Collage Hero Section */}
      <section className="pt-16 pb-24 relative overflow-hidden bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="container-luxury max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex justify-center relative z-30 pointer-events-none mb-[-40px] sm:mb-[-60px] md:mb-[-100px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center bg-background/60 backdrop-blur-xl px-6 py-6 sm:px-12 md:px-20 sm:py-8 md:py-10 rounded-[2rem] sm:rounded-[3rem] border border-border shadow-[0_8px_32px_rgba(0,0,0,0.04)] mx-4"
            >
              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[110px] text-foreground leading-none tracking-tight">
                Rugs
              </h1>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[90px] text-foreground/80 -mt-2 md:-mt-6 mb-0 italic">
                Collection
              </h2>
            </motion.div>
          </div>

          <div className="flex justify-center items-start gap-4 lg:gap-8 w-full max-w-5xl mx-auto mb-8 md:mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden md:block w-[30%] lg:w-[28%] mt-[250px] lg:mt-[300px] shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-500"
            >
              <img src={drapedImg} alt="Draped rug" className="w-full h-[350px] lg:h-[400px] object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full md:w-[45%] lg:w-[40%] relative z-20 shadow-2xl rounded-2xl md:rounded-[2rem] overflow-hidden group mx-4 md:mx-0"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent z-10 pointer-events-none" />
              <img src={weavingImg} alt="Weaving loom" className="w-full h-[280px] sm:h-[450px] md:h-[600px] lg:h-[650px] object-cover group-hover:scale-105 transition-transform duration-1000" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden md:block w-[28%] lg:w-[25%] mt-[350px] lg:mt-[400px] shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-500"
            >
              <img src={heroImg} alt="Rug texture" className="w-full h-[280px] lg:h-[350px] object-cover object-left hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>

          <div className="flex justify-center relative z-30 -mt-8 sm:-mt-12 md:-mt-20 mx-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-center max-w-2xl px-6 py-6 sm:px-8 sm:py-10 bg-background/80 backdrop-blur-xl border border-border shadow-soft rounded-3xl"
            >
              <span className="font-serif text-xl sm:text-2xl text-gold block mb-3 italic">Speak your style</span>
              <p className="font-sans text-xs sm:text-sm md:text-base text-foreground/80 leading-relaxed">
                Explore our massive new collection of over 80 premium handcrafted rugs. Filter by category, price, or search for your perfect match below.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      <section id="products-grid" className="py-16 bg-white border-t border-neutral-100">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-neutral-200">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search rugs by name, style, or color..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="md:hidden flex items-center gap-2 px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-lg font-sans text-sm font-medium"
              >
                <Filter size={18} />
                Filters
              </button>

              {/* Sorting */}
              <div className="relative flex items-center gap-3">
                <span className="hidden lg:block font-sans text-sm text-neutral-500 uppercase tracking-widest font-medium">Sort By:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-neutral-50 border border-neutral-200 pl-4 pr-10 py-3.5 rounded-lg font-sans text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer min-w-[200px]"
                  >
                    {SORT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" size={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32">
                <h3 className="font-serif text-2xl text-neutral-900 mb-6">Categories</h3>
                <ul className="space-y-2">
                  {categoryNames.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => handleCategorySelect(cat)}
                        className={`w-full text-left py-2.5 px-4 rounded-md transition-all duration-300 font-sans text-sm ${
                          selectedCategory === cat 
                            ? 'bg-neutral-900 text-white font-medium' 
                            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
              {isMobileFiltersOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  />
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className="fixed inset-y-0 left-0 w-[280px] bg-white z-50 shadow-2xl lg:hidden flex flex-col"
                  >
                    <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                      <h3 className="font-serif text-2xl">Filters</h3>
                      <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 -mr-2 text-neutral-500 hover:text-black">
                        <X size={24} />
                      </button>
                    </div>
                    <div className="p-6 overflow-y-auto flex-1">
                      <h4 className="font-sans text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-4">Categories</h4>
                      <ul className="space-y-1">
                        {categoryNames.map((cat) => (
                          <li key={cat}>
                            <button
                              onClick={() => handleCategorySelect(cat)}
                              className={`w-full text-left py-3 px-4 rounded-md transition-all duration-300 font-sans text-sm ${
                                selectedCategory === cat 
                                  ? 'bg-neutral-900 text-white font-medium' 
                                  : 'text-neutral-600 hover:bg-neutral-50'
                              }`}
                            >
                              {cat}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Products Grid Container */}
            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center">
                <span className="font-sans text-sm text-neutral-500">
                  Showing <strong className="text-neutral-900">{filteredProducts.length}</strong> products
                </span>
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-gold rounded-full font-sans text-xs uppercase tracking-wider font-medium">
                    {selectedCategory}
                    <button onClick={() => handleCategorySelect('All')} className="hover:text-black transition-colors ml-1">
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-32 bg-neutral-50 rounded-2xl border border-neutral-100"
                >
                  <Search className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                  <h3 className="font-serif text-2xl text-neutral-900 mb-2">
                    No products found
                  </h3>
                  <p className="font-sans text-neutral-500 mb-6">
                    We couldn't find any rugs matching your current filters.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      handleCategorySelect('All');
                    }}
                    className="btn-luxury-primary"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Products;
