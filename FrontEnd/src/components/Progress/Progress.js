import React from "react";
import NavBar from "../NavBar/NavBar";
import CurrJobdetails from "./CurrJobdetails";
import { Link } from "react-router-dom";
import classes from "./progress.module.css";
import BarGraph from "./BarGraph";
import Progressbar from "../ProgressBar/Progressbar";
import { useEffect, useState } from "react";
import { useRequest } from "../../hooks/request-hook";
import SalarySatisfaction from "./SalarySatisfaction";

const Progress = () => {
  const { sendRequest } = useRequest();
  const [currJobs, setCurrJobs] = useState([]);
  const [score, setScore] = useState([]);
  var temp2 = [1];
  useEffect(() => {
    const fetchcurrJobs = async () => {
      try {
        if (localStorage.hasOwnProperty("userid")) {
          const responseData = await sendRequest(
            "https://backend-sih.onrender.com/jobs/getcurrjobs",
            "POST",
            JSON.stringify({
              userid: localStorage.getItem("userid"),
            }),
            {
              "Content-Type": "application/json",
            }
          );
          setCurrJobs(responseData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const getCurrJobScore = async () => {
      if (localStorage.hasOwnProperty("userid")) {
        const responseData = await sendRequest(
          "https://backend-sih.onrender.com/jobScore/getCurrJobScore",
          "POST",
          JSON.stringify({
            userid: localStorage.getItem("userid"),
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setScore(responseData);
        console.log("gygyg", responseData);
      }
    };
    getCurrJobScore();
    fetchcurrJobs();
  }, [sendRequest]);
  let i = 0;
  return (
    <>
      <NavBar />
      <div className="addjobs d-flex justify-content-center m-4">
        <Link to="/addcurrjobs">
          <button className="btn btn-primary">Add Current Job</button>
        </Link>
      </div>
      <div className="container">
        <div className="row progresscss">
          {currJobs.map((data, index) => {
            if (currJobs.length - 1 === index)
              return (
                <div className="col-md-4" key={index}>
                  <CurrJobdetails
                    compname={currJobs[currJobs.length - 1].compname}
                    duration={currJobs[currJobs.length - 1].duration}
                    salary={currJobs[currJobs.length - 1].salary}
                    position={currJobs[currJobs.length - 1].position}
                    location={currJobs[currJobs.length - 1].location}
                    score={score[i++]}
                  />
                </div>
              );
          })}
          <div className="col-md-4">
            <SalarySatisfaction currentJob={currJobs[currJobs.length - 1]} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className={classes.containers}>
          <div className={classes.lefttt}>
            <div className="container my-3">
              <BarGraph />
            </div>
          </div>
          <div className={classes.rightss}>
            <div className="container my-3">
              <Progressbar score={score[0]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Progress;
