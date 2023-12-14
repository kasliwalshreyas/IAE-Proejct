import React from "react";
import { Navigate } from "react-router-dom";
import { useRequest } from "../../hooks/request-hook";
import { useNavigate } from "react-router-dom";
function LandingPageImage(props) {
  const navigate = useNavigate()
  const { sendRequest } = useRequest()
  const imgLink = props.imgLink;
  const jobType = props.jobType;
  const value = props.value;
  const skillarr = [
    "Gardening",
    "Carpenter",
    "Electrician",
    "Painters",
    "Cycle Repair Workers",
    "Plumbers",
    "Car Repair Workers",
    "House Keeper",
    "Chef",
    "Construction",
    "Cleaner",
    "Road Repair Workers",
    "C",
    "C++",
    "Python",
    "Java",
    "Farmer"
  ];

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(skillarr[e.target.value]);
    const response = await sendRequest(
      "https://backend-sih.onrender.com/nontc/showjobs",
      "POST",
      JSON.stringify({
        clicked: skillarr[e.target.value]
      }),
      {
        "Content-Type": "application/json",
      }
    );
    console.log(response)
    navigate("/imagesSearch", { state: response })
  };
  let i = 0;
  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
        rel="stylesheet"
      ></link>

      {/* <div class="col-lg-2 col-sm-8"> */}
      <div className="imgCont">
        <div class="thumbail">
          <img
            // src="https://onlyveggies.net/wp-content/uploads/2020/01/beautiful-woman-works-in-a-garden-near-the-house-HA2PMAQ-scaled.jpg"
            src={props.imgLink}
            alt="Loading"
          ></img>
          <br></br>
          {/* <button class="btn btn-dark">Gardening</button> */}
          <button className="btn btn-light" value={value} onClick={handleClick}>
            {props.jobType}
          </button>
        </div>
      </div>
    </>
  );
}

export default LandingPageImage;
