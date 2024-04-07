import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = ({ handleOptionChange }) => {
  const navbarDropdownOptions = [
    { id: 1, text: "Booking Page", link: "/" },
    { id: 2, text: "Dashboard", link: "/dashboard" },
  ];

  const getOptionFromPath = (pathname) => {
    return navbarDropdownOptions.find((option) => option.link === pathname);
  };

  const [selectedOption, setSelectedOption] = useState(
    navbarDropdownOptions[0].id
  );

  const location = useLocation();

  useEffect(() => {
    const option = getOptionFromPath(location.pathname);
    setSelectedOption(option.id.toString());
  }, [location.pathname]);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <span className="navbar-text">Authenticate Bus Booking</span>
        </div>
        <div className="navbar-right">
          {navbarDropdownOptions.map((option) => (
            <Link
              key={`nav-${option.text}-${option.id}`}
              to={option.link}
              className={`navbar-link ${
                location.pathname === option.link ? "active" : ""
              }`}
            >
              {option.text}
            </Link>
          ))}
          <div className="dropdown">
            <select
              name="dropdown-input"
              id="booking-pages"
              onChange={(e) => handleOptionChange(e.target.value)}
              value={selectedOption}
            >
              {navbarDropdownOptions.map((option) => (
                <option key={`${option.text}-${option.id}`} value={option.id}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
