
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ProductGrid from "@/components/product/ProductGrid";
import { mockProducts, getBestsellers, getNewArrivals, getOnSale } from "@/mock/products";

const Index = () => {
  const [bestsellers, setBestsellers] = useState(getBestsellers());
  const [newArrivals, setNewArrivals] = useState(getNewArrivals());
  const [onSale, setOnSale] = useState(getOnSale());

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <HeroBanner />
        
        {/* Featured Categories */}
        <FeaturedCategories />
        
        {/* New Arrivals */}
        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ProductGrid 
              title="Nouveautés" 
              products={newArrivals} 
              columns={4}
            />
          </div>
        </section>
        
        {/* Bestsellers */}
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ProductGrid 
              title="Meilleures ventes" 
              products={bestsellers} 
              columns={4}
            />
          </div>
        </section>
        
        {/* On Sale */}
        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ProductGrid 
              title="Promotions" 
              products={onSale} 
              columns={4}
            />
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="bg-shop-600 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Restez informé
              </h2>
              <p className="mt-4 text-lg text-shop-100">
                Inscrivez-vous à notre newsletter pour recevoir nos dernières offres et nouveautés.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-center">
                <div className="sm:flex-1 max-w-md">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="block w-full rounded-l-md border-0 px-4 py-2.5 text-gray-900 shadow-sm focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-r-md bg-shop-800 px-6 py-2.5 font-semibold text-white shadow-sm hover:bg-shop-700 focus:outline-none"
                >
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
