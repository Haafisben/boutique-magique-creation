
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockOrders, Order } from "@/mock/orders";
import { Search, RefreshCw } from "lucide-react";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [loading, setLoading] = useState(false);
  
  // Filter and sort orders
  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case "date-asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "date-desc":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "total-asc":
        return a.total - b.total;
      case "total-desc":
        return b.total - a.total;
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });
  
  const refreshOrders = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  
  const formatStatus = (status: Order["status"]) => {
    switch (status) {
      case "completed": return "Terminée";
      case "processing": return "En traitement";
      case "pending": return "En attente";
      case "cancelled": return "Annulée";
      case "refunded": return "Remboursée";
      default: return status;
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Commandes</h1>
            <p className="text-gray-500 mt-1">Gérez toutes les commandes de vos clients</p>
          </div>
          <Button onClick={refreshOrders} disabled={loading} className="sm:self-end">
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Rafraîchir
          </Button>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Rechercher une commande..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {/* Status filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="processing">En traitement</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
                <SelectItem value="refunded">Remboursé</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Date (récent → ancien)</SelectItem>
                <SelectItem value="date-asc">Date (ancien → récent)</SelectItem>
                <SelectItem value="total-desc">Total (décroissant)</SelectItem>
                <SelectItem value="total-asc">Total (croissant)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left font-medium text-gray-500">ID</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Client</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Statut</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Total</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Paiement</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{order.id}</td>
                    <td className="px-4 py-3">{order.customerName}</td>
                    <td className="px-4 py-3">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "completed" ? "bg-green-100 text-green-800" :
                        order.status === "processing" ? "bg-yellow-100 text-yellow-800" :
                        order.status === "pending" ? "bg-blue-100 text-blue-800" :
                        order.status === "refunded" ? "bg-purple-100 text-purple-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {formatStatus(order.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                      }).format(order.total)}
                    </td>
                    <td className="px-4 py-3">{order.paymentMethod}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/admin/orders/${order.id}`}>Voir</Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucune commande trouvée</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
