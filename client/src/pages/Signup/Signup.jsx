import React, { useState } from "react";
import classes from "./Signup.module.css";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api.js";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if(form.name === "" || form.password === "" || form.email==="" || form.confirmPassword === ""){
      return alert("INPUT FIELDS MISSING");
    }
    if (form.password !== form.confirmPassword) return alert("Passwords don't match");
    console.log(form);
    try {
      await api.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      alert("Signup success!");
      navigate("/login");
    } catch (event) {
      alert(event.response?.data || "Error");
    }
  };

  return (
    <div className={classes.main}>
      <h2 className={classes.pageHeading}>SIGNUP</h2>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.div}>
          <label className={classes.label}>Enter your name:</label>
          <input
            className={classes.input}
            type="text"
            placeholder="Name"
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        </div>
        <div className={classes.div}>
          <label className={classes.label}>Enter your Email id:</label>
          <input
            className={classes.input}
            type="text"
            placeholder="Email"
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
          />
        </div>
        <div className={classes.div}>
          <label className={classes.label}>Set a strong password:</label>
          <input
            className={classes.input}
            type="password"
            placeholder="Password"
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
          />
        </div>
        <div className={classes.div}>
          <label className={classes.label}>Confirm your password:</label>
          <input
            className={classes.input}
            type="password"
            placeholder="Confirm Password"
            onChange={(event) =>
              setForm({ ...form, confirmPassword: event.target.value })
            }
          />
        </div>
        <div className={classes.divbuttons}>
          <button type="submit" className={classes.button}>
            Create account
          </button>
          <Link to="/login" className={classes.link}>
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
}
