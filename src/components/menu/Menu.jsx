import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./menu.css";

const Menu = () => {

  const Links = [
    { name: "Events", link: "/" },
    { name: "My Tickets", link: "/" },
    { name: "About Project", link: "/" },
  ];

  return (
    <nav className={`navbar`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="logo" />
        </Link>

        <ul className={`navbar-links ${open ? "navbar-links-open" : ""}`}>
          {Links.map(({ name, link }) => (
            <li key={name} className="navbar-item">
              {link.startsWith("http") ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-link"
                  style={name !== "Events" ? { color: "#B3B3B3" } : {}}
                >
                  {name}
                </a>
              ) : (
                <Link
                  to={link}
                  className="navbar-link"
                  style={name !== "Events" ? { color: "#B3B3B3" } : {}}
                >
                  {name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <Link to="/Ticket" className="ticket-btn-container">
          <button className="ticket-btn">MY TICKETS</button>
          <i className='bx bx-right-arrow-alt'></i>
        </Link>


      </div>
    </nav>
  );
};

export default Menu;
