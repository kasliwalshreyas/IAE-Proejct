import React, { useEffect } from "react";

// import "react-table-6/react-table.css";
import classes from "../LandingPage/Formd.module.css";
// import { useEffect, useState } from "react";
//import App from './App';
//import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useRequest } from "../../hooks/request-hook";
import FormComponent from "../LandingPage/FormComponent";
let responseSum = 0;

const Formdata = () => {
  const navigate = useNavigate();
  const uid = localStorage.getItem("userid");
  const { sendRequest } = useRequest();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (localStorage.hasOwnProperty("userid")) {
      responseSum = 0;
      for (let i = 1; i <= 5; i++) {
        let qn = "qn" + i;
        // console.log(qn);
        responseSum += parseInt(
          document.querySelector(`input[name=${qn}]:checked`).value
        );
      }
      console.log(responseSum);
      // setEnteredSkill(" ");
      // console.log(EnteredSkill);
      const response = await sendRequest(
        "https://backend-sih.onrender.com/jobScore/addCurrJobScore",
        "POST",
        JSON.stringify({
          userid: localStorage.getItem("userid"),
          companyName: localStorage.getItem("companyName"),
          jobCurrScore: responseSum,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    }
    navigate("/progresstrack");
  };

  return (
    <>
      <h1>Form table</h1>
      <table>
        <tr className={classes.tdItem}>
          <th style={{ textAlign: "center" }}>QUESTIONS</th>
          <td> 1</td>
          <td> 2</td>
          <td> 3</td>
          <td> 4</td>
          <td> 5</td>
          <td> 6</td>
          <td> 7</td>
          <td> 8</td>
          <td> 9</td>
          <td> 10</td>
        </tr>

        <FormComponent qnTitle={"Are you satisfied with your job overall?"} qnNo={"qn1"} />
        <FormComponent
          qnTitle={"Do you feel you are rewarded for your dedication and commitment towards the work?"}
          qnNo={"qn2"}
        />
        <FormComponent qnTitle={"Do you believe that there is an opportunity for individual career growth and development within the company?"} qnNo={"qn3"} />
        <FormComponent qnTitle={"Do your seniors, managers encourage you to give your best effort?"} qnNo={"qn4"} />
        <FormComponent
          qnTitle={"How much would you like to rate our portal"}
          qnNo={"qn5"}
        />
      </table>

      <div className={classes.cont1}>
        <input type="submit" value="Submit" onClick={formSubmitHandler} />
      </div>
    </>
  );
};
export default Formdata;
