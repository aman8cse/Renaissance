import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [form, setForm] = useState({ email: "", password: "", mobile: "", username: "" });
  const [isLogin, setIsLogin] = useState(true);

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/user/sign-up`, {
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
      navigate("/userDashboard");

    } catch (err) {
      console.error("Error:", err);
      alert("err", err.message);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    try{
      const res = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.message);
        return;
      }

      const data = await res.json();
      navigate("/userDashboard");

    } catch (err) {
      console.error("Error:", err);
      alert(err);
    }
  }

  const login = (
    <div className="loginWrapper">
      <form className="loginCard" onSubmit={handleLogin}>
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
          Don’t have an account? <span onClick={() => setIsLogin(!isLogin)}>Register</span>
        </p>
      </form>
    </div>
  )

  const register = (
    <div className="loginWrapper">
      <form className="loginCard" onSubmit={handleRegister}>
        <h2 className="loginTitle">Welcome</h2>

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

        <div className="inputGroup">
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputGroup">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="loginBtn">
          Register
        </button>

        <p className="loginFooter">
          Have an account? <span onClick={() => setIsLogin(!isLogin)}>Login</span>
        </p>
      </form>
    </div>
  )

  return (
    <>
    {isLogin && login}
    {!isLogin && register}
    </>
  );
}