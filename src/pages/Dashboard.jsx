import { useState, useEffect } from "react";
import medicationsData from "../data/medication";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [medications, setMedications] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {

    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);

    const saved = JSON.parse(localStorage.getItem("medications"));
    if (saved) {
      setMedications(saved);
    } else {
      setMedications(medicationsData);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/");
  };

  const markAsTaken = (id) => {
    const updated = medications.map((med) =>
      med.id === id ? { ...med, taken: !med.taken } : med
    );

    setMedications(updated);
    localStorage.setItem("medications", JSON.stringify(updated));
  };

  return (
    <div>

      <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          >
            MedTrack
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </span>
              </li>

              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/profile")}
                >
                  Profile
                  
                </span>
              </li>
            </ul>

            <div
              className="d-flex align-items-center"
              style={{ gap: "15px" }}
            >
              <span className="text-white fw-semibold">
                Hello, {user.name}
              </span>

              <button className="btn btn-danger btn-sm" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* DASHBOARD */}
      <div style={{ width: "90%", margin: "30px auto" }}>
        <h2>Medication Dashboard</h2>

        <div style={styles.grid}>
          {medications.map((m) => (
            <div key={m.id} style={styles.card}>
              <h3
                onClick={() =>
                  navigate(`/medicine/${m.id}`, { state: m })
                }
                style={{ cursor: "pointer" }}
              >
                {m.name}
              </h3>
              <p>{m.dosage}</p>

              <button
                style={{
                  ...styles.takeBtn,
                  background: m.taken ? "green" : "#1976d2",
                }}
                onClick={() => markAsTaken(m.id)}
              >
                {m.taken ? "Taken ✔" : "Mark as Taken"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 10,
  },
  takeBtn: {
    padding: 8,
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    marginTop: 10,
  },
};
