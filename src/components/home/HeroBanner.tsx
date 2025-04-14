
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-shop-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Bienvenue dans votre boutique en ligne
          </h1>
          <p className="mt-6 text-xl text-shop-100">
            Découvrez notre sélection de produits exceptionnels, conçus pour vous offrir une expérience d'achat unique et mémorable.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-shop-600 hover:bg-shop-50">
              <Link to="/products">Découvrir nos produits</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-shop-500">
              <Link to="/products/bestsellers">Meilleures ventes</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 hidden w-1/2 sm:block">
        {/* Background decorative pattern */}
        <svg
          className="absolute inset-0 h-full w-full"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 802 602"
        >
          <path
            fill="rgba(255, 255, 255, 0.05)"
            d="M400,100 C 290,100 200,180 200,300 C 200,420 290,500 400,500 C 510,500 600,420 600,300 C 600,180 510,100 400,100 Z"
          />
          <path
            fill="rgba(255, 255, 255, 0.05)"
            d="M500,150 C 420,150 350,200 350,300 C 350,400 420,450 500,450 C 580,450 650,400 650,300 C 650,200 580,150 500,150 Z"
          />
          <path
            fill="rgba(255, 255, 255, 0.05)"
            d="M300,200 C 240,200 200,250 200,300 C 200,350 240,400 300,400 C 360,400 400,350 400,300 C 400,250 360,200 300,200 Z"
          />
        </svg>
      </div>
    </div>
  );
}
