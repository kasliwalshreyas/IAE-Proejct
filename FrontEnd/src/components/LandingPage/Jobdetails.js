import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../../hooks/request-hook";
const Jobdetails = (props) => {
  const navigate = useNavigate()
  let { compname, duration, salary, position, location, score } = props;

  const FillSurveyHandler = (e) => {
    // e.preventDefault()
    localStorage.setItem("companyName", compname)
    navigate('/formd')
  }



  return (
    <div>
      <div className="my-3">
        <div className="cardsss">
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
            <button className="btn btn-primary" onClick={FillSurveyHandler}>Fill Survey</button>
            {/* </Link> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Jobdetails;
