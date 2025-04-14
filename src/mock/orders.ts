
export interface Order {
  id: string;
  customerId: number;
  customerName: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
  total: number;
  items: {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }[];
  paymentMethod: string;
  shippingAddress: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
}

export const mockOrders: Order[] = [
  {
    id: "ORD-2023-001",
    customerId: 1,
    customerName: "Sophie Martin",
    date: "2023-04-15T09:30:00",
    status: "completed",
    total: 79.98,
    items: [
      {
        productId: 1,
        productName: "T-shirt premium coton",
        quantity: 2,
        price: 29.99
      },
      {
        productId: 3,
        productName: "Sac à main en cuir",
        quantity: 1,
        price: 89.99
      }
    ],
    paymentMethod: "Carte bancaire",
    shippingAddress: {
      street: "15 Rue de Paris",
      city: "Lyon",
      zip: "69000",
      country: "France"
    }
  },
  {
    id: "ORD-2023-002",
    customerId: 2,
    customerName: "Thomas Dubois",
    date: "2023-04-16T14:45:00",
    status: "processing",
    total: 199.99,
    items: [
      {
        productId: 12,
        productName: "Tapis berbère",
        quantity: 1,
        price: 199.99
      }
    ],
    paymentMethod: "PayPal",
    shippingAddress: {
      street: "8 Avenue Victor Hugo",
      city: "Paris",
      zip: "75016",
      country: "France"
    }
  },
  {
    id: "ORD-2023-003",
    customerId: 3,
    customerName: "Julie Leroy",
    date: "2023-04-17T11:20:00",
    status: "pending",
    total: 129.99,
    items: [
      {
        productId: 7,
        productName: "Montre analogique",
        quantity: 1,
        price: 129.99
      }
    ],
    paymentMethod: "Carte bancaire",
    shippingAddress: {
      street: "42 Rue des Fleurs",
      city: "Marseille",
      zip: "13000",
      country: "France"
    }
  },
  {
    id: "ORD-2023-004",
    customerId: 4,
    customerName: "Pierre Moreau",
    date: "2023-04-18T16:10:00",
    status: "completed",
    total: 254.97,
    items: [
      {
        productId: 5,
        productName: "Chemise lin été",
        quantity: 2,
        price: 45.99
      },
      {
        productId: 9,
        productName: "Pantalon chino homme",
        quantity: 2,
        price: 49.99
      },
      {
        productId: 3,
        productName: "Sac à main en cuir",
        quantity: 1,
        price: 89.99
      }
    ],
    paymentMethod: "Carte bancaire",
    shippingAddress: {
      street: "27 Boulevard Saint-Michel",
      city: "Bordeaux",
      zip: "33000",
      country: "France"
    }
  },
  {
    id: "ORD-2023-005",
    customerId: 5,
    customerName: "Marie Petit",
    date: "2023-04-19T10:05:00",
    status: "cancelled",
    total: 49.99,
    items: [
      {
        productId: 2,
        productName: "Robe d'été fleurie",
        quantity: 1,
        price: 49.99
      }
    ],
    paymentMethod: "PayPal",
    shippingAddress: {
      street: "5 Rue du Commerce",
      city: "Lille",
      zip: "59000",
      country: "France"
    }
  }
];

export const getRecentOrders = (limit = 5) => mockOrders.slice(0, limit);
export const getOrdersByStatus = (status: Order['status']) => mockOrders.filter(order => order.status === status);
export const getOrderById = (id: string) => mockOrders.find(order => order.id === id);
