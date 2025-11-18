import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <p>No profile found.</p>;

  return (
    <div style={{ width: "50%", margin: "40px auto" }}>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button
        onClick={() => navigate("/dashboard")}
        style={{ marginTop: 20, padding: 10 }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}
