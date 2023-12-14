import React, { useState, useEffect } from "react";
import { useRequest } from "../../hooks/request-hook";
import classes from "./SalarySatisfaction.module.css";

var experience = []
var salary = []
function SalarySatisfaction(props) {
  const { sendRequest } = useRequest();

  const submitHandler = async (e) => {
    const response = await sendRequest(
      "https://backend-sih.onrender.com/jobs/getsalaray",
      "POST",
      JSON.stringify({}),
      { "Content-Type": "application/json" }
    );
    response.map((data) => experience.push(data.experience));
    response.map((data) => salary.push(data.salary));

  };
  useEffect(() => {
    submitHandler()
  }, []);

  let bgCol = "";
  const [bgColor, setbgColor] = useState("");
  useEffect(() => {
    setbgColor(bgCol)
    satisfaction();
  }, [bgColor, satisfaction]);
  function avgSal(exp) {
    let varSum = 0;
    let sz = 0;

    for (let x = 0; x < salary.length; x++) {
      if (experience[x] == exp) {
        varSum = varSum + salary[x];
        sz++;
      }
    }
    let avg = 0;
    if (sz != 0) {
      avg = varSum / sz;
    }
    return avg;
  }

  function satisfaction() {

    let temp = "";
    const averg = avgSal(Number(props?.currentJob?.duration));
    const currentSal = props?.currentJob?.salary;
    if (currentSal < (4 * averg) / 5) {
      bgCol = "red"
      temp = "Needed improvement"

    }
    else if (currentSal >= (4 * averg) / 5 && currentSal < averg) {
      temp = "Decent"
      bgCol = "orange"

    }
    else if (currentSal < (6 * averg) / 5 && currentSal >= averg) {
      temp = "Good"
      bgCol = "yellow"
    }
    else if (currentSal >= (6 * averg) / 5) {
      temp = "Great!"
      bgCol = "green"
    }
    return temp;
  }
  return (
    <>
      <div className={classes.container} style={{ backgroundColor: `${bgColor}` }}>
        Salary Status:{'\n'}
        {satisfaction()}
      </div>
    </>
  );
}

export default SalarySatisfaction;
