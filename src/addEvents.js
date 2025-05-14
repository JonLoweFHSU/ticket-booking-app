// addEvents.js
import { db } from './firebase'; // Firebase setup
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore'; // Firestore functions

const sampleEvents = [
  {
    id: 2,
    title: "Art Exhibition",
    description: "Explore the latest modern art installations from around the world.",
    date: "2025-07-02",
    location: "San Francisco",
    price: 40,
    image: "/images/art_exhibition.jpg" // Ensure the image is correct
  },
  {
    id: 3,
    title: "Food Festival",
    description: "Taste dishes from over 50 international cuisines.",
    date: "2025-08-20",
    location: "Chicago",
    price: 30,
    image: "/images/food_festival.jpg" // Ensure the image is correct
  },
  {
    id: 4,
    title: "Marathon 2025",
    description: "Join thousands of runners in this annual marathon event.",
    date: "2025-09-10",
    location: "Boston",
    price: 20,
    image: "/images/marathon.jpg" // Ensure the image is correct
  },
  {
    id: 5,
    title: "Tech Conference",
    description: "Attend keynotes and workshops by leading tech experts.",
    date: "2025-10-05",
    location: "Seattle",
    price: 120,
    image: "/images/tech_conference.jpg" // Ensure the image is correct
  },
  {
    id: 6,
    title: "Jazz Night",
    description: "Enjoy a night of smooth jazz performances in an intimate setting.",
    date: "2025-11-18",
    location: "New Orleans",
    price: 55,
    image: "/images/jazz_night.jpg" // Ensure the image is correct
  }
];

// Function to add events to Firestore if they don’t already exist
export const addEventsToFirestore = async () => {
  try {
    const eventsCollection = collection(db, 'events');
    
    // Query Firestore to see if an event already exists
    const querySnapshot = await getDocs(eventsCollection);
    const eventNames = querySnapshot.docs.map(doc => doc.data().title); // Changed to 'title' field

    // Add events only if they don't already exist
    for (const event of sampleEvents) {
      if (!eventNames.includes(event.title)) { // Changed to 'title' field
        await addDoc(eventsCollection, event);
        console.log(`Event "${event.title}" added successfully!`); // Changed to 'title' field
      } else {
        console.log(`Event "${event.title}" already exists.`);
      }
    }
  } catch (error) {
    console.error('Error adding events to Firestore: ', error);
  }
};

// Function to update events in Firestore if they don’t have an image
export const updateEventsInFirestore = async () => {
  try {
    const eventsCollection = collection(db, 'events');
    
    const querySnapshot = await getDocs(eventsCollection);
    querySnapshot.forEach(async (docSnapshot) => {
      const docData = docSnapshot.data();
      const docRef = doc(db, 'events', docSnapshot.id);
      
      // Check if image field is missing or undefined
      if (!docData.image || docData.image === undefined) {
        const updatedEvent = sampleEvents.find(event => event.title === docData.title); // Changed to 'title' field
        
        // If the event has a thumbnail (image), update it
        if (updatedEvent && updatedEvent.image) {
          await updateDoc(docRef, {
            image: updatedEvent.image // Update the image field
          });
          console.log(`Updated image for event: ${docData.title}`); // Changed to 'title' field
        }
      }
    });
  } catch (error) {
    console.error('Error updating events in Firestore: ', error);
  }
};
