// src/pages/ProductPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import useCartStore from "../stores/useCartStore";

// Example product data
const products = [
  {
    id: "h2",
    name: "Headphones",
    description: "",
    price: "$199",
    image: "/h2.png",
  },
  {
    id: "m1",
    name: "Mobiles",
    description: "This is the detailed description of the H3 product.",
    price: "$249",
    image: "/m1.png",
  },
  {
    id: "mm",
    name: "H3 Product",
    description: "This is the detailed description of the H3 product.",
    price: "$249",
    image: "/mm.png",
  },
  {
    id: "p2",
    name: "Mouse",
    description: "This is the detailed description of the H3 product.",
    price: "$249",
    image: "/p2.png",
  },
  {
    id: "p3",
    name: "I phone",
    description: "This is the detailed description of the H3 product.",
    price: "$249",
    image: "/p3.png",
  },
  {
    id: "sw",
    name: "White SmartWatches",
    description: "This is the detailed description of the H3 product.",
    price: "$249",
    image: "/sw.png",
  },
  {
    id: "sm2",
    name: "Smartwatches",
    description: "This is the detailed description of the H3 product.",
    price: "$249",
    image: "/sm2.png",
  },
  {
    id: "t1",
    name: "watches",
    description: "This is the detailed description of the H3 product.",
    price: "$249",
    image: "/t1.png",
  },
  {
    id: "earbb",
    name: "Black Ear Buds",
    description: "This is the detailed description of the Black Ear Buds.",
    price: "$249",
    image: "/earb.jpg",
  },
  {
    id: "h1",
    name: "Headphones",
    description: "This is the detailed description of the Headphones.",
    price: "$299",
    image: "/h1.png",
  },
];

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="p-10 text-center text-white">
        <h1 className="text-3xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-lg pt-16">
      {/* Layout: image left, details right */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product image */}
        <div className="flex-1 flex justify-center items-start">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-96 h-auto object-contain rounded-lg shadow-md p-4 bg-white"
          />
        </div>

        {/* Product info */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-300 mb-6 text-lg leading-relaxed">
            {product.description}
          </p>
          <p className="text-3xl font-semibold text-yellow-400 mb-6">
            {product.price}
          </p>

          {/* Buttons like Flipkart */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                addItem(product);
                navigate('/payment');
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-bold transition"
            >
              Buy Now
            </button>
            <button
              onClick={() => {
                addItem(product);
                alert('Item added to cart!');
              }}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Extra details */}
      <div className="mt-10 p-6 bg-gray-800 rounded-lg">
        <h3 className="text-2xl font-bold mb-3">Product Details</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>High-quality materials</li>
          <li>Durable and long-lasting</li>
          <li>Stylish design</li>
          <li>Available in multiple colors</li>
        </ul>
      </div>
    </div>
  );
}

export default ProductPage;