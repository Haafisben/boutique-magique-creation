
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, 
  Search, 
  ShoppingBag, 
  User, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  const categories = [
    { name: "Nouveautés", href: "/products/new" },
    { name: "Femmes", href: "/products/women" },
    { name: "Hommes", href: "/products/men" },
    { name: "Accessoires", href: "/products/accessories" },
    { name: "Promos", href: "/products/sale" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-shop-600">
              Boutique Magique
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="text-sm font-medium text-gray-700 hover:text-shop-600 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Ouvrir le menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          {/* Right navigation items */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/login" className="w-full">Se connecter</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register" className="w-full">Créer un compte</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin/dashboard" className="w-full">Administration</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-shop-600 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-shop-600 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center px-4">
                  <Link to="/login" className="text-base font-medium text-gray-700 hover:text-shop-600 block px-3 py-2">
                    Se connecter
                  </Link>
                </div>
                <div className="flex items-center px-4">
                  <Link to="/cart" className="text-base font-medium text-gray-700 hover:text-shop-600 block px-3 py-2">
                    Panier
                    {cartCount > 0 && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-shop-600 px-2 py-0.5 text-xs font-medium text-white">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>
                <div className="flex items-center px-4">
                  <Link to="/admin/dashboard" className="text-base font-medium text-gray-700 hover:text-shop-600 block px-3 py-2">
                    Administration
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
