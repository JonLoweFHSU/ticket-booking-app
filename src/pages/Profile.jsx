import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const userOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(userOrders);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, [user]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) =>
    `$${parseFloat(amount).toFixed(2)}`;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      {user ? (
        <div className="space-y-6">
          <div className="bg-white shadow p-4 rounded-lg">
            <p className="text-gray-800">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Booking History</h3>
            {orders.length > 0 ? (
              <div className="grid gap-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white shadow rounded-lg p-4 border">
                    <p className="text-lg font-bold">{order.eventTitle}</p>
                    <p className="text-sm text-gray-600">Date: {formatDate(order.eventDate)}</p>
                    <p className="text-sm">Tickets: {order.quantity}</p>
                    <p className="text-sm font-medium text-green-600">
                      Total: {formatCurrency(order.total)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">You haven't made any bookings yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-red-500">Please log in to view your profile and orders.</p>
      )}
    </div>
  );
};

export default Profile;
