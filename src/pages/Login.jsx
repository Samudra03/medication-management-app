import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!storedUser) {
      setError("No user found. Please signup first.");
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <div style={{ position: "relative" }}>
        <input
          type={showPass ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <span
          style={styles.eye}
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? "🙈" : ""}
        </span>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button style={styles.btn} onClick={handleLogin}>
        Login
      </button>

      <p>
        New user?{" "}
        <span style={styles.link} onClick={() => navigate("/signup")}>
          Create Account
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    width: 350,
    margin: "50px auto",
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 10,
    textAlign: "center",
  },
  input: {
    width: "90%",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    border: "1px solid gray",
  },
  btn: {
    marginTop: 20,
    padding: "10px 20px",
    width: "100%",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  link: { color: "blue", cursor: "pointer" },
  eye: {
    position: "absolute",
    right: 15,
    top: 20,
    cursor: "pointer",
  },
};
