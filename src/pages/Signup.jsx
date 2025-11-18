import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required!");
      return;
    }

    // Save user
    localStorage.setItem("user", JSON.stringify(form));
    alert("Signup successful! Please login.");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2>Create Account</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={styles.input}
      />

      <div style={{ position: "relative" }}>
        <input
          type={showPass ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />
        <span
          style={styles.eye}
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? "🙈" : "👁️"}
        </span>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button style={styles.btn} onClick={handleSignup}>
        Signup
      </button>

      <p>
        Already have an account?{" "}
        <span style={styles.link} onClick={() => navigate("/")}>
          Login
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
