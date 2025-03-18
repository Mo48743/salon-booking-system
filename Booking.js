import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { useAuth } from "../auth/AuthContext"; 
import MpesaPayment from "../components/MpesaPayment";  

export default function Booking() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState(""); 
  const [stylist, setStylist] = useState("");  
  const [availableStylists, setAvailableStylists] = useState([]); 
  const [bookingConfirmed, setBookingConfirmed] = useState(false); 
  const { user } = useAuth(); 

  const services = ["Haircut", "Manicure", "Pedicure", "Facial", "Hair Coloring", "Massage", "Braiding", "Makeup"];
  const allStylists = ["Jane", "John", "Mary", "Alice", "Bob", "Sophia", "Michael", "Emma"];

  useEffect(() => {
    const fetchAvailableStylists = async () => {
      if (date && time) {
        const bookedStylists = new Set();
        const bookingQuery = query(
          collection(db, "bookings"),
          where("date", "==", date),
          where("time", "==", time)
        );
        const querySnapshot = await getDocs(bookingQuery);

        querySnapshot.forEach((doc) => {
          bookedStylists.add(doc.data().stylist);
        });

        setAvailableStylists(allStylists.filter(s => !bookedStylists.has(s)));
      } else {
        setAvailableStylists(allStylists);
      }
    };

    fetchAvailableStylists();
  }, [date, time]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to book an appointment.");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        name,
        date,
        time,
        service,
        stylist,
        status: "Booked",
        timestamp: new Date(),
      });

      alert("Booking Confirmed! Proceed to Payment.");
      setBookingConfirmed(true); 
      setName("");
      setDate("");
      setTime("");
      setService("");
      setStylist("");
    } catch (error) {
      console.error("Error adding booking:", error);
      alert("Failed to book. Please try again.");
    }
  };

  const handleCompleteAppointment = async () => {
    if (!stylist) {
      alert("Select a stylist to mark available.");
      return;
    }

    const bookingQuery = query(
      collection(db, "bookings"),
      where("date", "==", date),
      where("time", "==", time),
      where("stylist", "==", stylist),
      where("status", "==", "Booked")
    );

    const querySnapshot = await getDocs(bookingQuery);
    
    if (!querySnapshot.empty) {
      const bookingDoc = querySnapshot.docs[0];
      await updateDoc(bookingDoc.ref, { status: "Completed" });

      alert(`Stylist ${stylist} is now available.`);
      setAvailableStylists([...availableStylists, stylist]);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <h2 style={styles.title}>Book an Appointment</h2>
      <div style={styles.container}>
        <form onSubmit={handleBooking} style={styles.form}>
          <input 
            type="text" 
            placeholder="Your Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={styles.input}
          />
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
            style={styles.input}
          />
          <input 
            type="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            required 
            style={styles.input}
          />
          <select 
            value={service} 
            onChange={(e) => setService(e.target.value)} 
            required 
            style={styles.input}
          >
            <option value="">Select a Service</option>
            {services.map((s, index) => (
              <option key={index} value={s}>{s}</option>
            ))}
          </select>

          <select 
            value={stylist} 
            onChange={(e) => setStylist(e.target.value)} 
            required 
            style={styles.input}
          >
            <option value="">Select a Stylist</option>
            {availableStylists.length > 0 ? (
              availableStylists.map((s, index) => (
                <option key={index} value={s}>{s}</option>
              ))
            ) : (
              <option disabled>No available stylists</option>
            )}
          </select>

          <button type="submit" style={styles.button}>Book Now</button>
        </form>

        {/* ✅ Display M-Pesa Payment after Booking */}
        {bookingConfirmed && <MpesaPayment />}  

        <button onClick={handleCompleteAppointment} style={styles.button}>
          Mark Stylist Available
        </button>

        <button onClick={() => window.location.href = "/stylist-availability"} style={styles.button}>
          Check Stylist Availability
        </button>
      </div>
    </div>
  );
}
const styles = {
  pageWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundImage: "url('https://img.freepik.com/premium-photo/3d-render-beauty-spa-nail-salon-pastel-pink-background-3d-illustration-luxury-beauty-studio_1254992-13924.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    color: "white",
    marginBottom: "10px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.7)", // Helps text stand out
  },
  container: {
    background: "rgba(255, 255, 255, 0.9)", // Semi-transparent white for contrast
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "300px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  },
  button: {
    background: "#ff4f7b",
    color: "white",
    padding: "12px 16px",
    fontSize: "1rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px 5px",
    width: "100%",
    transition: "0.3s ease-in-out",
  },
};




