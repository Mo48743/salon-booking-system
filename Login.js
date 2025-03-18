import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/booking"); 
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <h2 style={styles.title}>Login</h2>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={styles.input}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
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
    color: "black",
    marginBottom: "10px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.7)", 
  },
  container: {
    background: "rgba(255, 255, 255, 0.9)",
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
    margin: "10px 0",
    width: "100%",
    transition: "0.3s ease-in-out",
  },
};



