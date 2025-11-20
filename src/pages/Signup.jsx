import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [medicineInput, setMedicineInput] = useState("");

  const handleSignup = () => {
    if (!username || !email || !password) {
      alert("All fields are required!");
      return;
    }

    const medicineIds = medicineInput
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      name: username,
      email,
      password,
      medicineIds,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>Create Account</h2>

      <input
        type="text"
        className="form-control mt-3"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        className="form-control mt-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mt-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="text"
        className="form-control mt-3"
        inputMode="text"
        placeholder="Enter Medicine IDs (ex: 1, 3, 5)"
        value={medicineInput}
        onChange={(e) => setMedicineInput(e.target.value)}
      />

      <button className="btn btn-primary mt-4" onClick={handleSignup}>
        Register
      </button>
    </div>
  );
}
