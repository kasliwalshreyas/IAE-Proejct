import React, { useState } from "react";
import { useRequest } from "../../hooks/request-hook";
import { useNavigate } from "react-router-dom";
const Addprevjobs = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    compname: "",
    duration: "",
    salary: 0,
    position: "",
    location: "",
  });
  const { sendRequest } = useRequest();
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(job.compname);
    if (localStorage.hasOwnProperty("userid")) {
      const response = await sendRequest(
        "https://backend-sih.onrender.com/jobs/addprevjobs",
        "POST",
        JSON.stringify({
          compname: job.compname,
          duration: job.duration,
          salary: job.salary,
          position: job.position,
          location: job.location,
          userid: localStorage.getItem("userid"),
        }),
        {
          "Content-Type": "application/json",
        }
      );
    }
    navigate("/profile");
    //  console.log(response)
  };

  return (
    <div className="container my-4">
      <h1>Add Jobs</h1>
      <form className="my-3" onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="compname" className="form-label">
            <h4>Company Name</h4>
          </label>
          <input
            type="text"
            className="form-control"
            id="compname"
            value={job.compname}
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
            value={job.duration}
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
            value={job.salary}
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
            value={job.position}
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
            value={job.location}
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

export default Addprevjobs;
