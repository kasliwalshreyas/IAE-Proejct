import React, { useState, useEffect } from "react";
// import "./SkillPanel.css";
import classes from "./SkillPanel.module.css";
import { useRequest } from "../../hooks/request-hook";
import { useNavigate } from "react-router-dom";

function SkillPanel() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const uid = localStorage.getItem("userid");
  // const [addskill, setAddskill] = useState(arr);
  const { sendRequest } = useRequest();
  const tempFunc = (skill) => {
    setData(data.filter((skills) => skills != skill));
  };

  const [EnteredSkill, setEnteredSkill] = useState("");
  const addTag = () => {
    console.log(EnteredSkill);
    // arr.push(EnteredSkill);
    // setAddskill(arr)
    // console.log(arr);
    setData((prevstate) => {
      let newState = [...prevstate, EnteredSkill];
      return newState;
    });
    // setEnteredSkill(" ");
  };

  const addSkill = (event) => {
    setEnteredSkill(event.target.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (localStorage.hasOwnProperty("userid")) {
          const responseData = await sendRequest(
            "https://backend-sih.onrender.com/skills/getSkills",
            "POST",
            JSON.stringify({
              userid: localStorage.getItem("userid"),
            }),
            {
              "Content-Type": "application/json",
            }
          );
          console.log(responseData)
          setData(responseData);
          // setData(responseData)
          //  setData(responseData.info)
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  // const [displayInputField, setStyle] = useState("none");
  const submitSkills = async (e) => {
    e.preventDefault();
    setEnteredSkill(" ");
    console.log(EnteredSkill);
    const response = await sendRequest(
      "https://backend-sih.onrender.com/skills/addskills",
      "POST",
      JSON.stringify({
        userid: uid,
        skills: data,
      }),
      {
        "Content-Type": "application/json",
      }
    );
    console.log(response);
    navigate("/profile");
    // console.log(response.skill.skills);
  };

  return (
    <div className={classes.bg}>
      <div className={classes.head}>
        <h1>Skills</h1>
      </div>

      <div className={classes.tagDiv}>
        <ul className={classes.sKillUL}>
          {data.map((skill, index) => (
            <div>
              <li key={index}>
                {skill}
                <button
                  className={[classes.close, classes.skillBtn].join(" ")}
                  onClick={() => tempFunc(skill)}
                >
                  <i className="fa-solid  fa-circle-xmark"></i>
                </button>
              </li>
            </div>
          ))}
          <li>
            <div className={classes.inputField}>
              <input
                className={classes.skillInput}
                type="text"
                id="addSkill"
                name="addSkill"
                placeholder="add a skill"
                onChange={addSkill}
              />
            </div>
            <button
              className={[classes.close, classes.skillBtn].join(" ")}
              role="button"
            >
              <i className="fa-solid fa-2x fa-plus" onClick={addTag}></i>
            </button>
          </li>
          <button
            className="btn btn-primary saveskills mx-2"
            onClick={submitSkills}
          >
            Save Skills
          </button>
        </ul>
      </div>
    </div>
  );
}

export default SkillPanel;
