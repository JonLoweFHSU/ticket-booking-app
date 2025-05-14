import React from "react";
import { useCartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCartContext();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const ordersRef = collection(db, "orders");
    try {
      for (let item of cartItems) {
        await addDoc(ordersRef, {
          userId: user.uid,
          eventId: item.id,
          eventTitle: item.title,
          eventDate: item.date,
          quantity: item.quantity,
          total: item.price * item.quantity,
        });
      }
      clearCart();
      navigate("/success");
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white border rounded p-4 mb-4"
            >
              <img src={item.thumbnail} alt={item.title} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.date}</p>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="border px-2 py-1 w-20 mt-2"
                />
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">${item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <p className="text-xl font-bold">Total: ${totalPrice}</p>
            <button
              onClick={handleCheckout}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
