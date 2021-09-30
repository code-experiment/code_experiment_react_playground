import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPlusCircle,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-wrapper">
      <nav className="nav-container">
        <NavLink exact to="/" className="nav-item nav-todo-list">
          <FontAwesomeIcon icon={faCheckCircle} />
          <div className="nav-item-text">ToDo List</div>
        </NavLink>
        <NavLink to="add-todo" className="nav-item nav-add-todo">
          <FontAwesomeIcon icon={faPlusCircle} />
        </NavLink>
        <NavLink to="profile" className="nav-item nav-profile">
          <FontAwesomeIcon icon={faUserCircle} />
          <div className="nav-item-text">Profile</div>
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
