
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
  isOnSale?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const { id, name, price, oldPrice, image, isNew, isOnSale } = product;
  
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };
  
  return (
    <div className={`group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white ${className}`}>
      {/* Product image with badges */}
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 relative overflow-hidden">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <span className="inline-flex items-center rounded-full bg-shop-600 px-2 py-1 text-xs font-medium text-white">
              Nouveau
            </span>
          )}
          {isOnSale && (
            <span className="inline-flex items-center rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
              Promo
            </span>
          )}
        </div>
        
        {/* Quick add to cart */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button className="w-full bg-white text-shop-600 hover:bg-shop-50 border border-shop-600">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Ajouter au panier
          </Button>
        </div>
      </div>
      
      {/* Product info */}
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <Link to={`/product/${id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {name}
          </Link>
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-900">
            {isOnSale && oldPrice && (
              <span className="text-gray-500 line-through mr-2 text-xs">
                {formatPrice(oldPrice)}
              </span>
            )}
            <span className={isOnSale ? "text-red-600 font-semibold" : ""}>
              {formatPrice(price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
