
import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  href: string;
  image: string;
}

export default function FeaturedCategories() {
  const categories: Category[] = [
    {
      id: 1,
      name: "Femmes",
      href: "/products/women",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
      id: 2,
      name: "Hommes",
      href: "/products/men",
      image: "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
      id: 3,
      name: "Accessoires",
      href: "/products/accessories",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
      id: 4,
      name: "Décoration",
      href: "/products/home",
      image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    },
  ];

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Nos catégories</h2>
          <p className="mt-4 text-gray-500">
            Explorez notre sélection de produits par catégorie et trouvez ce qui vous convient le mieux.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={category.href}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  <p className="mt-1 text-sm text-white/80 group-hover:text-white">
                    Voir la collection
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
