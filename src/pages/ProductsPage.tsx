
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { mockProducts, getByCategory, getBestsellers, getNewArrivals, getOnSale } from "@/mock/products";
import { FilterIcon, ChevronDown, ChevronUp, X } from "lucide-react";

const ProductsPage = () => {
  const location = useLocation();
  const { category } = useParams();
  
  const [products, setProducts] = useState(mockProducts);
  const [title, setTitle] = useState("Tous les produits");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const categories = [
    { id: "women", name: "Femmes" },
    { id: "men", name: "Hommes" },
    { id: "accessories", name: "Accessoires" },
    { id: "home", name: "Maison" },
  ];
  
  // Load the correct products based on the route
  useEffect(() => {
    const path = location.pathname;
    
    if (path.includes("/new")) {
      setProducts(getNewArrivals());
      setTitle("Nouveautés");
    } else if (path.includes("/bestsellers")) {
      setProducts(getBestsellers());
      setTitle("Meilleures ventes");
    } else if (path.includes("/sale")) {
      setProducts(getOnSale());
      setTitle("Promotions");
    } else if (category) {
      const categoryProducts = getByCategory(category);
      setProducts(categoryProducts);
      
      // Set title based on category
      const categoryInfo = categories.find(c => c.id === category);
      if (categoryInfo) {
        setTitle(categoryInfo.name);
      }
    } else {
      setProducts(mockProducts);
      setTitle("Tous les produits");
    }
  }, [location, category]);
  
  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesPrice && matchesCategory;
  });
  
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 lg:hidden"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <FilterIcon className="h-4 w-4" />
              Filtres
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="w-full lg:w-64 hidden lg:block">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-4">Prix</h3>
                  <Slider
                    defaultValue={[0, 250]}
                    max={250}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-500">{priceRange[0]}€</span>
                    <span className="text-sm text-gray-500">{priceRange[1]}€</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-medium text-gray-900 mb-4">Catégories</h3>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <div key={cat.id} className="flex items-center">
                        <Checkbox 
                          id={`category-${cat.id}`} 
                          checked={selectedCategories.includes(cat.id)}
                          onCheckedChange={() => toggleCategory(cat.id)}
                        />
                        <Label 
                          htmlFor={`category-${cat.id}`}
                          className="ml-2 text-sm text-gray-600"
                        >
                          {cat.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Filters - Mobile */}
            {filtersOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
                <div className="bg-white h-full w-80 p-6 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium">Filtres</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setFiltersOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-4">Prix</h3>
                    <Slider
                      defaultValue={[0, 250]}
                      max={250}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">{priceRange[0]}€</span>
                      <span className="text-sm text-gray-500">{priceRange[1]}€</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-medium text-gray-900 mb-4">Catégories</h3>
                    <div className="space-y-3">
                      {categories.map((cat) => (
                        <div key={cat.id} className="flex items-center">
                          <Checkbox 
                            id={`mobile-category-${cat.id}`} 
                            checked={selectedCategories.includes(cat.id)}
                            onCheckedChange={() => toggleCategory(cat.id)}
                          />
                          <Label 
                            htmlFor={`mobile-category-${cat.id}`}
                            className="ml-2 text-sm text-gray-600"
                          >
                            {cat.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button 
                      className="w-full"
                      onClick={() => setFiltersOpen(false)}
                    >
                      Appliquer les filtres
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Products */}
            <div className="flex-1">
              <ProductGrid 
                products={filteredProducts} 
                columns={3}
                showLoadMore={true}
              />
              
              {filteredProducts.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
                  <p className="text-gray-500">Essayez de modifier vos filtres pour voir plus de produits.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
