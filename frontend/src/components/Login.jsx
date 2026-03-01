import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit(e) {
  e.preventDefault();

  const res = await fetch(
    "https://renaissance-xck3.onrender.com/", 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        form
      })
    }
  );

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  alert("Login success");
}

  return (
    <div className="loginWrapper">
      <form className="loginCard" onSubmit={handleSubmit}>
        <h2 className="loginTitle">Welcome Back</h2>

        <div className="inputGroup">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputGroup">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="loginBtn">
          Login
        </button>

        <p className="loginFooter">
          Don’t have an account? <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </form>
    </div>
  );
}