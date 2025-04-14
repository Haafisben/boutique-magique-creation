
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product, mockProducts } from "@/mock/products";
import { Trash2, Plus, Minus } from "lucide-react";

interface CartItem {
  product: Product;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: mockProducts[0], quantity: 1 },
    { product: mockProducts[2], quantity: 2 },
  ]);
  
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  const removeItem = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };
  
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount10") {
      setDiscount(10);
      setPromoApplied(true);
    } else {
      setDiscount(0);
      setPromoApplied(false);
      alert("Code promo invalide. Veuillez réessayer.");
    }
  };
  
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );
  
  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 100 ? 0 : 5.99;
  const total = subtotal - discountAmount + shipping;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Panier</h1>
          
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h2 className="text-xl font-medium text-gray-900 mb-2">Votre panier est vide</h2>
              <p className="text-gray-500 mb-6">Découvrez nos produits et ajoutez-les à votre panier</p>
              <Button asChild>
                <Link to="/products">Continuer mes achats</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flow-root">
                    <ul className="divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <li key={item.product.id} className="py-6 flex">
                          <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-center object-cover"
                            />
                          </div>

                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm font-medium text-gray-900">
                                  <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                                </h3>
                                <p className="ml-4 text-sm font-medium text-gray-900">
                                  {new Intl.NumberFormat('fr-FR', {
                                    style: 'currency',
                                    currency: 'EUR'
                                  }).format(item.product.price * item.quantity)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">Prix unitaire: {
                                new Intl.NumberFormat('fr-FR', {
                                  style: 'currency',
                                  currency: 'EUR'
                                }).format(item.product.price)
                              }</p>
                            </div>
                            <div className="flex-1 flex items-end justify-between">
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  className="p-1 rounded-md text-gray-400 hover:text-gray-500"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="mx-2 text-gray-900">{item.quantity}</span>
                                <button
                                  type="button"
                                  className="p-1 rounded-md text-gray-400 hover:text-gray-500"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              <button
                                type="button"
                                className="text-red-500 hover:text-red-600 flex items-center"
                                onClick={() => removeItem(item.product.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                <span className="text-sm">Supprimer</span>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Récapitulatif de la commande</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Sous-total</p>
                      <p className="text-gray-900 font-medium">
                        {new Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'EUR'
                        }).format(subtotal)}
                      </p>
                    </div>
                    
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <p>Réduction ({discount}%)</p>
                        <p>-{new Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'EUR'
                        }).format(discountAmount)}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <p className="text-gray-600">Frais de livraison</p>
                      <p className="text-gray-900">
                        {shipping === 0 
                          ? "Gratuit" 
                          : new Intl.NumberFormat('fr-FR', {
                              style: 'currency',
                              currency: 'EUR'
                            }).format(shipping)
                        }
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 flex justify-between font-medium">
                      <p className="text-gray-900">Total</p>
                      <p className="text-shop-600">
                        {new Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'EUR'
                        }).format(total)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex gap-2 mb-4">
                      <Input
                        type="text"
                        placeholder="Code promo"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button 
                        variant="outline" 
                        className="whitespace-nowrap"
                        onClick={applyPromoCode}
                      >
                        Appliquer
                      </Button>
                    </div>
                    
                    <Button className="w-full" size="lg">
                      Passer la commande
                    </Button>
                    
                    <div className="mt-4 text-center">
                      <Link 
                        to="/products" 
                        className="text-sm text-gray-500 hover:text-shop-600"
                      >
                        Continuer mes achats
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
