import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import classes from "./progressbar.module.css";

function Progressbar(props) {
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (percentage < props.score) {
        setPercentage(percentage + 1);
      }
    }, 15);
  }, [percentage]);

  return (
    <div className="app">
      <h2 className={classes.jobsatis}>Current Job Satisfaction</h2>
      <div className="container" style={{ width: 240 }}>
        <CircularProgressbar
          value={props.score * 2}
          text={`${props.score * 2}%`}
        />
      </div>
    </div>
  );
}

export default Progressbar;
