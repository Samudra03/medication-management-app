import { useLocation, useNavigate } from "react-router-dom";

export default function MedicineDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const deleteMedicine = () => {
    let meds = JSON.parse(localStorage.getItem("medications"));
    meds = meds.filter((m) => m.id !== state.id);
    localStorage.setItem("medications", JSON.stringify(meds));
    alert("Medicine deleted!");
    navigate("/dashboard");
  };

  const editMedicine = () => {
    const newName = prompt("Enter new medicine name:", state.name);
    if (newName) {
      let meds = JSON.parse(localStorage.getItem("medications"));
      meds = meds.map((m) =>
        m.id === state.id ? { ...m, name: newName } : m
      );
      localStorage.setItem("medications", JSON.stringify(meds));
      alert("Updated!");
      navigate("/dashboard");
    }
  };

  return (
    <div style={{ width: "60%", margin: "30px auto" }}>
      <h2>{state.name} Details</h2>

      <div style={styles.card}>
        <p><strong>Dosage:</strong> {state.dosage}</p>
        <p><strong>Frequency:</strong> {state.frequency}</p>
        <p><strong>Timing:</strong> {state.timing}</p>
        <p><strong>Instructions:</strong> {state.instructions}</p>
      </div>

      <button style={styles.editBtn} onClick={editMedicine}>
        Edit Medicine
      </button>

      <button style={styles.deleteBtn} onClick={deleteMedicine}>
        Delete Medicine
      </button>

      <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
        Back
      </button>
    </div>
  );
}

const styles = {
  card: {
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 12,
    background: "#f9f9f9",
    marginBottom: 20
  },
  editBtn: {
    padding: 10,
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: 6,
    marginRight: 10
  },
  deleteBtn: {
    padding: 10,
    background: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: 6,
    marginRight: 10
  },
  backBtn: {
    padding: 10,
    background: "gray",
    color: "white",
    border: "none",
    borderRadius: 6
  }
};
