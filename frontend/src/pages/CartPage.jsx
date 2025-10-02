import { useNavigate } from "react-router-dom";
import useCartStore from "../stores/useCartStore";

function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, clearCart, getTotal } = useCartStore();

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-lg pt-16">
      <h1 className="text-4xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-300">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-white rounded" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-300">{item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-2xl font-bold">Total: ${getTotal().toFixed(2)}</p>
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate('/payment')}
                className="bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-lg font-medium transition"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
