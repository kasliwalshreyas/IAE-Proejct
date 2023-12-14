import React from "react";
import NavBar from "../NavBar/NavBar";
import classes from "../newsearch/newsearch.module.css"
import { useLocation } from "react-router-dom";
const ImagesSearch = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <>
      <NavBar />
      <div className="container my-4">
        <div className="jobs">
          <h1 className={classes.headd}>Jobs</h1>
          {location.state?.map((data) => (
            <div className={classes.optionss}>
              <h3 className={classes.titlee}>{data.company}</h3>
              <h4 className={classes.servicee}>{data.joblocation_address}</h4>
              <h5 className={classes.timee}>{data.payrate}</h5>
              <div className={classes.containerss}>
                <ul className={classes.proglanguagee}>
                  <li className={classes.listtt}>Skills:{data.skills}</li>
                  <br />
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImagesSearch;