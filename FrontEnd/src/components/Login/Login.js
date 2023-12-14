import useInput from "../../hooks/useInput";
import { useRequest } from "../../hooks/request-hook";
import ErrorModal from "../../Design/UIElements/ErrorModal";
import { AuthContext } from "../../context/authcontext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
const isEmail = (value) => value.includes("@");
const isPassword = (value) => value.trim().length >= 6;
let formValid = false;
const Login = () => {
  const auth = useContext(AuthContext);
  const { isError, sendRequest, clearError, exists } = useRequest();

  const {
    value: emailValue,
    isValid: emailisValid,
    hasError: emailError,
    valueChangeHandler: emailChangeHandler,
    BlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordisValid,
    hasError: passwordError,
    valueChangeHandler: passwordChangeHandler,
    BlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);

  const emailClasses = !emailError
    ? "form-control-inputtext"
    : "form-control-invalid";
  const passwordClasses = !passwordError
    ? "form-control-inputtext"
    : "form-control-invalid";

  if (emailisValid && passwordisValid) {
    formValid = true;
  }
  if (!emailisValid || !passwordisValid) {
    formValid = false;
  }
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formValid) {
      return;
    }
    const response = await sendRequest(
      "https://backend-sih.onrender.com/users/login",
      "POST",
      JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
      {
        "Content-Type": "application/json",
      }
    );

    navigate("/landingpage");
    auth.login(response.user.id);
    console.log(response);
    resetEmail();
    resetPassword();
  };
  return (
    <>
      {console.log(isError)}
      <ErrorModal error={isError} onClear={clearError} />
      <form onSubmit={submitHandler}>
        <br></br>
        <div className={classes.main}>
          <div className={classes.log}>Login Form</div>
          <br></br>
          <div className={emailClasses}>
            <label htmlFor="Email" className={classes.em}>
              Email
            </label>
            <br></br>
            <div className={classes.in}>
              <input
                className={classes.textUL}
                type="text"
                size="38"
                id="email"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={emailValue}
              />
            </div>

            {emailError && (
              <p className="error-text">Please Enter a valid Email!</p>
            )}
          </div>

          <div className={passwordClasses}>
            <label htmlFor="password" className={classes.pw}>
              Password
            </label>
            <div className={classes.inpw}>
              <input
                className={classes.passUL}
                type="password"
                id="set_password"
                border-radius="8em"
                size="38"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                value={passwordValue}
              />
            </div>

            {passwordError && (
              <p className="error-text">
                Password should be atleast 6 characters long!
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

export default Login;
