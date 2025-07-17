import React, { useState } from "react";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api.js";

export default function Login() {
  const [form, setform] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    try{
        const res = await api.post('/auth/login', form);
        localStorage.setItem('token', res.data.token);
        navigate('/home');
    }
    catch{
        alert('Login Failed! Please try again.')
    }
  };
  return (
    <div className={classes.main}>
      <h2 className={classes.pageHeading}>LOGIN</h2>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.div}>
          <label className={classes.label}>Enter you Email:</label>
          <input
            onChange={(event) =>
              setform({ ...form, email: event.target.value })
            }
            type="text"
            placeholder="Email"
            className={classes.input}
          />
        </div>
        <div className={classes.div}>
          <label className={classes.label}>Enter you password:</label>
          <input
            onChange={(event) =>
              setform({ ...form, password: event.target.value })
            }
            type="password"
            placeholder="Password"
            className={classes.input}
          />
        </div>
        <div className={classes.divbuttons}>
          <button className={classes.button}>Login</button>
          <Link to="/" className={classes.link}>
            Don't have an account? Create one!
          </Link>
        </div>
      </form>
    </div>
  );
}
