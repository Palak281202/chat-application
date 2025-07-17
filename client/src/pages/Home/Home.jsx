import { Link, useNavigate } from "react-router-dom";
import classes from "./Home.module.css";
import { useEffect, useState } from "react";
import api from "../../services/api.js";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/getNotes");
        setNotes(res.data);
      } catch (err) {
        console.error("Failed to fetch notes", err);
      }
    };

    fetchNotes();
  }, []);

  const deleteNoteHandler = async (id) => {
    try {
      await api.delete(`/getNotes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error(
        "Failed to delete note:",
        err.response?.data || err.message
      );
      alert("Failed to delete note");
    }
  };

  return (
    <div className={classes.main}>
      <h1 className={classes.pageHeading}>Welcome to notes!</h1>
      <Link to="/createNote" className={classes.link}>
        <button className={classes.button}>+ Create Note</button>
      </Link>
      <div className={classes.notesdiv}>
        {notes.length === 0 && <h2>No notes yet!!</h2>}
        {notes.map((note) => (
          <div key={note._id} className={classes.note}>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
            <button className={classes.button} onClick={() => deleteNoteHandler(note._id)}>Delete</button>
            <button className={classes.button} onClick={() => navigate(`/editnote/${note._id}`)}>
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
