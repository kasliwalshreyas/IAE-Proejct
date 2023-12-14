import { useContext } from 'react'
// import validator from 'validator';
import useInput from '../../hooks/useInput';
import { useRequest } from '../../hooks/request-hook';
import ErrorModal from '../../Design/UIElements/ErrorModal'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authcontext'
import { useNavigate } from 'react-router-dom';
import classes from './Register.module.css';
const isNotEmpty = value => value.trim() !== '';
const isEmail = value => value.includes('@');
const isPassword = value => value.trim().length >= 3;
// console.log(isPassword.value)
const number = value => value.trim().length === 10;
let formValid = false;
// let conPass = true;

const Register = (props) => {
  const navigate = useNavigate()
  // const [enteredConfirmedPassword,setConfirmPassword] = useState('');
  // const [isTouched,setisTouched] = useState(false)
  const { isError, clearError, sendRequest } = useRequest()
  // const auth = useContext(AuthContext)
  const {
    value: nameValue,
    isValid: nameisValid,
    hasError: nameError,
    valueChangeHandler: nameChangeHandler,
    BlurHandler: nameBlurHandler,
    reset: resetName

  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailisValid,
    hasError: emailError,
    valueChangeHandler: emailChangeHandler,
    BlurHandler: emailBlurHandler,
    reset: resetEmail

  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordisValid,
    hasError: passwordError,
    valueChangeHandler: passwordChangeHandler,
    BlurHandler: passwordBlurHandler,
    reset: resetPassword

  } = useInput(isPassword);

  const {
    value: numberValue,
    isValid: numberisValid,
    hasError: numberError,
    valueChangeHandler: numberChangeHandler,
    BlurHandler: numberBlurHandler,
    reset: resetNumber

  } = useInput(number);

  const {
    value: locationValue,
    isValid: locationValid,
    hasError: locationError,
    valueChangeHandler: locationchangeHandler,
    BlurHandler: locationBlurHandler,
    reset: resetlocation

  } = useInput(isNotEmpty);


  const nameClasses = !nameError ? 'form-control-plaintext' : 'form-control-invalid'
  const emailClasses = !emailError ? 'form-control-plaintext' : 'form-control-invalid'
  const locationClasses = !locationError ? 'form-control-plaintext' : 'form-control-invalid'
  const passwordClasses = !passwordError ? 'form-control-plaintext' : 'form-control-invalid'
  // const confirmPassClasses = conPass ? 'form-control' : 'form-control-invalid'
  const numberClasses = !numberError ? 'form-control-plaintext' : 'form-control-invalid'

  if (nameisValid && emailisValid && passwordisValid && numberisValid && locationValid) {
    formValid = true
  }
  if (!nameisValid || !emailisValid || !passwordisValid || !numberisValid || !locationValid) {
    formValid = false
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formValid) {
      console.log(formValid)
      return;
    }
    console.log(nameValue, emailValue, passwordValue, numberValue)

    const response = await sendRequest(
      'https://backend-sih.onrender.com/users/signup',
      'POST',
      JSON.stringify({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        mobile: numberValue,
        location: locationValue
      }),
      { 'Content-Type': 'application/json' }
    )
    // auth.login(response.user.id)
    console.log(isError)
    console.log(response, "checking response at signup")
    navigate('/login')
    resetName()
    resetEmail()
    resetPassword()
    // setConfirmPassword('')
    resetNumber()
  }


  return (
    <>
      <ErrorModal error={isError} onClear={clearError} />
      {/* <Modal /> */}
      {/* {console.log(error)} */}
      <div className={classes.main1}>
        <form onSubmit={submitHandler}>
          <div className={classes.reg} >
            Registration Form
          </div><br></br>
          <div className={nameClasses}>
            <label htmlFor='name' className={classes.em1}>Name</label><br></br>
            <input
              type='text'
              className={classes.textUL}
              size='38'
              id='name'
              background-color="#f9f9f9"

              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={nameValue} />

            {nameError && <p className='error-text'>Please Enter a Name!</p>}
          </div>

          <div className={emailClasses}>
            <label htmlFor='email' className={classes.em1}>Email</label><br></br>

            <input type='text'
              className={classes.textUL}
              id='email'
              size='38'

              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={emailValue} />

            {emailError && <p className='error-text'>Please Enter a valid Email!</p>}
          </div>

          <div className={passwordClasses}>
            <label htmlFor='password' className={classes.em1}>Set Password</label><br></br>

            <input type='password'
              className={classes.passUL}
              id='set_password'
              size='38'
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={passwordValue} />

            {passwordError && <p className='error-text'>Password should be atleast 3 characters long!</p>}
          </div>
          {/* 
      <div className={passwordClasses}>
        <label htmlFor='password'>Confirm Password</label>
        
        <input type='password'
         id='confirm_password'
        onChange={confirmPasswordChangeHandler} 
        onBlur={confirmPasswordBlurHandler} 
        value={enteredConfirmedPassword} />

        {isTouched && !conPass && <p className='error-text'>Passwords are not the same!</p>}
        {isTouched && conPass && <p className='error-text'>Passwords are the same!</p>}
      </div> */}

          <div className={numberClasses}>
            <label htmlFor='mobile' className={classes.em1}>Mobile Number</label><br></br>

            <input type='number'
              className={classes.numberUL}
              id='mobile'
              size='38'
              onChange={numberChangeHandler}
              onBlur={numberBlurHandler}
              value={numberValue} />

            {numberError && <p className='error-text'>Mobile Number should have 10 digits!</p>}
          </div>
          <div className={locationClasses}>
            <label htmlFor='location' className={classes.em1}>Location</label><br></br>

            <input type='text'
              className={classes.textUL}
              id='location'
              size='38'
              onChange={locationchangeHandler}
              onBlur={locationBlurHandler}
              value={locationValue} />

            {locationError && <p className='error-text'>Please Enter a valid Location!</p>}
          </div>
          {/* <br></br> */}
          {/* <br></br> */}
          <br></br>

          <div class="float-right">
            <button disabled={!formValid} className={classes.butto}>Submit</button>

            <Link to='/login'> <button className={classes.butto}>SignUp</button></Link>
          </div>


        </form>
      </div>
      <br></br>

    </>);


};

export default Register;