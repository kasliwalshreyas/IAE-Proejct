import React from "react";
import classes from "./progress.module.css";
import { useNavigate } from "react-router-dom";

const CurrJobdetails = (props) => {
  const navigate = useNavigate();
  let { compname, duration, salary, position, location, score } = props;

  const FillSurveyHandler = (e) => {
    // e.preventDefault()
    localStorage.setItem("companyName", compname);
    navigate("/formdata");
  };

  return (
    <div>
      <div className="my-2">
        <div className={["card border-0", classes.currjobs].join(" ")}>
          <div className="card-body">
            <h5 className="card-title text-center">{compname}</h5>
            <p className="card-text">{duration}</p>
            <p className="card-text">{salary}</p>
            <p className="card-text">{location}</p>
            <p className="card-text">Job Score based on Survey : {score}</p>
            <p className="card-text">
              <small className="text-muted">Positioned as {position}</small>
            </p>
            <p>
              {/* <Link to="/formd"> */}
              <button className="btn btn-primary" onClick={FillSurveyHandler}>
                Fill Survey
              </button>
              {/* </Link> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrJobdetails;
