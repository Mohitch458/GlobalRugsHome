import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Reviews from "./pages/Reviews";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import { getProducts, addProduct, updateProduct } from "@/lib/storage";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const products = getProducts();
    const selena = products.find(p => p.name === "Selena Scallop Area Rug");
    const fullDescription = `Handmade 100% Wool Area Rug in Beige/Off-White. These rugs are anti-skid and suitable for living rooms and bedrooms. They feature a non-slip natural cotton backing.

Available Sizes & Pricing:
- 2' x 3' (Rectangular): $89.99
- 2'7" x 8' (Runner): $189.99
- 2'7" x 10' (Runner): $229.99
- 2'7" x 12' (Runner): $259.99
- 2'7" x 15' (Runner): $489.99
- 2'7" x 18' (Runner): $409.99
- 3' x 5' (Rectangular): $169.99
- 4' x 6' (Rectangular): $189.99
- 5' (Round): $229.99
- 5' x 5' (Square): $229.99
- 5' x 7' (Rectangular): $269.99
- 5' x 8' (Rectangular): $269.99
- 6' (Round): $259.99
- 6' x 6' (Square): $279.99
- 6' x 8' (Rectangular): $379.99
- 6' x 9' (Rectangular): $379.99
- 7' (Round): $389.99
- 7' x 7' (Square): $389.99
- 7' x 9' (Rectangular): $459.99
- 7' x 10' (Rectangular): $479.99
- 8' (Round): $399.99
- 8' x 8' (Square): $479.99
- 8' x 11' (Rectangular): $589.99
- 9' (Round): $569.99
- 9' x 9' (Square): $689.99
- 9' x 11' (Rectangular): $699.99
- 9' x 12' (Rectangular): $699.99
- 10' (Round): $709.99
- 10' x 8' (Rectangular): $449.99
- 10' x 10' (Square): $709.99`;

    const driveImages = [
      "https://drive.google.com/uc?export=view&id=1Gy-_ekmPQvHa5uuY8UbYNJFH0Z21IO7F",
      "https://drive.google.com/uc?export=view&id=1fu5DL5RHXwrQOF9ivKJjV60L3NPTlap6",
      "https://drive.google.com/uc?export=view&id=1oWqIg_zyxKmpD3qciqLvA5OXyFt893zp",
      "https://drive.google.com/uc?export=view&id=1We0HZSVPxTSQimX4-Qapz_wiPmbzW0IC",
      "https://drive.google.com/uc?export=view&id=1TlXhAzxbLIdkisAu1lS7F_FfvEWwXhxZ",
      "https://drive.google.com/uc?export=view&id=1IWKr51Pq0p-U02iuHt-jQp4Vj25spA_0",
      "https://drive.google.com/uc?export=view&id=1bqMw6msWZ4IfoI-4c2YO_AEbEZOMLZkM"
    ];

    if (!selena) {
      addProduct({
        name: "Selena Scallop Area Rug",
        description: fullDescription,
        shortDescription: "Handmade 100% Wool Scallop Area Rug in Beige",
        price: 89.99,
        images: driveImages,
        amazonLink: "https://www.amazon.com/Selena-Scallop-Area-Rug-Anti-Skid/dp/B0FP8ZF692",
        category: "Scallop",
        material: "100% Wool with Cotton Backing",
        size: "Multiple Sizes (See Description)",
        featured: true
      });
    } else if (!selena.description.includes("2' x 3'") || (!selena.images[0]?.includes("1Gy-_ekmPQvHa5uuY8UbYNJFH0Z21IO7F"))) {
      updateProduct(selena.id, {
        description: fullDescription,
        price: 89.99,
        size: "Multiple Sizes (See description)",
        material: "100% Wool with Cotton Backing",
        shortDescription: "Handmade 100% Wool Scallop Area Rug in Beige",
        images: driveImages
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/GlobalRugsHome">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<Auth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
