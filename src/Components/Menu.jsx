import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <React.Fragment>
            <nav>
                <Link to="/">Home Page </Link>
                <Link to="/people">People </Link>
                <Link to="/planets">Planets </Link>
                <Link to="/films">Films </Link>
            </nav>
        </React.Fragment>
    );
}

export default Menu;