import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = allUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem("user", JSON.stringify(foundUser));

    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <button style={styles.btn} onClick={handleLogin}>
        Login
      </button>

      <p>
        Don’t have an account?{" "}
        <span style={styles.link} onClick={() => navigate("/signup")}>
          Sign Up
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    width: "350px",
    margin: "60px auto",
    padding: "20px",
    borderRadius: "10px",
    background: "#f7faff",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  btn: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  link: {
    color: "#1976d2",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
