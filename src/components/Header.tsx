import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  let location = useLocation();

  // TODO: Possibly rework to be easier to understand
  const titalize = () => {
    let locationName = location.pathname.split("/")[1];
    if (locationName === "") {
      return "Todo List";
    } else {
      locationName.split("-").forEach((word) => {
        locationName = locationName
          .replace(word, word[0].toUpperCase() + word.slice(1))
          .replace("-", " ");
      });
      return locationName;
    }
  };

  return (
    <div className="header-container">
      {location.pathname === "/" ? null : (
        <Link className="header-link" to="/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      )}
      <h1 className="header-title">{titalize()}</h1>
    </div>
  );
};

export default Header;
