import React, { useState, useEffect } from "react";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { active } = props;
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <div className="nav-container">
      <nav className="navbar">
        <div className="nav-background">
          <ul className="nav-list">
            <li className={active === "Home" ? "nav-item active" : "nav-item"}>
              <Link to="/">Home</Link>
            </li>
            <li className={active === "Aboutme" ? "nav-item active" : "nav-item"}>
              <Link to="/Aboutme">About me</Link>
            </li>
            <li className={active === "Projects" ? "nav-item active" : "nav-item"}>
              <Link to="/Projects">Projects</Link>
            </li>
            <li className={active === "Contact" ? "nav-item active" : "nav-item"}>
              <Link to="/contact">Contact</Link>
            </li>
            <li className="theme-toggle">
              <button type="button" className="btn"onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
