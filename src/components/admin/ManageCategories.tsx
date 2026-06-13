import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, X, Save, Image as ImageIcon } from 'lucide-react';
import { getCategories, addCategory, updateCategory, deleteCategory, type Category } from '@/lib/storage';
import { getImageUrl } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const ManageCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    path: '',
    image: '',
    className: 'md:col-span-1 lg:col-span-1'
  });

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      path: '',
      image: '',
      className: 'md:col-span-1 lg:col-span-1'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
      toast({ title: "Category updated successfully!" });
    } else {
      addCategory(formData);
      toast({ title: "Category added successfully!" });
    }

    setCategories(getCategories());
    setIsAdding(false);
    setEditingCategory(null);
    resetForm();
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      path: category.path,
      image: category.image,
      className: category.className || 'md:col-span-1 lg:col-span-1'
    });
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
      setCategories(getCategories());
      toast({ title: "Category deleted successfully!" });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingCategory(null);
    resetForm();
  };

  return (
    <div className="space-y-8">
      {/* Add/Edit Form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background p-8 shadow-soft"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl text-foreground">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>
            <button onClick={handleCancel} className="text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                  Category Name *
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
                  Path/Link *
                </label>
                <input
                  type="text"
                  value={formData.path}
                  onChange={(e) => setFormData(prev => ({ ...prev, path: e.target.value }))}
                  required
                  placeholder="/products?category=Floral"
                  className="w-full px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                Image URL *
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                required
                className="w-full px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
                Grid Span (Tailwind Classes)
              </label>
              <input
                type="text"
                value={formData.className}
                onChange={(e) => setFormData(prev => ({ ...prev, className: e.target.value }))}
                placeholder="md:col-span-1 lg:col-span-1"
                className="w-full px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <p className="text-xs text-muted-foreground mt-1">For wide cards use: md:col-span-2 lg:col-span-2</p>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn-luxury-gold flex items-center gap-2">
                <Save size={18} />
                {editingCategory ? 'Update Category' : 'Save Category'}
              </button>
              <button type="button" onClick={handleCancel} className="btn-luxury-outline">
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Header and Add Button */}
      {!isAdding && (
        <div className="flex justify-end">
          <button
            onClick={() => setIsAdding(true)}
            className="btn-luxury-gold flex items-center gap-2"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-background shadow-soft">
        <div className="p-6 border-b border-border">
          <h2 className="font-serif text-xl text-foreground">
            All Categories ({categories.length})
          </h2>
        </div>

        {categories.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-sans text-muted-foreground">
              No categories yet. Add your first category to get started.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {categories.map((category) => (
              <div key={category.id} className="p-6 flex items-center gap-6">
                <div className="w-20 h-20 bg-muted flex-shrink-0 overflow-hidden">
                  {category.image ? (
                    <img
                      src={getImageUrl(category.image)}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <ImageIcon size={24} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg text-foreground truncate mb-1">
                    {category.name}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground truncate">
                    Path: {category.path}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-3 bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
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
  );
};

export default ManageCategories;
