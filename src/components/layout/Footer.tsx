
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Shop information */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-lg font-bold text-shop-600">Boutique Magique</h3>
            <p className="mt-2 text-sm text-gray-500">
              Des produits de qualité pour des clients satisfaits. Notre boutique vous propose une expérience d'achat unique.
            </p>
          </div>
          
          {/* Shop navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Boutique</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/products/new" className="text-sm text-gray-500 hover:text-shop-600">
                  Nouveautés
                </Link>
              </li>
              <li>
                <Link to="/products/bestsellers" className="text-sm text-gray-500 hover:text-shop-600">
                  Meilleures ventes
                </Link>
              </li>
              <li>
                <Link to="/products/sale" className="text-sm text-gray-500 hover:text-shop-600">
                  Promotions
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Compte</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/login" className="text-sm text-gray-500 hover:text-shop-600">
                  Se connecter
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-gray-500 hover:text-shop-600">
                  Créer un compte
                </Link>
              </li>
              <li>
                <Link to="/account/orders" className="text-sm text-gray-500 hover:text-shop-600">
                  Mes commandes
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Information</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-500 hover:text-shop-600">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-500 hover:text-shop-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-500 hover:text-shop-600">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-500 hover:text-shop-600">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Boutique Magique. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
