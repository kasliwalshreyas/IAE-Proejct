import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import { useRequest } from "../../hooks/request-hook";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import Headers from "../header/header";
import LoadingSpinner from '../../Design/UIElements/LoadingSpinner'
const isSearch = (value) => value.trim() !== "";

const Landingpage = () => {
  const [loading, setloading] = useState(true)
  const { sendRequest } = useRequest();
  const [data, setData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [image, setImage] = useState("");

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
          setImage(responseData[0].profilePicture);
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
          // console.log(responseData)
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

  // console.log(getSkills,"errfjwfkj")
  useEffect(() => {
    const fetchJobs = async () => {
      // setloading(true)
      try {
        if (localStorage.hasOwnProperty("userid")) {
          // setloading(true)
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
          // console.log(responseData)

          setJobs(responseData)

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
    // console.log(response);
    navigate("/newsearch", { state: response });

    resetLocation();
    resetSearch();
  };

  return (
    <>
      {localStorage.hasOwnProperty("userid") ? <NavBar /> : <Headers />}
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
            <button className="btn btn-outline-success mx-2" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="container">
          <div className="containers">
            <div className="left">
              <div className="jobs">
                <div className="conta d-flex">
                  <h2 className="head">Recommended jobs according to Skills </h2>
                </div>
                {/* {console.log(jobs,'is the jobs ijskjf')} */}
                {/* {loading && <LoadingSpinner />} */}
                {/* {!loading && console.log(jobs,'flkfkw') */}
                {jobs.length != 0 && jobs?.map(data =>
                  <div className="options">
                    <h3 className="title">{data.company}</h3>
                    <p className="service">{data.jobtitle}</p>
                    <h6 className="time">Experience Required:{data.experience} years</h6>
                    <h6 className="proglanguage">{data.industry}</h6>
                    <h6>{data.joblocation_address}</h6>
                    {/* <h6>Skills Preffered : {data.skills.map(dat=> dat+ ',')}</h6> */}
                  </div>)
                }
                {!jobs.length && <p>Jobs Loading</p>}


              </div>
            </div>
            <div className="right">
              <h2 className="head">Profile</h2>
              <div className="options">
                <div className="imageprof">
                  <img className="proffimage" src={image} alt="Loading">
                  </img>
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
        </div>
      </div>
    </>
  );
};

export default Landingpage;
