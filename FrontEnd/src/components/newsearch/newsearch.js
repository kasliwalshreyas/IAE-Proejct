import { useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import classes from "./newsearch.module.css";
import Headers from "../header/header";


const Newsearch = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <>
      {localStorage.hasOwnProperty("userid") ? <NavBar /> : <Headers />}

      <div className="container my-4">
        <div className="jobs">
          <h1 className={classes.headd}>Available Jobs</h1>
          {location.state?.map((data) => (
            <div className={classes.optionss}>
              <h3 className={classes.titlee}>{data.company}</h3>
              <h4 className={classes.servicee}>{data.title}</h4>
              <h5 className={classes.timee}>{data.salary}</h5>
              <div className={classes.containerss}>
                <ul className={classes.proglanguagee}>
                  <li className={classes.listtt}>
                    Available Cities:{data.city}
                  </li>
                </ul>
              </div>
              <div className={classes.containerss}>
                <ul className={classes.proglanguagee}>
                  <li className={classes.listtt}>Skills:</li>
                  {data.skills.map((sub) => (
                    <li className={classes.listtt}>{sub}, </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Newsearch;
