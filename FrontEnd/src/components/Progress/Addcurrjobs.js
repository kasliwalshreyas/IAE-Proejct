import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRequest } from "../../hooks/request-hook";
import { useNavigate } from "react-router-dom";
const Addcurrjobs = () => {
  const navigate = useNavigate();
  const [addcurrjob, setAddcurrjob] = useState({
    compname: "",
    duration: "",
    salary: 0,
    position: "",
    location: "",
  });
  const { sendRequest } = useRequest();
  const handleChange = (e) => {
    setAddcurrjob({ ...addcurrjob, [e.target.name]: e.target.value });
  };

  const currsubmit = async (e) => {
    e.preventDefault();
    if (localStorage.hasOwnProperty("userid")) {
      const response = await sendRequest(
        "https://backend-sih.onrender.com/jobs/addcurrjobs",
        "POST",
        JSON.stringify({
          compname: addcurrjob.compname,
          duration: addcurrjob.duration,
          salary: addcurrjob.salary,
          position: addcurrjob.position,
          location: addcurrjob.location,
          userid: localStorage.getItem("userid"),
        }),
        {
          "Content-Type": "application/json",
        }
      );
    }
    navigate("/progresstrack");
  };

  return (
    <div className="container my-4">
      <h1>Add Jobs</h1>
      <form className="my-3" onSubmit={currsubmit}>
        <div className="mb-3">
          <label htmlFor="compname" className="form-label">
            <h4>Company Name</h4>
          </label>
          <input
            type="text"
            className="form-control"
            id="compname"
            value={addcurrjob.compname}
            name="compname"
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">
            <h4>Duration</h4>
          </label>
          <input
            type="text"
            className="form-control"
            id="duration"
            value={addcurrjob.duration}
            onChange={handleChange}
            name="duration"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            <h4>Salary</h4>
          </label>
          <input
            type="text"
            className="form-control"
            id="salary"
            value={addcurrjob.salary}
            onChange={handleChange}
            name="salary"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="position" className="form-label">
            <h4>Position</h4>
          </label>
          <input
            type="text"
            className="form-control"
            value={addcurrjob.position}
            onChange={handleChange}
            id="position"
            name="position"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            <h4>Location</h4>
          </label>
          <input
            type="text"
            className="form-control"
            value={addcurrjob.location}
            onChange={handleChange}
            id="location"
            name="location"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addcurrjobs;
