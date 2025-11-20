import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import medicationsData from "../data/medications";

export default function Dashboard() {
  const navigate = useNavigate();

  const [medications, setMedications] = useState([]);
  const [username, setUsername] = useState("");

  // Load User + Medicines
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;

    setUsername(storedUser.name);

    // Safely match user's medicine IDs
    const userMeds = medicationsData.filter(
      (med) =>
        Array.isArray(storedUser.medicineIds) &&
        storedUser.medicineIds.includes(med.id)
    );

    setMedications(userMeds);
  }, []);

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Mark medicine taken
  const markAsTaken = (id) => {
    const updatedList = medications.map((med) =>
      med.id === id ? { ...med, taken: !med.taken } : med
    );

    setMedications(updatedList);
    localStorage.setItem("medications", JSON.stringify(updatedList));
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <span
            className="navbar-brand"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          >
            MedTrack
          </span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id="menu" className="collapse navbar-collapse justify-content-between">
            <ul className="navbar-nav">
              <li className="nav-item">
                <span className="nav-link" style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
                  Dashboard
                </span>
              </li>

              <li className="nav-item">
                <span className="nav-link" style={{ cursor: "pointer" }} onClick={() => navigate("/profile")}>
                  Profile
                </span>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3">
              <span className="text-white fw-semibold">Hello, {username}</span>
              <button className="btn btn-danger btn-sm" onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </nav>


      <div className="container mt-4">
        <h2 className="mb-4">Medication Dashboard</h2>

        <div className="row">
          {medications.map((m) => (
            <div className="col-md-4 col-sm-6 mb-4" key={m.id}>
              <div className="card p-3 shadow-sm">
                <h4
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/medicine/${m.id}`, { state: m })}
                >
                  {m.name}
                </h4>

                <p className="text-muted mb-2">{m.dosage}</p>

                <button
                  className="btn w-100"
                  style={{ background: m.taken ? "green" : "#1976d2", color: "white" }}
                  onClick={() => markAsTaken(m.id)}
                >
                  {m.taken ? "Taken ✔" : "Mark as Taken"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {medications.length === 0 && (
          <p className="text-muted mt-3">No medicines assigned to you.</p>
        )}
      </div>
    </div>
  );
}
