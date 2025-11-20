import { useLocation, useNavigate } from "react-router-dom";

export default function MedicineDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ width: "60%", margin: "30px auto" }}>
      <h2>{state.name} Details</h2>

      <div style={styles.card}>
        <p><strong>Dosage:</strong> {state.dosage}</p>
        <p><strong>Frequency:</strong> {state.frequency}</p>
        <p><strong>Timing:</strong> {state.timing}</p>
        <p><strong>Instructions:</strong> {state.instructions}</p>
      </div>

      <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
        Back to Dashboard
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
  backBtn: {
    padding: 10,
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: 6
  }
};
