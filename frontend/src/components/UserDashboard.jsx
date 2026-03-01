import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/userDashboard.css";

//have to work on this page

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("http://localhost:5000/api/user/current-user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          navigate("/auth");
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        navigate("/auth");
      }
    }

    fetchProfile();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/auth");
  }

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboardContainer">
      <div className="dashboardHeader">
        <h2>Renaissance Dashboard</h2>
        <button onClick={handleLogout} className="logoutBtn">
          Logout
        </button>
      </div>

      <div className="userCard">
        <h3>Welcome, {user.username}</h3>
        <p>Email: {user.email}</p>
      </div>

      <div className="statsSection">
        <div className="statCard">
          <h4>Projects</h4>
          <p>{user.projectsCount || 0}</p>
        </div>

        <div className="statCard">
          <h4>Reports</h4>
          <p>{user.reportsCount || 0}</p>
        </div>

        <div className="statCard">
          <h4>Activity</h4>
          <p>Active</p>
        </div>
      </div>

      <div className="activitySection">
        <h4>Recent Activity</h4>
        <ul>
          {user.activities?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}