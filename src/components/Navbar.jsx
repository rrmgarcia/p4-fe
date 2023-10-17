import React from "react";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div id={styles.nav}>
        <h2>Task24</h2>
        <nav>
          <ul id={styles.navUL}>
            <li className={styles.navLi}>
              <Link to={"/home"}>Home</Link>
            </li>
            <li className={styles.navLi}>
              <Link to={"/todo"}>ToDo</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;