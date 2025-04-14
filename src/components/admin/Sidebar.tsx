
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Box,
  Home,
  Package,
  Settings,
  ShoppingBag,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Commandes", href: "/admin/orders", icon: ShoppingBag },
    { name: "Produits", href: "/admin/products", icon: Package },
    { name: "Catégories", href: "/admin/categories", icon: Box },
    { name: "Clients", href: "/admin/customers", icon: Users },
    { name: "Statistiques", href: "/admin/analytics", icon: BarChart3 },
    { name: "Paramètres", href: "/admin/settings", icon: Settings },
  ];
  
  return (
    <div className={cn(
      "flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <Link to="/" className="text-lg font-bold text-shop-600">
            Boutique Magique
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  isActive 
                    ? "bg-shop-50 text-shop-600" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-shop-600" : "text-gray-400 group-hover:text-gray-500"
                  )}
                  aria-hidden="true"
                />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <Link
          to="/"
          className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        >
          <ShoppingBag
            className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          {!collapsed && <span>Retour à la boutique</span>}
        </Link>
      </div>
    </div>
  );
}
