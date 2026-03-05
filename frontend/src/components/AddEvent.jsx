import React, { useState } from 'react'
import '../styles/addEvent.css';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

export default function AddEvent() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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

    async function handleCreateNew(e) {
        setLoading(true);
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
                setLoading(false);
                alert(errorData.message);
                return;
            }

            const data = await res.json();
            setLoading(false);
            navigate("/userDashboard");

        } catch (err) {
            console.error("Error:", err);
            setLoading(false);
            alert(err.message);
        }
    }
    function handleChange(e) {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div className="createEventWrapper">
            {loading && <Loader/>}

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
}