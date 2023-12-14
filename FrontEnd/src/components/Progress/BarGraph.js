import { Bar } from "react-chartjs-2";
import React from "react";
// import {CategoryScale} from 'chart.js';
// Bar.register(CategoryScale);
import Chart from "chart.js/auto";
import classes from "./BarGraph.module.css";
import { useRequest } from "../../hooks/request-hook";
import { useEffect, useState } from "react";

function BarGraph() {
  const { sendRequest } = useRequest();
  const [jobsSalary, setJobsSalary] = useState([]);
  const [jobsname, setJobsname] = useState([]);

  useEffect(() => {
    const fetchJobsSalary = async () => {
      try {
        if (localStorage.hasOwnProperty("userid")) {
          const responseData = await sendRequest(
            "https://backend-sih.onrender.com/jobs/getjobssalary/",
            "POST",
            JSON.stringify({
              userid: localStorage.getItem("userid"),
            }),
            {
              "Content-Type": "application/json",
            }
          );
          setJobsSalary(responseData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchJobsSalary();
    const fetchJobsName = async () => {
      try {
        if (localStorage.hasOwnProperty("userid")) {
          const responseData = await sendRequest(
            "https://backend-sih.onrender.com/jobs/getjobsname/",
            "POST",
            JSON.stringify({
              userid: localStorage.getItem("userid"),
            }),
            {
              "Content-Type": "application/json",
            }
          );
          setJobsname(responseData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchJobsName();
  }, [sendRequest]);
  return (
    <div className={classes.barCont}>
      <div>
        <Bar
          data={{
            labels: jobsname,
            datasets: [
              {
                label: "Salary (in lpa)",
                data: jobsSalary,
                backgroundColor: ["aqua", "green", "red", "yellow"],
                borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 0.5,
              },
            ],
          }}
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default BarGraph;
