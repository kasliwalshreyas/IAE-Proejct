import { useRequest } from "../../hooks/request-hook";
import useInput from "../../hooks/useInput";
import { useState } from "react";
import Joblist from "./Joblist";
import LoadingSpinner from "../../Design/UIElements/LoadingSpinner";
import StateList from "./countries-states-cities";
import Topjobs from "./Topjobs";
import Specialities from "./Specialities";
import { useNavigate } from "react-router-dom";

const isSearch = (value) => value.trim() !== "";
const Search = () => {
  const navigate = useNavigate()
  const [Loading, setLoading] = useState(false);
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

  // const [details, setDetails] = useState([]);
  const { sendRequest } = useRequest();
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
      <div>{Loading && <LoadingSpinner />}</div>

      {/* <StateList /> */}
      <Specialities />
      <Topjobs />
      {/* <Joblist details={details} /> */}
    </>
  );
};

export default Search;
