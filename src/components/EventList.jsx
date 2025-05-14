import React from "react";
import { Link } from "react-router-dom";

const EventList = ({ events }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {events.map((event) => (
        <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-500">{event.date}</p>
            <p className="text-gray-600">{event.location}</p>
            <p className="text-green-600 font-bold">${event.price}</p>
            <Link
              to={`/event/${event.id}`}
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
