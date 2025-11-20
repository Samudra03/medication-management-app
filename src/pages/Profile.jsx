import { useNavigate } from "react-router-dom";
import medicationsData from "../data/medications";
import { useState } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) return <p>No profile found.</p>;

  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState(storedUser.name);
  const [email, setEmail] = useState(storedUser.email);

  const [medicineInput, setMedicineInput] = useState(
    (storedUser.medicineIds || []).join(", ")
  );

  const userMeds = medicationsData.filter((m) =>
    (storedUser.medicineIds || []).includes(m.id)
  );

  const saveProfile = () => {
    const ids = medicineInput
      .split(",")
      .map((v) => parseInt(v.trim()))
      .filter((v) => !isNaN(v));

    const updatedUser = {
      ...storedUser,
      name,
      email,
      medicineIds: ids,
    };

    // Update "user"
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Update inside "users" array
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = allUsers.map((u) =>
      u.email === storedUser.email ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Profile updated successfully!");
    setEditMode(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.profileCard}>
        <h2 style={styles.heading}>User Profile</h2>

        {editMode ? (
          <>
            <label><strong>Name:</strong></label>
            <input
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label><strong>Email:</strong></label>
            <input
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label><strong>Medicine IDs (1,2,3):</strong></label>
            <input
              style={styles.input}
              value={medicineInput}
              onChange={(e) => setMedicineInput(e.target.value)}
            />

            <button style={styles.saveBtn} onClick={saveProfile}>
              Save Changes
            </button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {storedUser.name}</p>
            <p><strong>Email:</strong> {storedUser.email}</p>
            <p>
              <strong>Medicines Assigned:</strong>{" "}
              {(storedUser.medicineIds || []).join(", ") || "None"}
            </p>

            <button style={styles.editBtn} onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </>
        )}

        <button style={styles.button} onClick={() => navigate("/dashboard")}>
          ⬅ Back to Dashboard
        </button>
      </div>

      <h2 style={{ marginTop: "40px" }}>Your Medical Records</h2>

      {userMeds.length === 0 ? (
        <p>No medicines assigned.</p>
      ) : (
        <div style={styles.grid}>
          {userMeds.map((m) => (
            <div key={m.id} style={styles.medCard}>
              <h3>{m.name}</h3>
              <p><strong>Dosage:</strong> {m.dosage}</p>
              <p><strong>Frequency:</strong> {m.frequency}</p>
              <p><strong>Timing:</strong> {m.timing}</p>
              <p style={{ fontSize: 14 }}>{m.instructions}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    width: "90%",
    margin: "40px auto",
    fontFamily: "Arial",
  },
  profileCard: {
    border: "1px solid #ddd",
    padding: 20,
    borderRadius: 10,
    background: "#f7faff",
  },
  heading: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "5px 0 15px 0",
    border: "1px solid #ccc",
    borderRadius: 6,
  },
  editBtn: {
    padding: "10px 20px",
    background: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  saveBtn: {
    padding: "10px 20px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  button: {
    marginTop: 20,
    padding: "10px 20px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  grid: {
    marginTop: 20,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "20px",
  },
  medCard: {
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 10,
    background: "white",
  },
};
