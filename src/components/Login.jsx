import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after login

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Simple validation for username and password (you can replace this with API validation)
    if (username === "admin" && password === "admin123") {
      // Redirect to the Admin Dashboard if credentials are correct
      navigate("/admin");
    } else {
      // Show an error if the credentials are incorrect
      setError("Invalid username or password!");
    }
  };

  return (
    <div style={styles.loginContainer}>
      <h2 style={styles.heading}>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  loginContainer: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #333", // Dark border for a Netflix look
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Slightly stronger shadow
    backgroundColor: "#141414", // Netflix-like dark background
    color: "#fff", // White text
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2rem", // Larger heading
    fontWeight: "bold",
    color: "#fff", // White text for heading
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "1.1rem",
    color: "#ddd", // Light gray color for labels
  },
  input: {
    width: "95%",
    padding: "12px",
    fontSize: "16px", // Slightly larger text
    border: "1px solid #333", // Dark border for input fields
    borderRadius: "4px",
    backgroundColor: "#333", // Dark background for input fields
    color: "#fff", // White text for inputs
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "1.2rem", // Larger button text
    backgroundColor: "#e50914", // Netflix red
    color: "#fff", // White text for the button
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#b20710", // Darker red on hover
  },
  error: {
    color: "#e50914", // Red color for error message
    textAlign: "center",
    marginTop: "10px",
  },
};

export default Login;
