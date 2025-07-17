import { Link } from "react-router-dom";
import classes from "./Home.module.css";

export default function Home() {
  return (
    <div className={classes.main}>
      <h1 className={classes.pageHeading}>Welcome!</h1>
      <div className={classes.form}>
        <Link to="/create-chat" className={classes.link}>
          <button className={classes.button}>Create Chat</button>
        </Link>
        <Link to="/chats" className={classes.link}>
          <button className={classes.button}>Go to Chats</button>
        </Link>
      </div>
    </div>
  );
}
