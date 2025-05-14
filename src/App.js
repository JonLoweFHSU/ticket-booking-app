import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "./firebase";

import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Success from "./pages/Success";

import Navbar from "./components/Navbar"; // ✅ Use your real Tailwind navbar

const App = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    const updateImagesToThumbnail = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const querySnapshot = await getDocs(eventsCollection);

        querySnapshot.forEach(async (docSnap) => {
          const event = docSnap.data();
          const eventRef = doc(db, "events", docSnap.id);

          // Only update if image exists AND thumbnail doesn't
          if (event.image && !event.thumbnail) {
            await updateDoc(eventRef, {
              thumbnail: event.image,
            });
            console.log(`Updated event ${event.title} with thumbnail.`);
          }
        });
      } catch (error) {
        console.error("Error updating events:", error);
      }
    };

    updateImagesToThumbnail();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar /> {/* ✅ This brings your good-looking nav back */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={user ? <Profile /> : <Login />} />
          <Route path="/checkout" element={user ? <Checkout /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
