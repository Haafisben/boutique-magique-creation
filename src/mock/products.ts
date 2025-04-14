
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
  description?: string;
  details?: string[];
  stock?: number;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "T-shirt premium coton",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "men",
    isNew: true,
    stock: 25,
    description: "T-shirt en coton premium de haute qualité, confortable et durable pour un usage quotidien.",
    details: ["100% coton", "Lavable en machine", "Tailles disponibles: S à XXL"]
  },
  {
    id: 2,
    name: "Robe d'été fleurie",
    price: 49.99,
    oldPrice: 69.99,
    image: "https://images.unsplash.com/photo-1622122201714-77da0ca8e5d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "women",
    isOnSale: true,
    stock: 12,
    description: "Robe d'été légère et fleurie, parfaite pour les journées chaudes et ensoleillées.",
    details: ["Matière légère", "Motif floral", "Longueur: mi-cuisse"]
  },
  {
    id: 3,
    name: "Sac à main en cuir",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "accessories",
    isBestseller: true,
    stock: 8,
    description: "Sac à main élégant en cuir véritable, idéal pour un usage quotidien ou pour des occasions spéciales.",
    details: ["Cuir véritable", "Plusieurs compartiments", "Fermeture à glissière"]
  },
  {
    id: 4,
    name: "Vase décoratif moderne",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "home",
    isNew: true,
    stock: 15,
    description: "Vase décoratif au design moderne, parfait pour ajouter une touche d'élégance à votre intérieur.",
    details: ["Céramique de qualité", "Design unique", "Hauteur: 25 cm"]
  },
  {
    id: 5,
    name: "Chemise lin été",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1563630423918-b58f07336ac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "men",
    stock: 20,
    description: "Chemise en lin parfaite pour l'été, légère et respirante pour un confort optimal.",
    details: ["100% lin", "Coupe décontractée", "Boutons en nacre"]
  },
  {
    id: 6,
    name: "Jean slim femme",
    price: 59.99,
    oldPrice: 79.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "women",
    isOnSale: true,
    stock: 18,
    description: "Jean slim taille haute pour femme, confortable et stylé pour toutes les occasions.",
    details: ["98% coton, 2% élasthanne", "Coupe slim", "Taille haute"]
  },
  {
    id: 7,
    name: "Montre analogique",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "accessories",
    isBestseller: true,
    stock: 7,
    description: "Montre analogique élégante avec bracelet en cuir, parfaite pour une tenue décontractée ou professionnelle.",
    details: ["Mouvement à quartz", "Boîtier en acier inoxydable", "Bracelet en cuir véritable"]
  },
  {
    id: 8,
    name: "Lampe de table design",
    price: 79.99,
    oldPrice: 99.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "home",
    isOnSale: true,
    stock: 5,
    description: "Lampe de table au design contemporain, idéale pour créer une ambiance chaleureuse dans votre intérieur.",
    details: ["Abat-jour en tissu", "Base en métal", "Ampoule LED incluse"]
  },
  {
    id: 9,
    name: "Pantalon chino homme",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "men",
    stock: 22,
    description: "Pantalon chino pour homme, élégant et confortable, parfait pour une tenue casual chic.",
    details: ["98% coton, 2% élasthanne", "Coupe droite", "Fermeture à bouton et zip"]
  },
  {
    id: 10,
    name: "Blouse brodée",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "women",
    isNew: true,
    stock: 14,
    description: "Blouse brodée à manches longues, élégante et féminine pour toutes les occasions.",
    details: ["Broderie détaillée", "Col rond", "Matière fluide"]
  },
  {
    id: 11,
    name: "Boucles d'oreilles argent",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "accessories",
    stock: 30,
    description: "Boucles d'oreilles en argent 925, design élégant pour rehausser toutes vos tenues.",
    details: ["Argent sterling 925", "Hypoallergénique", "Motif géométrique"]
  },
  {
    id: 12,
    name: "Tapis berbère",
    price: 199.99,
    oldPrice: 249.99,
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "home",
    isOnSale: true,
    stock: 3,
    description: "Tapis berbère authentique, fait à la main avec des matériaux de qualité supérieure.",
    details: ["Laine naturelle", "Fabrication artisanale", "Dimensions: 170x240 cm"]
  },
];

export const getBestsellers = () => mockProducts.filter(p => p.isBestseller);
export const getNewArrivals = () => mockProducts.filter(p => p.isNew);
export const getOnSale = () => mockProducts.filter(p => p.isOnSale);
export const getByCategory = (category: string) => mockProducts.filter(p => p.category === category);
