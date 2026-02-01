// LocalStorage utilities for products and reviews

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  images: string[];
  amazonLink: string;
  category: string;
  material: string;
  size: string;
  featured: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AdminUser {
  username: string;
  password: string;
}

const PRODUCTS_KEY = 'luxuryrugs_products';
const REVIEWS_KEY = 'luxuryrugs_reviews';
const ADMIN_KEY = 'luxuryrugs_admin';
const AUTH_KEY = 'luxuryrugs_auth';

// Default admin credentials
const DEFAULT_ADMIN: AdminUser = {
  username: 'admin',
  password: 'luxury2024'
};

// Initialize admin if not exists
export const initializeAdmin = (): void => {
  const existing = localStorage.getItem(ADMIN_KEY);
  if (!existing) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(DEFAULT_ADMIN));
  }
};

// Admin authentication
export const loginAdmin = (username: string, password: string): boolean => {
  const admin = JSON.parse(localStorage.getItem(ADMIN_KEY) || JSON.stringify(DEFAULT_ADMIN));
  if (admin.username === username && admin.password === password) {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
};

export const logoutAdmin = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};

// Products CRUD
export const getProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getProduct = (id: string): Product | undefined => {
  const products = getProducts();
  return products.find(p => p.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return getProducts().filter(p => p.featured);
};

export const addProduct = (product: Omit<Product, 'id' | 'createdAt'>): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  products.push(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>): Product | null => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  products[index] = { ...products[index], ...updates };
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return products[index];
};

export const deleteProduct = (id: string): boolean => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length === products.length) return false;
  
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
  return true;
};

// Reviews CRUD
export const getReviews = (): Review[] => {
  const data = localStorage.getItem(REVIEWS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addReview = (review: Omit<Review, 'id' | 'createdAt'>): Review => {
  const reviews = getReviews();
  const newReview: Review = {
    ...review,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  reviews.unshift(newReview);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  return newReview;
};

// Initialize with sample data if empty
export const initializeSampleData = (): void => {
  const products = getProducts();
  if (products.length === 0) {
    const sampleProducts: Omit<Product, 'id' | 'createdAt'>[] = [
      {
        name: "Persian Heritage Collection",
        description: "A masterpiece of traditional Persian craftsmanship, this hand-knotted rug features an intricate medallion design passed down through generations. Each knot is meticulously tied by skilled artisans using premium wool and natural dyes. The warm ivory background beautifully contrasts with rich gold and terracotta accents, creating a timeless piece that anchors any space with elegance.",
        shortDescription: "Hand-knotted Persian wool rug with traditional medallion design",
        price: 2499,
        images: ["/src/assets/rug-1.jpg"],
        amazonLink: "https://www.amazon.com",
        category: "Traditional",
        material: "100% Hand-spun Wool",
        size: "8' x 10'",
        featured: true
      },
      {
        name: "Golden Bloom Silk Rug",
        description: "Inspired by the delicate beauty of Persian gardens, this luxurious silk rug showcases an exquisite floral pattern. Hand-woven by master craftsmen using the finest mulberry silk, it boasts an extraordinary sheen that dances with light. The subtle gold and ivory color palette ensures versatility while maintaining an air of sophistication.",
        shortDescription: "Handwoven silk rug with delicate floral motifs",
        price: 3899,
        images: ["/src/assets/rug-2.jpg"],
        amazonLink: "https://www.amazon.com",
        category: "Silk",
        material: "100% Mulberry Silk",
        size: "6' x 9'",
        featured: true
      },
      {
        name: "Tribal Artisan Collection",
        description: "This bold geometric rug celebrates the rich heritage of tribal weaving traditions. Hand-knotted by nomadic artisans, each piece tells a unique story through its symbols and patterns. The charcoal border frames vibrant terracotta and cream motifs, creating a striking focal point for modern and traditional interiors alike.",
        shortDescription: "Hand-knotted tribal rug with bold geometric patterns",
        price: 1899,
        images: ["/src/assets/rug-3.jpg"],
        amazonLink: "https://www.amazon.com",
        category: "Tribal",
        material: "Hand-spun Wool",
        size: "5' x 8'",
        featured: true
      },
      {
        name: "Contemporary Organic Rug",
        description: "A modern interpretation of organic forms, this contemporary rug features soft, flowing shapes in a sophisticated neutral palette. Hand-tufted using premium New Zealand wool, it offers exceptional softness underfoot while adding visual interest to minimalist spaces.",
        shortDescription: "Modern hand-tufted rug with organic abstract design",
        price: 1299,
        images: ["/src/assets/rug-4.jpg"],
        amazonLink: "https://www.amazon.com",
        category: "Contemporary",
        material: "New Zealand Wool",
        size: "6' x 9'",
        featured: false
      },
      {
        name: "Vintage Kilim Heritage",
        description: "This flat-weave Kilim rug embodies centuries of weaving tradition. Handcrafted using time-honored techniques, it features classic geometric patterns in rich burgundy and navy against a cream background. Its reversible design and durable construction make it a practical yet beautiful addition to any home.",
        shortDescription: "Traditional handwoven Kilim with vintage patterns",
        price: 899,
        images: ["/src/assets/rug-5.jpg"],
        amazonLink: "https://www.amazon.com",
        category: "Kilim",
        material: "Hand-spun Wool",
        size: "4' x 6'",
        featured: false
      },
      {
        name: "Botanical Garden Collection",
        description: "Drawing inspiration from nature's elegance, this hand-tufted rug features a sophisticated botanical pattern. Cascading leaves in ivory gracefully adorn a sage green background, bringing the serenity of a garden into your home. The plush pile offers exceptional comfort and timeless beauty.",
        shortDescription: "Hand-tufted botanical pattern in sage and ivory",
        price: 1599,
        images: ["/src/assets/rug-6.jpg"],
        amazonLink: "https://www.amazon.com",
        category: "Botanical",
        material: "Premium Wool Blend",
        size: "8' x 10'",
        featured: true
      }
    ];

    sampleProducts.forEach(product => addProduct(product));
  }

  const reviews = getReviews();
  if (reviews.length === 0) {
    const sampleReviews: Omit<Review, 'id' | 'createdAt'>[] = [
      {
        name: "Sarah Mitchell",
        rating: 5,
        comment: "Absolutely stunning craftsmanship! The Persian Heritage rug transformed our living room into an elegant sanctuary. The quality is exceptional."
      },
      {
        name: "James Anderson",
        rating: 5,
        comment: "We've been searching for the perfect rug for months. This collection exceeded our expectations. The colors are even more beautiful in person."
      },
      {
        name: "Emily Chen",
        rating: 4,
        comment: "Beautiful rug with excellent quality. Shipping was fast and the rug was packaged very carefully. Would definitely recommend."
      }
    ];

    sampleReviews.forEach(review => addReview(review));
  }

  initializeAdmin();
};
