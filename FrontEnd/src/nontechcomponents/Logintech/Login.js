import useInput from "../../hooks/useInput";
import { useRequest } from "../../hooks/request-hook";
import ErrorModal from "../../Design/UIElements/ErrorModal";
import { AuthContext } from "../../context/authcontext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { HomeContext } from "../../context/homecontext";
// const isnumber = (value) => value.includes("@");
// const isotp = (value) => value.trim().length >= 6;
const num = value => value.trim().length === 10;
const otpnum = value => value.trim().length === 6;
let formValid = false;

const Logintech = () => {
  const auth = useContext(AuthContext);
  // const home = useContext(HomeContext);
  const { isError, sendRequest, clearError } = useRequest();

  const {
    value: numberValue,
    isValid: numberisValid,
    hasError: numberError,
    valueChangeHandler: numberChangeHandler,
    BlurHandler: numberBlurHandler,
    reset: resetNumber,
  } = useInput(num);

  const {
    value: otpValue,
    isValid: otpisValid,
    hasError: otpError,
    valueChangeHandler: otpChangeHandler,
    BlurHandler: otpBlurHandler,
    reset: resetotp,
  } = useInput(otpnum);

  const numberClasses = !numberError ? "form-control-plaintext" : "form-control-invalid";
  const otpClasses = !otpError ? "form-control-plaintext" : "form-control-invalid";

  if (numberisValid && otpisValid) {
    formValid = true;
  }
  if (!numberisValid || !otpisValid) {
    formValid = false;
  }
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formValid) {
      return;
    }
    const response = await sendRequest(
      "https://backend-sih.onrender.com/users/loginOTP",
      "POST",
      JSON.stringify({
        number: numberValue,
        otp: otpValue,
      }),
      {
        "Content-Type": "application/json",
      }
    );

    // home.ologin(response.number);
    console.log(response);
    auth.login(response._id)
    navigate("/landingpage");
    resetNumber();
    resetotp();
  };
  return (
    <>
      {/* {console.log(isError)} */}
      <ErrorModal error={isError} onClear={clearError} />
      <form onSubmit={submitHandler}>
        <br></br>
        <div className={classes.main}>
          <div className={classes.log}>Login Form</div>
          <br></br>
          <div className={numberClasses}>
            <label htmlFor="number" className={classes.em}>
              Number
            </label>
            <br></br>
            <div className={classes.in}>
              <input
                className={classes.textUL}
                type="text"
                size="38"
                id="number"
                onChange={numberChangeHandler}
                onBlur={numberBlurHandler}
                value={numberValue}
              />
            </div>

            {numberError && (
              <p className="error-text">Please Enter a valid number!</p>
            )}
          </div>

          <div className={otpClasses}>
            <label htmlFor="otp" className={classes.pw}>
              Otp
            </label>
            <div className={classes.inpw}>
              <input
                className={classes.passUL}
                type="password"
                id="set_otp"
                border-radius="8em"
                size="38"
                onChange={otpChangeHandler}
                onBlur={otpBlurHandler}
                value={otpValue}
              />
            </div>

            {otpError && (
              <p className="error-text">
                otp should be atleast 6 characters long!
              </p>
            )}
          </div>
          <br></br>
          <button disabled={!formValid} className={classes.submit}>
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default Logintech;
