import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api.js";
// import classes from "../CreateNote/CreateNote.module.css"
import classes from "./EditNote.module.css";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState({ title: "", text: "" });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/getNotes`);
        const currentNote = res.data.find((n) => n._id === id);
        if (currentNote) {
          setNote({ title: currentNote.title, text: currentNote.text });
        } else {
          alert("Note not found");
          navigate("/home");
        }
      } catch (err) {
        alert("Error fetching note");
      }
    };
    fetchNote();
  }, [id, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/getNotes/${id}`, note);
      alert("Note updated!");
      navigate("/home");
    } catch (err) {
      alert("Failed to update note");
    }
  };

  return (
    <div className={classes.main}>
      <h1 className={classes.pageHeading}>Editing the note</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div><input className={classes.input}
          type="text"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          placeholder="Title"
        /></div>
        <div><textarea className={classes.input}
          value={note.text}
          onChange={(e) => setNote({ ...note, text: e.target.value })}
          placeholder="Text"
          rows={7}
        /></div>
        <div><button className={classes.button} type="submit">Update Note</button></div>
      </form>
    </div>
  );
}
