
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "@/components/admin/Sidebar";
import StatCard from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from "recharts";
import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  CreditCard, 
  Package 
} from "lucide-react";
import { getRecentOrders, getOrdersByStatus } from "@/mock/orders";

const Dashboard = () => {
  const recentOrders = getRecentOrders();
  
  const orderStatusData = [
    { name: "En attente", value: getOrdersByStatus("pending").length, color: "#3b82f6" },
    { name: "En traitement", value: getOrdersByStatus("processing").length, color: "#f59e0b" },
    { name: "Terminé", value: getOrdersByStatus("completed").length, color: "#10b981" },
    { name: "Annulé", value: getOrdersByStatus("cancelled").length, color: "#ef4444" }
  ];
  
  const salesData = [
    { name: "Jan", value: 2400 },
    { name: "Fév", value: 1398 },
    { name: "Mar", value: 3800 },
    { name: "Avr", value: 3908 },
    { name: "Mai", value: 4800 },
    { name: "Jui", value: 3800 },
    { name: "Jui", value: 4300 },
  ];
  
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500 mt-1">Bienvenue dans votre espace d'administration</p>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Ventes totales"
            value="15 642,25 €"
            icon={<CreditCard size={16} />}
            change={12}
          />
          <StatCard
            title="Commandes"
            value="145"
            icon={<ShoppingBag size={16} />}
            change={8}
          />
          <StatCard
            title="Clients"
            value="87"
            icon={<Users size={16} />}
            change={24}
          />
          <StatCard
            title="Produits"
            value="43"
            icon={<Package size={16} />}
            change={-3}
          />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Chiffre d'affaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} €`, 'Ventes']}
                      labelFormatter={(label) => `Mois: ${label}`}
                    />
                    <Legend />
                    <Bar dataKey="value" name="Ventes (€)" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Order Status Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Statut des commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Commandes']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Orders */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-md font-medium">Commandes récentes</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/orders">Voir toutes les commandes</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-medium text-gray-500">ID</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Client</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Date</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Statut</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Total</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{order.id}</td>
                      <td className="px-4 py-3">{order.customerName}</td>
                      <td className="px-4 py-3">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "completed" ? "bg-green-100 text-green-800" :
                          order.status === "processing" ? "bg-yellow-100 text-yellow-800" :
                          order.status === "pending" ? "bg-blue-100 text-blue-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {order.status === "completed" ? "Terminée" : 
                           order.status === "processing" ? "En traitement" :
                           order.status === "pending" ? "En attente" : "Annulée"}
                        </span>
                      </td>
                      <td className="px-4 py-3">{new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                      }).format(order.total)}</td>
                      <td className="px-4 py-3">
                        <Button asChild variant="ghost" size="sm">
                          <Link to={`/admin/orders/${order.id}`}>Voir</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
