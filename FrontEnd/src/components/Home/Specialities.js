import React from "react";
import classes from "./Home.module.css";
import { useEffect } from "react";
import { useRequest } from "../../hooks/request-hook";
const Specialities = () => {
  //   const {sendRequest} =  useRequest()
  //   useEffect(()=>{

  //     const fetchTop = async()=>{
  //       const responseData = await sendRequest(
  //       "https://backend-sih.onrender.com/jobs/topjobs",
  //       'GET',
  //       {
  //         "Content-Type": "application/json",
  //       }
  //     );

  //   }
  // fetchTop()
  // },[])
  return (
    <>
      <div className={classes.main}>
        <div className={classes.he}>
          <h3>Job search according to the Location and Job Title</h3>
        </div>
        <div className={classes.cssstyle}>
          <div className={classes.im}>
            <img
              src={require("./jobslocation.jpg").default}
              height="180"
              width="180"
            />
          </div>
          <div className={classes.para}>
            <h6>
              This is a personalised website offering the users to search jobs according to their location and the required Job Title
            </h6>
          </div>
        </div>
      </div>
      <div className={classes.main}>
        <div className={classes.he}>
          <h3>Recommending Job according to their skill</h3>
        </div>
        <div className={classes.cssstyle}>
          <div className={classes.im}>
            <img
              src={require("./recommend.png").default}
              height="180"
              width="180"
            />
          </div>
          <div className={classes.para}>
            <h6>
              We recommend jobs as per the skills the user has acquired, making it much easier for the user.
            </h6>
          </div>
        </div>
      </div>
      <div className={classes.main}>
        <div className={classes.he}>
          <h3>Keep a track of your career</h3>
        </div>
        <div className={classes.cssstyle}>
          <div className={classes.im}>
            <img
              src={require("./keep.png").default}
              height="180"
              width="180"
            />
          </div>
          <div className={classes.para}>
            <h6>
              We dont just leave our users after they get the job, we track their progress and see if the current job is according to their standard.
            </h6>
          </div>
        </div>
      </div>

      <br></br>

      <h3>Explore Top Companies Hiring Now</h3>

      <div className="container">
        <div className="row">
          <div className={["col-md-4", classes.main1].join(" ")}>
            <h4>Kay Labs</h4>
            <h6>Unica</h6>
            <h6>500000</h6>
          </div>
          <div className={["col-md-4", classes.main1].join(" ")}>
            <h4>Corporate Search</h4>
            <h6>Software Developer</h6>
            <h6>4500000</h6>
          </div>
          <div className={["col-md-4", classes.main1].join(" ")}>
            <h4>Apisero</h4>
            <h6>Marketing Head</h6>
            <h6>4000000</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Specialities;
