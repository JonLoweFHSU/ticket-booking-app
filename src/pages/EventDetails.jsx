// src/pages/EventDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useCartContext } from "../contexts/CartContext";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const { addToCart } = useCartContext();

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, "events", eventId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEvent({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchEvent();
  }, [eventId]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={event.thumbnail} alt={event.title} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="text-2xl font-bold">{event.title}</h2>
      <p className="text-gray-700">{event.description}</p>
      <p className="text-sm text-gray-600 mt-2">{event.date} - {event.location}</p>
      <p className="text-lg font-semibold mt-2">${event.price}</p>
      <button
        onClick={() => addToCart(event, 1)}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default EventDetails;
