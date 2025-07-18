import React, { useState } from "react";
import classes from "./CreateNote.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";

export default function CreateNote() {
  const [note, setNote] = useState({ title: "", text: "" });
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await api.post("/createNote", note);
      navigate("/home");
    } catch (err) {
      console.error("Error creating note:", err.response?.data || err.message);
      alert("Some error occurred!!");
    }
  };
  return (
    <div className={classes.main}>
      <h2 className={classes.pageHeading}>NOTE</h2>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.div}>
          <label className={classes.label}>Title:</label>
          <input
            onChange={(event) =>
              setNote({ ...note, title: event.target.value })
            }
            type="text"
            placeholder="title...."
            className={classes.input}
          />
        </div>
        <div className={classes.div}>
          <label className={classes.label}>Note:</label>
          <textarea
            onChange={(event) => setNote({ ...note, text: event.target.value })}
            value={note.text}
            required
            placeholder="text...."
            className={classes.input}
            rows={7}
          />
        </div>
        <div className={classes.divbuttons}>
          <button className={classes.button}>Create</button>
        </div>
      </form>
    </div>
  );
}
