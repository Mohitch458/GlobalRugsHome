import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, LogOut, Image as ImageIcon, X, Save } from 'lucide-react';
import { 
  isAuthenticated, 
  loginAdmin, 
  logoutAdmin, 
  getProducts, 
  addProduct, 
  deleteProduct, 
  updateProduct,
  initializeAdmin,
  type Product 
} from '@/lib/storage';
import { toast } from '@/hooks/use-toast';

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    price: '',
    category: '',
    material: '',
    size: '',
    amazonLink: '',
    images: [''],
    featured: false
  });

  useEffect(() => {
    initializeAdmin();
    setAuthenticated(isAuthenticated());
    if (isAuthenticated()) {
      setProducts(getProducts());
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(username, password)) {
      setAuthenticated(true);
      setProducts(getProducts());
      toast({ title: "Welcome back!" });
    } else {
      toast({ 
        title: "Invalid credentials", 
        description: "Please try again.",
        variant: "destructive" 
      });
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      shortDescription: '',
      description: '',
      price: '',
      category: '',
      material: '',
      size: '',
      amazonLink: '',
      images: [''],
      featured: false
    });
  };

  const handleAddImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      shortDescription: formData.shortDescription,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      category: formData.category,
      material: formData.material,
      size: formData.size,
      amazonLink: formData.amazonLink,
      images: formData.images.filter(img => img.trim() !== ''),
      featured: formData.featured
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast({ title: "Product updated successfully!" });
    } else {
      addProduct(productData);
      toast({ title: "Product added successfully!" });
    }

    setProducts(getProducts());
    setIsAddingProduct(false);
    setEditingProduct(null);
    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      shortDescription: product.shortDescription,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      material: product.material,
      size: product.size,
      amazonLink: product.amazonLink,
      images: product.images.length > 0 ? product.images : [''],
      featured: product.featured
    });
    setIsAddingProduct(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      setProducts(getProducts());
      toast({ title: "Product deleted successfully!" });
    }
  };

  const handleCancel = () => {
    setIsAddingProduct(false);
    setEditingProduct(null);
    resetForm();
  };

  if (!authenticated) {
    return (
      <main className="pt-24 pb-20 min-h-screen flex items-center justify-center bg-gradient-warm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 bg-background shadow-elevated"
        >
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-foreground mb-2">Admin Panel</h1>
            <p className="font-sans text-sm text-muted-foreground">
              Sign in to manage your products
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="btn-luxury-primary w-full">
              Sign In
            </button>
          </form>

          <p className="text-center mt-6 font-sans text-xs text-muted-foreground">
            Default: admin / luxury2024
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20 min-h-screen bg-muted">
      <div className="container-luxury">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-foreground">Product Management</h1>
            <p className="font-sans text-sm text-muted-foreground mt-1">
              Manage your rug collection
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAddingProduct(true)}
              className="btn-luxury-gold flex items-center gap-2"
            >
              <Plus size={18} />
              Add Product
            </button>
            <button
              onClick={handleLogout}
              className="p-3 bg-background border border-border hover:border-destructive hover:text-destructive transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Add/Edit Product Form */}
        {isAddingProduct && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background p-8 shadow-soft mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-foreground">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={handleCancel} className="text-muted-foreground hover:text-foreground">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                  Short Description *
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                  required
                  className="w-full px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                  Full Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    required
                    placeholder="e.g., Traditional, Silk"
                    className="w-full px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                    Material *
                  </label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                    required
                    placeholder="e.g., 100% Wool"
                    className="w-full px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                    Size *
                  </label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                    required
                    placeholder="e.g., 8' x 10'"
                    className="w-full px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                  Amazon Link *
                </label>
                <input
                  type="url"
                  value={formData.amazonLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, amazonLink: e.target.value }))}
                  required
                  placeholder="https://www.amazon.com/..."
                  className="w-full px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              {/* Images */}
              <div>
                <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                  Product Images (URLs)
                </label>
                <div className="space-y-3">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-1 flex gap-3">
                        <input
                          type="url"
                          value={image}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          placeholder="Enter image URL"
                          className="flex-1 px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                        />
                        {formData.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="p-3 bg-muted text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="mt-3 flex items-center gap-2 font-sans text-sm text-gold hover:text-accent transition-colors"
                >
                  <ImageIcon size={16} />
                  Add Another Image
                </button>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-5 h-5 accent-gold"
                />
                <label htmlFor="featured" className="font-sans text-sm text-foreground">
                  Feature this product on homepage
                </label>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-luxury-gold flex items-center gap-2">
                  <Save size={18} />
                  {editingProduct ? 'Update Product' : 'Save Product'}
                </button>
                <button type="button" onClick={handleCancel} className="btn-luxury-outline">
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Products List */}
        <div className="bg-background shadow-soft">
          <div className="p-6 border-b border-border">
            <h2 className="font-serif text-xl text-foreground">
              All Products ({products.length})
            </h2>
          </div>
          
          {products.length === 0 ? (
            <div className="p-12 text-center">
              <p className="font-sans text-muted-foreground">
                No products yet. Add your first product to get started.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {products.map((product) => (
                <div key={product.id} className="p-6 flex items-center gap-6">
                  <div className="w-20 h-20 bg-muted flex-shrink-0 overflow-hidden">
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <ImageIcon size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-serif text-lg text-foreground truncate">
                        {product.name}
                      </h3>
                      {product.featured && (
                        <span className="px-2 py-0.5 bg-gold/20 text-gold font-sans text-xs uppercase tracking-wide">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-sm text-muted-foreground truncate">
                      {product.shortDescription}
                    </p>
                    <p className="font-sans text-sm text-foreground mt-1">
                      ${product.price.toLocaleString()} · {product.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-3 bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-3 bg-muted text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Admin;
