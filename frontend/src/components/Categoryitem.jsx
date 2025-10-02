import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../lib/axios"; // ✅ your axios instance
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../lib/axios"; // ✅ your axios instance
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2, Star } from "lucide-react";

const CategoryPage = ({ category: propCategory }) => {
  const { category: paramCategory } = useParams(); // e.g. "/category/mobiles"
  const category = propCategory || paramCategory;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/products/category/${category}`);
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching category items:", err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchItems();
    }
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Category Title */}
      <h1 className="text-2xl font-bold mb-6 capitalize">{category}</h1>

      {/* Items Grid */}
      {items.length === 0 ? (
        <p className="text-gray-500">No items found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
                <Link to={`/product/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-contain p-2"
                  />
                </Link>
                <CardContent className="p-3">
                  <h2 className="font-semibold text-gray-800 truncate">
                    {item.name}
                  </h2>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    <Star className="w-4 h-4" />
                    <span>{item.rating || 4.3}</span>
                  </div>
                  <p className="text-lg font-bold text-emerald-600">
                    ₹{item.price}
                  </p>
                  <Button
                    className="w-full mt-2 rounded-xl bg-emerald-500 hover:bg-emerald-600"
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
