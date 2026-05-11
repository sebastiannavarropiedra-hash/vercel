import React from "react";
import '../Styles/Navbar.css'
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";



const Navbar = (props) => {
    const { active } = props;

    return (
        <React.Fragment>
            <div className="nav-container">
                <nav className="navbar">
                    <div className="nav-background">
                        <ul className="nav-list">
                            <li
                                className={
                                    active === "Home"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link to="/">Home</Link>
                            </li>
                            <li
                                className={
                                    active === "Aboutme"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link to="/Aboutme">About me</Link>
                            </li>
                            <li
                                className={
                                    active === "Projects"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link to="/Projects">Projects</Link>
                            </li>

                            <li
                                className={
                                    active === "Contact"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </React.Fragment>
    );
};

export default Navbar;