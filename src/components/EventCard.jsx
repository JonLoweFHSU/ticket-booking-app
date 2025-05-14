import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="border rounded shadow p-4 bg-white">
      {event.thumbnail && (
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-48 object-cover rounded mb-2"
        />
      )}
      <h2 className="text-xl font-semibold mb-1">{event.title}</h2>
      <p className="text-gray-600">{event.location}</p>
      <p className="text-sm text-gray-500">{event.date}</p>
      <Link
        to={`/event/${event.id}`}
        className="inline-block mt-2 text-blue-500 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};

export default EventCard;
