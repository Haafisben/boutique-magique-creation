
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { mockProducts } from "@/mock/products";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
  
  // Filter and sort products
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesStock = stockFilter === "all" || 
      (stockFilter === "in-stock" && (product.stock ?? 0) > 0) ||
      (stockFilter === "low-stock" && (product.stock ?? 0) > 0 && (product.stock ?? 0) <= 5) ||
      (stockFilter === "out-of-stock" && (product.stock ?? 0) === 0);
    
    return matchesSearch && matchesCategory && matchesStock;
  }).sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "stock-asc":
        return (a.stock ?? 0) - (b.stock ?? 0);
      case "stock-desc":
        return (b.stock ?? 0) - (a.stock ?? 0);
      default:
        return a.name.localeCompare(b.name);
    }
  });
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Produits</h1>
            <p className="text-gray-500 mt-1">Gérez votre catalogue de produits</p>
          </div>
          <Button asChild className="sm:self-end">
            <Link to="/admin/products/add">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un produit
            </Link>
          </Button>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {/* Category filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="men">Hommes</SelectItem>
                <SelectItem value="women">Femmes</SelectItem>
                <SelectItem value="accessories">Accessoires</SelectItem>
                <SelectItem value="home">Maison</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Stock filter */}
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les produits</SelectItem>
                <SelectItem value="in-stock">En stock</SelectItem>
                <SelectItem value="low-stock">Stock faible</SelectItem>
                <SelectItem value="out-of-stock">Épuisé</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Nom (A-Z)</SelectItem>
                <SelectItem value="name-desc">Nom (Z-A)</SelectItem>
                <SelectItem value="price-asc">Prix (croissant)</SelectItem>
                <SelectItem value="price-desc">Prix (décroissant)</SelectItem>
                <SelectItem value="stock-asc">Stock (croissant)</SelectItem>
                <SelectItem value="stock-desc">Stock (décroissant)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    <Checkbox id="select-all" />
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Image</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Nom</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Catégorie</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Prix</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Stock</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Statut</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Checkbox id={`select-${product.id}`} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-200">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3 capitalize">
                      {product.category === "men" ? "Hommes" :
                       product.category === "women" ? "Femmes" :
                       product.category === "accessories" ? "Accessoires" : "Maison"}
                    </td>
                    <td className="px-4 py-3">{formatPrice(product.price)}</td>
                    <td className="px-4 py-3">{product.stock ?? 0}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        (product.stock ?? 0) > 5 ? "bg-green-100 text-green-800" :
                        (product.stock ?? 0) > 0 ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {(product.stock ?? 0) > 5 ? "En stock" :
                         (product.stock ?? 0) > 0 ? "Stock faible" :
                         "Épuisé"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button asChild variant="ghost" size="icon">
                          <Link to={`/admin/products/edit/${product.id}`}>
                            <Edit2 className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucun produit trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
