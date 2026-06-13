// LocalStorage utilities for products and reviews

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  images: string[];
  amazonLink: string;
  category: string;
  material: string;
  size: string;
  featured: boolean;
  colorPalette?: string[];
  stockStatus?: string;
  rating?: number;
  reviewsCount?: number;
  showPricing?: boolean;
  enablePurchase?: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  media?: string[];
  userId?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  path: string;
  className: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  provider?: 'local' | 'google' | 'facebook';
  picture?: string;
  createdAt: string;
}

export interface AdminUser {
  username: string;
  password: string;
}

const PRODUCTS_KEY = 'luxuryrugs_products_v5';
const REVIEWS_KEY = 'luxuryrugs_reviews';
const CATEGORIES_KEY = 'luxuryrugs_categories';
const ADMIN_KEY = 'luxuryrugs_admin';
const AUTH_KEY = 'luxuryrugs_auth';
const USERS_KEY = 'luxuryrugs_users';
const USER_AUTH_KEY = 'luxuryrugs_user_auth';

// Default admin credentials
const DEFAULT_ADMIN: AdminUser = {
  username: 'admin',
  password: 'GlobalRugsHome@2026'
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

// General User Authentication
export const getUsers = (): User[] => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const registerUser = (name: string, email: string, password: string): User | null => {
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return null; // User already exists
  }

  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return newUser;
};

export const loginUser = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(USER_AUTH_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword as User;
  }
  return null;
};

export interface SocialProfile {
  name: string;
  email: string;
  picture?: string;
  provider: 'google' | 'facebook';
}

export const loginSocialUser = (profile: SocialProfile): User => {
  const users = getUsers();
  let user = users.find(u => u.email === profile.email);

  if (user) {
    // User exists, update social fields if missing
    if (!user.provider || user.provider === 'local') {
      user.provider = profile.provider;
      user.picture = profile.picture || user.picture;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  } else {
    // Create new user
    user = {
      id: Date.now().toString(),
      name: profile.name,
      email: profile.email,
      provider: profile.provider,
      picture: profile.picture,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  // Log in the user
  const { password: _, ...userWithoutPassword } = user;
  localStorage.setItem(USER_AUTH_KEY, JSON.stringify(userWithoutPassword));
  return userWithoutPassword as User;
};

export const logoutUser = (): void => {
  localStorage.removeItem(USER_AUTH_KEY);
};

export const getAuthenticatedUser = (): User | null => {
  const userStr = localStorage.getItem(USER_AUTH_KEY);
  return userStr ? JSON.parse(userStr) : null;
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
export const getCategories = (): Category[] => {
  const data = localStorage.getItem(CATEGORIES_KEY);
  return data ? JSON.parse(data) : [];
};

export const addCategory = (category: Omit<Category, 'id' | 'createdAt'>): Category => {
  const categories = getCategories();
  const newCategory: Category = {
    ...category,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
    createdAt: new Date().toISOString()
  };
  categories.push(newCategory);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  return newCategory;
};

export const updateCategory = (id: string, updates: Partial<Category>): Category | null => {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === id);
  if (index === -1) return null;

  categories[index] = { ...categories[index], ...updates };
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  return categories[index];
};

export const deleteCategory = (id: string): boolean => {
  const categories = getCategories();
  const filtered = categories.filter(c => c.id !== id);
  if (filtered.length === categories.length) return false;

  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(filtered));
  return true;
};

import { SEED_PRODUCTS } from './seedData';

// Initialize with sample data if empty
export const initializeSampleData = (): void => {
  const products = getProducts();
  if (products.length === 0) {
    SEED_PRODUCTS.forEach(product => addProduct(product));
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

  const categories = getCategories();
  if (categories.length === 0) {
    const sampleCategories: Omit<Category, 'id' | 'createdAt'>[] = [
      { name: "Entire Collection", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", path: "/products", className: "md:col-span-2 lg:col-span-2 md:row-span-2" },
      { name: "Floral Rugs", image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", path: "/products?category=Floral Rugs", className: "md:col-span-1 lg:col-span-1" },
      { name: "Animal Rugs", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", path: "/products?category=Animal Rugs", className: "md:col-span-1 lg:col-span-1" },
      { name: "Modern Rugs", image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", path: "/products?category=Modern Rugs", className: "md:col-span-1 lg:col-span-1" },
      { name: "Traditional Rugs", image: "https://images.unsplash.com/photo-1588688402435-0ab27d424b58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", path: "/products?category=Traditional Rugs", className: "md:col-span-1 lg:col-span-1" },
      { name: "Irregular & Artistic Rugs", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", path: "/products?category=Irregular %26 Artistic Rugs", className: "md:col-span-1 lg:col-span-1" },
      { name: "Natural Fiber Rugs", image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", path: "/products?category=Natural Fiber Rugs", className: "md:col-span-2 lg:col-span-2" },
      { name: "Geometric Rugs", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", path: "/products?category=Geometric Rugs", className: "md:col-span-1 lg:col-span-1" },
      { name: "Abstract Rugs", image: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", path: "/products?category=Abstract Rugs", className: "md:col-span-1 lg:col-span-1" },
      { name: "Contemporary Rugs", image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", path: "/products?category=Contemporary Rugs", className: "md:col-span-1 lg:col-span-1" },
      { name: "Vintage & Distressed Rugs", image: "https://images.unsplash.com/photo-1558882224-dda166733046?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", path: "/products?category=Vintage %26 Distressed Rugs", className: "md:col-span-1 lg:col-span-1" },
      { name: "Bohemian Rugs", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", path: "/products?category=Bohemian Rugs", className: "md:col-span-1 lg:col-span-1" },
      { name: "Kids & Nursery Rugs", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", path: "/products?category=Kids %26 Nursery Rugs", className: "md:col-span-1 lg:col-span-1" },
      { name: "Handcrafted Rugs", image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", path: "/products?category=Handcrafted Rugs", className: "md:col-span-1 lg:col-span-1" },
      { name: "Luxury Designer Rugs", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", path: "/products?category=Luxury Designer Rugs", className: "md:col-span-2 lg:col-span-2" }
    ];

    sampleCategories.forEach(category => addCategory(category));
  }

  initializeAdmin();
};
