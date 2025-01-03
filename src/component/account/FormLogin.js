import React, { useContext, useRef } from "react";
import imageGoogle from "../../img/account/google.png";
import "../../css/account/FormLogin.css";
import {
  EmailContext,
  PasswordContext,
  SignUpContext,
} from "../../context/account/Context";
import DivBlur from "./DivBlur";
import { RequestLogin } from "../../request/account/RequestLogin";
import imageLogo from "../../img/account/logo.png";
function CreateFormLogin() {
  var iEye = useRef(null);

  var inputPassword = useRef(null);

  // event change password type
  var flagChangePassword = 1;
  const changeClassIEye = (firstClassName, secondClassName) => {
    console.log("nguyentandung");
    if (iEye.current && inputPassword.current) {
      // Check if the ref is available
      if (flagChangePassword === 0) {
        flagChangePassword = 1;
        inputPassword.current.type = "password";
        iEye.current.className = firstClassName; // Change to second class
      } else {
        flagChangePassword = 0;
        iEye.current.className = secondClassName; // Change to first class
        inputPassword.current.type = "text";
      }
    }
  };

  // hide pError
  var { emailTrue, setValueEmailTrue } = useContext(EmailContext);
  var { passwordTrue, setValuePasswordTrue } = useContext(PasswordContext);

  // display signup
  var { flagSignUp, setValueFlagSignUp } = useContext(SignUpContext);
  const clickSignUp = () => {
    setValueFlagSignUp(1);
  };

  // display forgot
  function clickDisplayForgot() {
    document.querySelector("#root > div > div.divForgot").style.transform =
      "scale(1)";
    document.querySelector("#root > div > div.divBlur").style.display = "block";
  }
  //display forgot

  // click login
  function clickLogin() {
    checkAll();
  }
  // click login

  return (
    <div class="divRight">
      <div class="divFormLogin">
        <img src={imageLogo}></img>
        <div class="divInputEmail divInput">
          <p class="pError">Your account is not exist!</p>
          <input placeholder="Your Email:"></input>
        </div>
        <div class="divInputPassword divInput">
          <p class="pError">Your password is wrong!</p>
          <input
            ref={inputPassword}
            type="password"
            placeholder="Your Password:"
          ></input>
          <i
            ref={iEye}
            onClick={() =>
              changeClassIEye("fa-solid fa-eye-slash", "fa-solid fa-eye")
            }
            class="fa-solid fa-eye-slash"
          ></i>
        </div>
        <p onClick={() => clickDisplayForgot()}>Forgot password?</p>
        <button
          onClick={() => clickLogin()}
          className="text-white btn-formlogin"
        >
          Log In
        </button>

        <div class="divDontHaveAccount div1 ">
          <p>Don't have an account?</p>
          <p onClick={clickSignUp} class="pSignUp">
            Sign Up
          </p>
        </div>
      </div>
    </div>
  );
}

var flagError = 0;

function checkNull(input, pError) {
  input.style.borderColor = "#CCCCCC";
  pError.style.display = "none";

  if (input.value == "") {
    input.style.borderColor = "red";
    pError.style.display = "block";
    flagError++;
  }
}

function validatePassword(input, p) {
  input.style.borderColor = "#CCCCCC";
  p.style.display = "none";

  if (input.value.length < 8) {
    input.style.borderColor = "red";
    p.style.display = "block";
    flagError++;
  }
}

function validateEmail(input, p) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  var result = emailPattern.test(input.value);
  input.style.borderColor = "#CCCCCC";
  p.style.display = "none";
  if (result == true) {
  } else {
    input.style.borderColor = "red";
    p.style.display = "block";
    flagError++;
  }
}

function checkAll() {
  var inputEmail = document.querySelector(
    "#root > div > div.divRight > div > div.divInputEmail.divInput > input"
  );
  var inputPassword = document.querySelector(
    "#root > div > div.divRight > div > div.divInputPassword.divInput > input[type=password]"
  );
  var pEmail = document.querySelector(
    "#root > div > div.divRight > div > div.divInputEmail.divInput > p"
  );
  var pPassword = document.querySelector(
    "#root > div > div.divRight > div > div.divInputPassword.divInput > p"
  );
  checkNull(inputEmail, pEmail);
  checkNull(inputPassword, pPassword);
  validatePassword(inputPassword, pPassword);
  validateEmail(inputEmail, pEmail);

  if (flagError == 0) {
    RequestLogin(inputEmail, inputPassword, pEmail, pPassword);
  } else {
    flagError = 1;
  }
}

export default CreateFormLogin;
