import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.pageWrapper}>
      <h1 style={styles.title}>Welcome to GlamSync Salon</h1>
      <p style={styles.description}>Book an appointment with the best stylists!</p>
      <div style={styles.container}>
        <Link to="/login"><button style={styles.button}>Login</button></Link>
        <Link to="/signup"><button style={styles.button}>Sign Up</button></Link>
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
    backgroundImage: "url('https://img.freepik.com/premium-photo/beauty-salon-interior-chairs-mirrors-pink-hairdressing-shop_1025753-117564.jpg')", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    color: "#000000",  
    fontWeight: "bolder",  
    marginBottom: "130px",  
    padding: "10px 20px",  
    background: "rgba(255, 255, 255, 0.9)",  
    borderRadius: "10px",  
    textShadow: "2px 2px 5px rgba(0,0,0,0.3)",  
  },
  description: {
    fontSize: "1.2rem",
    color: "#000000",  
    fontWeight: "bolder",  
    marginBottom: "20px",
    padding: "10px 20px",  
    background: "rgba(255, 255, 255, 0.9)",  
    borderRadius: "10px",
    textShadow: "2px 2px 5px rgba(0,0,0,0.3)",  
  },
  container: {
    background: "rgba(255, 255, 255, 0.9)", 
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "300px",
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
    margin: "10px",
    width: "100%",
    transition: "0.3s ease-in-out",
  },
  buttonHover: {
    background: "#ff2a5f",
  },
};
