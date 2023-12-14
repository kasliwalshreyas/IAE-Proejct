import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import { useRequest } from "../../hooks/request-hook";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";

const isSearch = (value) => value.trim() !== "";

const Landingpage = () => {
  const { sendRequest } = useRequest();
  const [data, setData] = useState([]);
  const [getSkills, setSkills] = useState([])
  const {
    value: Search,
    reset: resetSearch,
    valueChangeHandler: searchChange,
  } = useInput(isSearch);
  const {
    value: Place,
    reset: resetLocation,
    valueChangeHandler: searchLocation,
  } = useInput(isSearch);
  const navigate = useNavigate();
  let dat;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (localStorage.hasOwnProperty("userid")) {
          const responseData = await sendRequest(
            "https://backend-sih.onrender.com/users/details",
            "POST",
            JSON.stringify({
              user: localStorage.getItem("userid"),
            }),
            {
              "Content-Type": "application/json",
            }
          );
          responseData.map((data) => setData(data));
          // setData(responseData)
          //  setData(responseData.info)
        }
      } catch (err) {
        console.log(err);
      }

    };

    const fetchSkills = async () => {
      try {
        if (localStorage.hasOwnProperty("userid")) {
          const responseData = await sendRequest(
            'https://backend-sih.onrender.com/skills/getSkills',
            'POST',
            JSON.stringify({
              userid: localStorage.getItem("userid")
            }),
            {
              "Content-Type": "application/json",
            }
          );
          console.log(responseData)
          setSkills(responseData)

        }
      } catch (err) {
        console.log(err)
      }

    };

    fetchUsers();
    fetchSkills();

    // console.log(getSkills)
  }, [sendRequest]);

  console.log(getSkills, "errfjwfkj")
  useEffect(() => {
    const fetchJobs = async () => {

      try {
        if (localStorage.hasOwnProperty("userid")) {
          const responseData = await sendRequest(
            'https://backend-sih.onrender.com/jobs/recommendjobs',
            'POST',
            JSON.stringify({
              user: localStorage.getItem("userid"),
              skill: getSkills
            }),
            {
              "Content-Type": "application/json",
            }
          );
          console.log(responseData)
          // setSkills(responseData)

        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchJobs()
  }
    , [sendRequest, getSkills])


  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await sendRequest(
      "https://backend-sih.onrender.com/jobs/loginsearch",
      "POST",
      JSON.stringify({ search: Search, place: Place }),
      { "Content-Type": "application/json" }
    );
    console.log(response);
    navigate("/newsearch", { state: response });

    resetLocation();
    resetSearch();
  };

  return (
    <>
      <NavBar />
      <div>
        <div className="contain">
          <form
            className="search d-flex my-5"
            role="search"
            onSubmit={submitHandler}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={Search}
              onChange={searchChange}
              autoComplete="on"
            />
            <div className="contain">
              <input
                className="form-control"
                type="search"
                placeholder="Location"
                aria-label="Search"
                value={Place}
                onChange={searchLocation}
                autoComplete="on"
              />
            </div>
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
        {/* <div className="container">
          <div className="containers">
            <div className="left">
              <div className="jobs">
                <div className="conta d-flex">
                  <h2 className="head">Jobs</h2>
                </div>

                <div className="options">
                  <h3 className="title">CillyFox</h3>
                  <p className="service">Liquid eLearning Services</p>
                  <h6 className="time">Time Period : 3 Months</h6>
                  <h6 className="proglanguage">Language : Python</h6>
                </div>
                <div className="options">
                  <h3 className="title">CillyFox</h3>
                  <p className="service">Liquid eLearning Services</p>
                  <h6 className="time">Time Period : 3 Months</h6>
                  <h6 className="proglanguage">Language : Python</h6>
                </div>
                <div className="options">
                  <h3 className="title">CillyFox</h3>
                  <p className="service">Liquid eLearning Services</p>
                  <h6 className="time">Time Period : 3 Months</h6>
                  <h6 className="proglanguage">Language : Python</h6>
                </div>
              </div>
            </div>
            <div className="right">
              <h2 className="head">Profile</h2>
              <div className="options">
                <div className="ima">
                  <div className="image">
                    <i className="fa-solid fa-user prof"></i>
                  </div>
                </div>
                <div className="deta">
                  <h3 className="name">{data.name}</h3>
                  <p className="text">
                    <small className="text-muted">{data.email}</small>
                  </p>
                  <div className="butt d-flex justify-content-md-center">
                    <Link to="/profile">
                      <button className="btn btn-primary">
                        Update Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="addjobs d-flex justify-content-center m-4">
          <Link to="/addnewemployerjobs">
            <button className="btn btn-primary">Add New Job</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landingpage;
