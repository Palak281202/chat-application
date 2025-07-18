import React from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <Link className={classes.link} to="/home">
          HOME
        </Link>
      </div>
      <div className={classes.div}>
        <Link className={classes.link} to="/createNote">
          CREATE NOTE
        </Link>
      </div>
    </div>
  );
}
