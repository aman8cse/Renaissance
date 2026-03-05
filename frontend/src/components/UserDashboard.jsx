import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import RegisterBtn from "./registerButton";
import "../styles/userDashboard.css";
import Loader from "./Loader";

export default function UserDashboard() {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventsData, setEventsData] = useState([]);
 

  async function fetchDashboard() {
    try {
      const userRes = await fetch(
        `${BASE_URL}/user/current-user`,
        { credentials: "include" }
      );

      if (!userRes.ok) {
        navigate("/auth");
        return;
      }

      const userData = await userRes.json();
      setUser(userData.data);

      const eventsRes = await fetch(
        `${BASE_URL}/events/my-events`,
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
  async function cancelRegistration(slug) {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/events/${slug}/cancel`, {
        method: "DELETE",
        credentials: "include"
      });

      const response = await res.json();

      if (!res.ok) {
        setLoading(false);
        alert(response.message);
        return;
      }

      setLoading(false);
      alert(response.message);
      setEvents(prev => prev.filter(e => e.slug !== slug));

    } catch (err) {
      console.log(err);
      setLoading(false);
      alert(err.message);
    }
  }
  async function getAllEvents() {
    try {
      const res = await fetch(`${BASE_URL}/events/get-all`, {
        method: "GET",
        credentials: "include",
      })

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message);
        return;
      }

      const data = await res.json();
      setEventsData(data.events);

    } catch (err) {
      console.log("Error:", err);
      alert(err);
    }
  }
  async function deleteEvent(slug) {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/events/${slug}/delete`, {
        method: "DELETE",
        credentials: "include"
      });

      if (!res.ok) {
        const errorData = await res.json();
        setLoading(false);
        alert(errorData.message);
        return;
      }

      setEventsData(prev => prev.filter(e => e.slug !== slug));
      const response = await res.json();
      setLoading(false);
      alert(response.message);

    } catch (err) {
      console.log("Error:", err);
      setLoading(false);
      alert(err);
    }
  }
  async function handleLogout() {
    setLoading(true)
    await fetch(`${BASE_URL}/user/logout`, {
      method: "POST",
      credentials: "include",
    });
    setLoading(false)

    navigate("/auth");
  }
  
  useEffect(() => {
    fetchDashboard();
    getAllEvents();
  }, []);


  const Events = (
    <div className="event">
      {eventsData.map(event => (
        <EventCard
          key={event._id}
          title={event.title}
          slug={event.slug}
          eventType={event.eventType}
          description={event.description}
          bannerImage={event.bannerImage || null}
          startDatetime={event.startDatetime}
          endDatetime={event.endDatetime}
          location={event.location}
          entryFeeCoins={event.entryFeeCoins}
          extraDetails={event.extraDetails || null}
          btn={<RegisterBtn onClick={() => deleteEvent(event.slug)} name={"Delete"} />}
        />
      ))}
    </div>
  )
  const MyEvents = (
    <div className="event">
      {events.map(event => (
        <EventCard
          key={event._id}
          title={event.title}
          slug={event.slug}
          eventType={event.eventType}
          description={event.description}
          bannerImage={event.bannerImage || null}
          startDatetime={event.startDatetime}
          endDatetime={event.endDatetime}
          location={event.location}
          entryFeeCoins={event.entryFeeCoins}
          extraDetails={event.extraDetails}
          btn={<RegisterBtn onClick={() => cancelRegistration(event.slug)} name={"Cancel"} />}
        />
      ))}
    </div>
  )

  return (
    <div className="dashboardContainer">

      {loading && <Loader/>}
      {/* Header */}
      <div className="dashboardHeader">
        <h2>Renaissance Dashboard</h2>
        <button className="logoutBtn" onClick={handleLogout}>Logout</button>
        {user?.role === 2 && <button className="logoutBtn" onClick={() => navigate("/addEvent")}>Add Event</button>}
        {user?.role === 2 && <button className="logoutBtn" onClick={() => navigate("/users")}>Users</button>}
      </div>

      {/* Profile Section */}
      <div className="profileCard">
        <h3>{user?.username || "Username"}</h3>
        <p>Email: {user?.email || "Email"}</p>
        <p>Mobile: {user?.mobile || "Mobile"}</p>
        <p>Coins: {user?.coinsBalance || "Coins"}</p>
        <p>
          Role:{" "}
          {user?.role === 0
            ? "User"
            : user?.role === 1
            ? "Volunteer"
            : "Admin"}
        </p>
        <p>
          Joined: {new Date(user?.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Events Section */}
      <div className="eventsSection">
        <h3>Registered Events</h3>

        {events.length === 0 ? (
          <p>No events registered yet.</p>
        ) : MyEvents}
        {user?.role === 2 && Events}
      </div>
    </div>
  );
}