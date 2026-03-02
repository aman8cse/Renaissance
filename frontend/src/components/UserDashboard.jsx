import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/userDashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const userRes = await fetch(
          "http://localhost:5000/api/user/current-user",
          { credentials: "include" }
        );

        if (!userRes.ok) {
          navigate("/auth");
          return;
        }

        const userData = await userRes.json();
        setUser(userData.data);

        const eventsRes = await fetch(
          "http://localhost:5000/api/events/my-events",
          { credentials: "include" }
        );

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          setEvents(eventsData.events || []);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate("/auth");
      }
    }

    fetchDashboard();
  }, []);

  async function handleLogout() {
    await fetch("http://localhost:5000/api/user/logout", {
      method: "POST",
      credentials: "include",
    });

    navigate("/auth");
  }

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboardContainer">

      {/* Header */}
      <div className="dashboardHeader">
        <h2>Renaissance Dashboard</h2>
        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Profile Section */}
      <div className="profileCard">
        <h3>{user.username}</h3>
        <p>Email: {user.email}</p>
        <p>Mobile: {user.mobile}</p>
        <p>Coins: {user.coinsBalance}</p>
        <p>
          Role:{" "}
          {user.role === 0
            ? "User"
            : user.role === 1
            ? "Volunteer"
            : "Admin"}
        </p>
        <p>
          Joined: {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Events Section */}
      <div className="eventsSection">
        <h3>Registered Events</h3>

        {events.length === 0 ? (
          <p>No events registered yet.</p>
        ) : (
          <div className="eventsGrid">
            {events.map((event) => (
              <div key={event._id} className="eventCardMini">
                <h4>{event.eventName}</h4>
                <p>Date: {event.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}