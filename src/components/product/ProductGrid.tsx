
import { useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface ProductGridProps {
  title?: string;
  products: Product[];
  columns?: 2 | 3 | 4;
  showLoadMore?: boolean;
}

export default function ProductGrid({ 
  title, 
  products, 
  columns = 4,
  showLoadMore = false
}: ProductGridProps) {
  const [visibleProducts, setVisibleProducts] = useState(8);
  
  const loadMore = () => {
    setVisibleProducts(prev => prev + 8);
  };
  
  const getGridCols = () => {
    switch (columns) {
      case 2: return "grid-cols-1 sm:grid-cols-2";
      case 3: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      default: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    }
  };
  
  return (
    <div className="mx-auto max-w-7xl">
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
        </div>
      )}
      
      <div className={`grid ${getGridCols()} gap-x-4 gap-y-6`}>
        {products.slice(0, visibleProducts).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {showLoadMore && visibleProducts < products.length && (
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            onClick={loadMore}
            className="border-shop-600 text-shop-600 hover:bg-shop-50"
          >
            Voir plus
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
