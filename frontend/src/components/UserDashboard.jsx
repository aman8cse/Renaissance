import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import RegisterBtn from "./registerButton";
import "../styles/userDashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventsData, setEventsData] = useState([]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    eventType: "",
    description: "",
    bannerImage: "",
    startDatetime: "",
    endDatetime: "",
    location: "",
    entryFeeCoins: "",
    extraDetails: ""
  });
 

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
        console.log(eventsData);
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      navigate("/auth");
    }
  }
  async function cancelRegistration(slug) {
    try {
      const res = await fetch(`http://localhost:5000/api/events/${slug}/cancel`, {
        method: "DELETE",
        credentials: "include"
      });

      const response = await res.json();

      if (!res.ok) {
        alert(response.message);
        return;
      }

      alert(response.message);
      setEvents(prev => prev.filter(e => e.slug !== slug));

    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }
  async function getAllEvents() {
    try {
      const res = await fetch("http://localhost:5000/api/events/get-all", {
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
    try {
      const res = await fetch(`http://localhost:5000/api/events/${slug}/delete`, {
        method: "DELETE",
        credentials: "include"
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message);
        return;
      }

      setEventsData(prev => prev.filter(e => e.slug !== slug));
      const response = await res.json();
      alert(response.message);

    } catch (err) {
      console.log("Error:", err);
      alert(err);
    }
  }
  async function handleLogout() {
    await fetch("http://localhost:5000/api/user/logout", {
      method: "POST",
      credentials: "include",
    });

    navigate("/auth");
  }
  async function handleCreateNew(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/events/create-new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message);
        return;
      }

      const data = await res.json();
      getAllEvents();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    } catch (err) {
      console.error("Error:", err);
      alert(err.message);
    }
  }
  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }
  useEffect(() => {
    fetchDashboard();
    getAllEvents();
  }, []);


  const NewEvent = (
    <div className="createEventWrapper">

      <form className="createEventGlassCard" onSubmit={handleCreateNew}>

        <div className="createEventHeader">
          <h2>Create Event</h2>
        </div>

        {/* Event Basics */}
        <div className="createEventSection">
          <h3>Event Basics</h3>

          <div className="inputGrid">

            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="slug"
              placeholder="Unique Slug (example: hackathon-2026)"
              value={form.slug}
              onChange={handleChange}
              required
            />

            <select
              name="eventType"
              value={form.eventType}
              onChange={handleChange}
              required
            >
              <option value="">Select Event Type</option>
              <option value="hackathon">Hackathon</option>
              <option value="workshop">Workshop</option>
              <option value="competition">Competition</option>
              <option value="seminar">Seminar</option>
            </select>

          </div>

          <textarea
            name="description"
            placeholder="Describe the event..."
            value={form.description}
            onChange={handleChange}
            rows={4}
          />

        </div>


        {/* Schedule */}
        <div className="createEventSection">
          <h3>Schedule</h3>

          <div className="inputGrid">

            <div className="inputGroup">
              <label>Start Time</label>
              <input
                type="datetime-local"
                name="startDatetime"
                value={form.startDatetime}
                onChange={handleChange}
              />
            </div>

            <div className="inputGroup">
              <label>End Time</label>
              <input
                type="datetime-local"
                name="endDatetime"
                value={form.endDatetime}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>


        {/* Location & Entry */}
        <div className="createEventSection">
          <h3>Location & Entry</h3>

          <div className="inputGrid">

            <input
              type="text"
              name="location"
              placeholder="Event Location (Online / Venue)"
              value={form.location}
              onChange={handleChange}
            />

            <input
              type="number"
              name="entryFeeCoins"
              placeholder="Entry Fee (Coins)"
              value={form.entryFeeCoins}
              onChange={handleChange}
            />

          </div>
        </div>


        {/* Banner */}
        <div className="createEventSection">
          <h3>Banner Image</h3>

          <input
            type="text"
            name="bannerImage"
            placeholder="Paste Banner Image URL"
            value={form.bannerImage}
            onChange={handleChange}
          />

          {form.bannerImage && (
            <div className="bannerPreviewContainer">
              <img
                src={form.bannerImage}
                alt="Event banner preview"
                className="bannerPreview"
              />
            </div>
          )}

        </div>


        {/* Extra Details */}
        <div className="createEventSection">
          <h3>Extra Details</h3>

          <textarea
            name="extraDetails"
            placeholder="Rules, prizes, instructions..."
            value={form.extraDetails}
            onChange={handleChange}
            rows={4}
          />

        </div>


        {/* CTA */}
        <div className="createEventActions">

          <button type="submit" className="createEventBtn">
            Create Event
          </button>

        </div>

      </form>

    </div>
  );
  const Events = (
    <div className="event">
      {eventsData.map(event => (
        <EventCard
          key={event._id}
          title={event.title}
          slug={event.slug}
          eventType={event.eventType}
          description={event.description}
          bannerImage={event.bannerImage}
          startDatetime={event.startDatetime}
          endDatetime={event.endDatetime}
          location={event.location}
          entryFeeCoins={event.entryFeeCoins}
          extraDetails={event.extraDetails}
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
          bannerImage={event.bannerImage}
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
        ) : MyEvents}
        {user.role === 2 && Events}
        {user.role === 2 && NewEvent}
      </div>
    </div>
  );
}