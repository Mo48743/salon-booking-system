import { useState, useEffect, useMemo } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function StylistAvailability() {
  const [stylists, setStylists] = useState([]);


  const stylistData = useMemo(() => [
    { id: "1", name: "Jane", phone: "0712345678", role: "Hair Stylist" },
    { id: "2", name: "John", phone: "0723456789", role: "Makeup Artist" },
    { id: "3", name: "Mary", phone: "0734567890", role: "Nail Technician" },
    { id: "4", name: "Alice", phone: "0745678901", role: "Hair Stylist" },
    { id: "5", name: "Bob", phone: "0756789012", role: "Barber" },
    { id: "6", name: "Sophia", phone: "0767890123", role: "Facial Specialist" },
    { id: "7", name: "Michael", phone: "0778901234", role: "Color Specialist" },
    { id: "8", name: "Emma", phone: "0789012345", role: "Braiding Expert" },
  ], []);  

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingSnapshot = await getDocs(collection(db, "bookings"));
      const bookedStylists = new Map();

      bookingSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.status === "Booked") {
          bookedStylists.set(data.stylist, `${data.time} - ${data.endTime || "N/A"}`); // ✅ Add timeframe
        }
      });

      
      setStylists(stylistData.map((stylist) => ({
        ...stylist,
        status: bookedStylists.has(stylist.name) ? "Booked" : "Available",
        timeframe: bookedStylists.get(stylist.name) || "N/A", 
      })));
    };

    fetchBookings();
  }, [stylistData]);  

  
  const markAvailable = async (stylistName) => {
    const bookingSnapshot = await getDocs(collection(db, "bookings"));

    bookingSnapshot.forEach(async (docItem) => {
      const data = docItem.data();
      if (data.stylist === stylistName && data.status === "Booked") {
        await updateDoc(doc(db, "bookings", docItem.id), { status: "Completed" });
      }
    });

    alert(`${stylistName} is now available.`);
    setStylists(stylists.map(s => s.name === stylistName ? { ...s, status: "Available", timeframe: "N/A" } : s));
  };

  return (
    <div style={styles.pageWrapper}>
      <h2 style={styles.title}>Stylist Availability</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Availability</th>
            <th>Busy Time</th>  {}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stylists.map((stylist) => (
            <tr key={stylist.id} style={stylist.status === "Booked" ? styles.bookedRow : {}}>
              <td>{stylist.name}</td>
              <td>{stylist.phone}</td>
              <td>{stylist.role}</td>
              <td>{stylist.status}</td>
              <td>{stylist.timeframe}</td>  {}
              <td>
                {stylist.status === "Booked" && (
                  <button style={styles.button} onClick={() => markAvailable(stylist.name)}>
                    Mark Available
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


const styles = {
  pageWrapper: {
    textAlign: "center",
    padding: "20px",
    background: "linear-gradient(to bottom, #ff9eb5, #ff4f7b)",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2.5rem",
    color: "white",
    marginBottom: "20px",
  },
  table: {
    width: "90%",
    margin: "0 auto",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  bookedRow: {
    background: "#ffb6c1", 
  },
  button: {
    background: "#ff4f7b",
    color: "white",
    padding: "8px 12px",
    fontSize: "1rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s ease-in-out",
  },
};
