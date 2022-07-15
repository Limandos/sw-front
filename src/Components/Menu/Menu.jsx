import React from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

const Menu = () => {
    return (
        <React.Fragment>
            <nav className={styles.menu}>
                <Link to="/">Home</Link>
                <Link to="/films">Films</Link>
                <Link to="/people">People</Link>
                <Link to="/planets">Planets</Link>
                <Link to="/species">Species</Link>
                <Link to="/starships">Starships</Link>
                <Link to="/vehicles">Vehicles</Link>
            </nav>
        </React.Fragment>
    );
}

export default Menu;