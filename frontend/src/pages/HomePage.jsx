// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// 🔹 Category data
const categories = [
  { href: "/product/h2", name: "Headphones", imageUrl: "/h2.png" },
  { href: "/product/m1", name: "Mobiles", imageUrl: "/m1.png" },
  { href: "/product/mm", name: "MOUSE", imageUrl: "/mm.png" },
  { href: "/product/p2", name: "Phones", imageUrl: "/p2.png" },
  { href: "/product/p3", name: "iPhone", imageUrl: "/p3.png" },
  { href: "/product/sm2", name: "Smartwatches", imageUrl: "/sm2.png" },
  { href: "/product/sw", name: "White Smartwatches", imageUrl: "/sw.png" },
  { href: "/product/t1", name: "watches", imageUrl: "/t1.png" },
];

// 🔹 Top deals data
const topDeals = [
  { href: "/product/ear", name: "Ear Buds", price: "$199", imageUrl: "/ear.jpg" },
  { href: "/product/earbb", name: "Black Ear Buds", price: "$249", imageUrl: "/earb.jpg" },
  { href: "/product/h1", name: "Headphones", price: "$299", imageUrl: "/h1.png" },
  { href: "/product/p2", name: "Phones", price: "$599", imageUrl: "/p2.png" },
];

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topDeals.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* 🔥 Offer Banner */}
        <div className="mb-8">
          <img
            src="/off.jpg"
            alt="Special Offer"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* 🛒 Auto-sliding Top Deals */}
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">Top Deals</h2>
        <div className="relative w-full max-w-lg mx-auto">
          <Link to={topDeals[currentIndex].href}>
            <div className="overflow-hidden rounded-lg border border-gray-700 shadow-lg cursor-pointer">
              <img
                src={topDeals[currentIndex].imageUrl}
                alt={topDeals[currentIndex].name}
                className="w-full h-60 object-cover"
              />
              <div className="p-4 bg-gray-900 text-center">
                <h3 className="font-semibold text-lg">{topDeals[currentIndex].name}</h3>
                <p className="text-emerald-400">{topDeals[currentIndex].price}</p>
              </div>
            </div>
          </Link>

          {/* Small dots indicator */}
          <div className="flex justify-center mt-3 space-x-2">
            {topDeals.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-emerald-400" : "bg-gray-600"
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* 🏷 Categories */}
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mt-16 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map(({ href, name, imageUrl }) => (
            <Link
              key={name}
              to={href}
              className="block rounded-lg overflow-hidden border border-gray-700 hover:border-emerald-400 transition"
            >
              <img
                src={imageUrl}
                alt={`Category: ${name}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center bg-gray-900">
                <h2 className="text-lg font-semibold">{name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
