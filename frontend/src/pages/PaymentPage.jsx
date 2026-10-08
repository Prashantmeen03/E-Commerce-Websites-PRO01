import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../stores/useCartStore";
import { motion } from "framer-motion";

function PaymentPage() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePayment = () => {
    if (!paymentMethod) return;
    alert(`✅ Payment successful via ${paymentMethod}!`);
    clearCart();
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-xl pt-20 pb-12"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-emerald-400">Payment</h1>

      {/* Order Summary */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">🛒 Order Summary</h2>
        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-400">Your cart is empty.</p>
          ) : (
            items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain bg-white rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                    <p className="text-yellow-400 font-bold mt-1">{item.price}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4 flex justify-between text-xl font-bold text-white">
          <span>Total:</span>
          <span>${getTotal().toFixed(2)}</span>
        </div>
      </section>

      {/* Payment Method Selection */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">💳 Select Payment Method</h2>
        <div className="space-y-4">
          {["Cash on Delivery", "Phone Pay", "Google Pay", "Credit/Debit Card"].map((method) => (
            <label key={method} className="flex items-center cursor-pointer hover:text-emerald-400 transition">
              <input
                type="radio"
                name="payment"
                value={method}
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked={paymentMethod === method}
                className="mr-3 accent-emerald-500"
              />
              {method}
            </label>
          ))}
        </div>
      </section>

      {/* Payment Button */}
      <div className="text-center">
        <button
          onClick={handlePayment}
          disabled={!paymentMethod}
          className={`px-8 py-3 rounded-lg font-bold transition w-full sm:w-auto ${
            paymentMethod
              ? "bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          {paymentMethod ? `Complete Payment with ${paymentMethod}` : "Select a Payment Method"}
        </button>
      </div>
    </motion.div>
  );
}

export default PaymentPage;
