import React, { useState, useEffect, useRef } from "react";
// import userImg from "./userProfile.png";
import "./Profile.css";
import FormInput from "./FormInput";
import SkillPanel from "./SkillPanel";
// import UploadAndDisplayImage from "./UploadAndDisplayImage";
import Pastjobs from "../LandingPage/Pastjobs";
import NavBar from "../NavBar/NavBar";
import { useRequest } from "../../hooks/request-hook";
// import { db } from "../../../../BackEnd/models/formModel";
// import userModel from "../../../BackEnd/m"

export default function Profile(props) {
  const uid = localStorage.getItem("userid");
  const [divblock, setDivblock] = useState("flex");
  const [csstyle, setCsstyle] = useState("none");
  const [image1, setImage1] = useState(null);
  const [added, setAdded] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const showForm = () => {
    console.log(displayForm);
    setStyle("block");
  };
  const { sendRequest } = useRequest();
  const [data, setData] = useState([]);

  const fileRef = useRef(null);
  let formData = new FormData();
  // console.log("rendering", useridpr);
  const onImageChange = async (event) => {
    // console.log("meet", event);
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setImage1(URL.createObjectURL(event.target.files[0]));
    }
    setDivblock("none");
    setCsstyle("flex");
  };
  const updateProfHandller = async (e) => {
    e.preventDefault();
    // console.log("meet", formData);
    if (localStorage.hasOwnProperty("userid")) {
      formData.append("userid", uid);
      formData.append("file", fileRef.current.files[0]);
      try {
        const responseData = await sendRequest(
          "https://backend-sih.onrender.com/users/updateProfilePicture",
          "POST",
          formData
        );
        setAdded(true);
        setDivblock("flex");
        setCsstyle("none");
        setImage1(null);
        fileRef.current.files[0] = null;
      } catch (err) {
        console.log(err);
      }
    }
  };

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
          setCurrentUser(responseData[0]);
          responseData.map((data) => setData(data));
          //  console.log(responseData.info)
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, [sendRequest, added]);

  // const loadFile = function (event) {
  //   var image = document.getElementById("output");
  //   image.src = URL.createObjectURL(event.target.files[0]);
  //   console.log(image.src);
  // };

  // const updateProfile = (event) => {
  //   setEnteredSkill(event.target.value);
  // };

  // console.log(data);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredDetails = {
      name: EnteredName,
      location: EnteredLocation,
      phoneNo: EnteredPhoneNo,
      dob: new Date(EnteredDate),
    };
    // console.log(EnteredName);
    // db.userModel.updateOne(EnteredName)
    // data.name = EnteredName;

    const response = await sendRequest(
      "https://backend-sih.onrender.com/users/updateProfile",
      "POST",
      JSON.stringify({
        userid: uid,
        name: EnteredName,
        location: EnteredLocation,
      }),
      {
        "Content-Type": "application/json",
      }
    );
    console.log(response);
  };

  // db.userModel.up

  const nameChange = (event) => {
    setEnteredName(event.target.value);
    // console.log(event.target.value)
  };
  const locationChange = (event) => {
    setEnteredLocation(event.target.value);
    // console.log(event.target.value)
  };
  const phonenoChange = (event) => {
    setEnteredPhoneNo(event.target.value);
    // console.log(event.target.value)
  };
  const dateChange = (event) => {
    setEnteredDate(event.target.value);
    // console.log(event.target.value)
  };
  // const monthChange = (event) =>{
  //   setEnteredMonth(event.target.value);
  //   // console.log(event.target.value)
  // }
  // const yearChange = (event) =>{
  //   setEnteredYear(event.target.value);
  //   // console.log(event.target.value)
  // }
  const gender = (event) => {
    setEnteredGender(event.target.value);
    console.log(event.target.value);
  };

  const saveChanges = () => {
    setFilledName(EnteredName);
    setFilledLocation(EnteredLocation);
    setFilledPhoneNo(EnteredPhoneNo);
    setFilledDate(EnteredDate);
    setFilledGender(EnteredGender);
    // console.log(displayForm);
    setStyle("none");
  };

  const [displayForm, setStyle] = useState("none");
  const [EnteredName, setEnteredName] = useState("Name");
  const [FilledName, setFilledName] = useState("Name");
  const [EnteredLocation, setEnteredLocation] = useState("Location");
  const [FilledLocation, setFilledLocation] = useState("Location");
  const [EnteredPhoneNo, setEnteredPhoneNo] = useState("Phone");
  const [FilledPhoneNo, setFilledPhoneNo] = useState("Phone");
  const [EnteredDate, setEnteredDate] = useState("DOB");
  const [FilledDate, setFilledDate] = useState("DOB");
  // const [EnteredMonth, setEnteredMonth] = useState("");
  // const [EnteredYear, setEnteredYear] = useState("");
  const [EnteredGender, setEnteredGender] = useState("Gender");
  const [FilledGender, setFilledGender] = useState("Gender");

  return (
    <>
      <NavBar />
      <div className="container">
        <div id="profile">
          <div className="basic-info my-4">
            <div className="profile-image">
              <div className="profileCover">
                <img
                  className="profileUserImg"
                  src={
                    currentUser.profilePicture
                      ? currentUser.profilePicture
                      : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                  }
                  alt=""
                />
              </div>
              {localStorage.getItem("userid") === uid ? (
                <div className={`updatePict d-${divblock}`}>
                  <label className="btn btn-outline-info my-2">
                    <input
                      type="file"
                      className="inputfilecss"
                      onChange={onImageChange}
                      name="file"
                      ref={fileRef}
                    />
                    Update Profile Photo
                  </label>
                </div>
              ) : (
                <div></div>
              )}
              <div className={`postimgggg my-2 d-${csstyle}`}>
                <img className="newimggg mx-3" src={image1} alt="Loading" />
                <button
                  className="addpost btn btn-outline-info"
                  onClick={updateProfHandller}
                  disabled={image1 ? false : true}
                >
                  Change Image
                </button>
              </div>
            </div>
            <div className="details">
              <ul className="detailsul-1">
                <li>{data.name}</li>
                <li>{data.location}</li>
              </ul>
              <ul className="detailsul-2">
                {/* <li>{FilledPhoneNo}</li> */}
                <li>{data.mobilenumber}</li>
                <li>{data.email}</li>
                <button className="btn btn-primary detailedit" onClick={showForm}>
                  Edit
                </button>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="form-container container"
          style={{ display: `${displayForm}`, position: "relative" }}
        >
          <form onSubmit={submitHandler}>
            <div className="row container">
              <h4>Edit Details</h4>
              <div className=" input-group input-group-icon iconissue">
                <input
                  type="text"
                  placeholder="Full Name"
                  // id="username"
                  size="50"
                  name="fullName"
                  onChange={nameChange}
                />
                <div className="input-icon">
                  <i className="fa fa-user"></i>
                </div>
              </div>
              <div className="input-group input-group-icon iconissue">
                {/* <label htmlFor="locationTextField"></label> */}
                <input
                  // id="locationTextField"
                  type="text"
                  size="50"
                  placeholder="Current Location"
                  name="location"
                  onChange={locationChange}
                />
                {/* <input type="email" placeholder="Email Adress"/> */}

                <div className="input-icon">
                  <i className="fa fa-envelope"></i>
                </div>
              </div>
              <div className="input-group input-group-icon">
                <input
                  type="number"
                  placeholder="Phone Number"
                  size="50"
                  name="phNo"
                  onChange={phonenoChange}
                />
                <div className="input-icon">
                  <i className="fa fa-key"></i>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-half">
                <h4>Date of Birth</h4>
                <div className="input-group">
                  <div className="col-third">
                    <input
                      type="date"
                      name="day"
                      size="50"
                      onChange={dateChange}
                      style={{ width: "260px" }}
                    />
                  </div>
                  {/* <div className="col-third">
                  <input type="text" placeholder="MM" name="month" onChange={monthChange}/>
                </div>
                <div className="col-third">
                  <input type="text" placeholder="YYYY" name="year"onChange={yearChange} />
                </div> */}
                </div>
              </div>
              <div className="col-half">
                <h4>Gender</h4>
                <div className="input-group">
                  <input
                    id="gender-male"
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={gender}
                  />
                  <label htmlFor="gender-male">Male</label>
                  <input
                    id="gender-female"
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={gender}
                  />
                  <label htmlFor="gender-female">Female</label>
                </div>
              </div>
            </div>

            <button className="submit-btn btn btn-primary" onClick={saveChanges}>
              Save Changes
            </button>
            {/* <input type="submit">Save Changes</input> */}
          </form>
        </div>

        <div className="SkillPanel my-5">
          <SkillPanel />
        </div>
      </div>
      <div className="pastJobs my-2">
        <Pastjobs />
      </div>


      {/* <EditInfo /> */}
    </>
  );
}
