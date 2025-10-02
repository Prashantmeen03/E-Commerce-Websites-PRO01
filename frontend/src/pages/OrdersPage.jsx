import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Package, Calendar, DollarSign, Truck, CheckCircle, Clock, ArrowLeft } from "lucide-react";

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD123",
      date: "2025-09-28",
      status: "Delivered",
      amount: "$49.99",
      items: ["Headphones", "Mouse"],
    },
    {
      id: "ORD124",
      date: "2025-10-01",
      status: "Shipped",
      amount: "$29.99",
      items: ["Smartwatch"],
    },
    {
      id: "ORD125",
      date: "2025-10-05",
      status: "Processing",
      amount: "$79.99",
      items: ["Laptop", "Keyboard"],
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="text-green-400" size={20} />;
      case "Shipped":
        return <Truck className="text-blue-400" size={20} />;
      case "Processing":
        return <Clock className="text-yellow-400" size={20} />;
      default:
        return <Package className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500";
      case "Shipped":
        return "bg-blue-500";
      case "Processing":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white pt-16 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <Link to="/profile" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-4 transition">
          <ArrowLeft size={20} className="mr-2" />
          Back to Profile
        </Link>
        <h1 className="text-4xl font-bold mb-8 text-emerald-400">My Orders</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-emerald-500 transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Package className="text-emerald-400 mr-2" size={24} />
                  <h3 className="text-xl font-semibold">{order.id}</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                  {order.status}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-300">
                  <Calendar className="mr-2" size={16} />
                  <span>{order.date}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <DollarSign className="mr-2" size={16} />
                  <span className="text-yellow-400 font-semibold">{order.amount}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  {getStatusIcon(order.status)}
                  <span className="ml-2">{order.status}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Items:</p>
                <ul className="text-sm">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="text-gray-300">• {item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {orders.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Package className="mx-auto text-gray-500 mb-4" size={64} />
            <p className="text-xl text-gray-400">No orders yet</p>
            <p className="text-gray-500">Start shopping to see your orders here!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
