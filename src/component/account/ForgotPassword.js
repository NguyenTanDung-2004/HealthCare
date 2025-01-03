import React, { useContext, useEffect } from "react";
import "../../css/account/ForgotPassword.css";
import {
  ForgotPasswordContext,
  TextSpinnerContext,
} from "../../context/account/Context";
import { RequestSendCode } from "../../request/account/RequestSendCode";
function DivForgotPassword() {
  var { divMainForgot, setDivMainForgot, listValueForgot, setListValueForgot } =
    useContext(ForgotPasswordContext);
  useEffect(() => {
    setDivMainForgot(
      document.querySelector("#root > div > div.divForgot > div.divMain")
    );
  }, []);

  // click change password
  function clickChangePassword() {
    checkAll(divMainForgot);
    if (flagError == 0) {
      setListValueForgot(createListValueForgot(divMainForgot));
    } else {
      flagError = 0;
    }
  }

  var { spinner, setSpinner } = useContext(TextSpinnerContext);

  useEffect(() => {
    if (listValueForgot != null) {
      console.log(listValueForgot);
      spinner.current.style.display = "flex";
      spinner.current.querySelector("p").innerHTML = "processing...";
      RequestSendCode(
        document.querySelector(
          "#root > div > div.divForgot > div.divMain > div.divEmail.divChild > input"
        ),
        document.querySelector(
          "#root > div > div.divForgot > div.divMain > div.divEmail.divChild > p"
        )
      );
    }
  }, listValueForgot);
  // click change password

  // turn off
  function clickTurnOfForgot() {
    document.querySelector("#root > div > div.divForgot").style.transform =
      "scale(0)";
    document.querySelector("#root > div > div.divBlur").style.display = "none";
  }

  return (
    <div class="divForgot" style={{ height: "48%", width: "35%" }}>
      <div class="divHeader">
        <p>Forgot Password</p>
        <i onClick={() => clickTurnOfForgot()} class="fa-solid fa-xmark"></i>
      </div>
      <div class="divMain" style={{ height: "fit-content", width: "100%", position: "relative" }}>
        <div class="divEmail divChild">
          <p>Email is empty or existed!</p>
          <input placeholder="Your email:"></input>
        </div>
        <div class="divPassword divChild">
          <p>Password must include at least 8 characters!</p>
          <input type="password" placeholder="New password:"></input>
        </div>
        <div class="divConfirm divChild">
          <p>Please enter same the new password!</p>
          <input type="password" placeholder="Confirm password:"></input>
        </div>
        <div
          onClick={() => clickChangePassword()}
          class="divConfirm text-white"
          style={{ maxWidth: "400px" }}
        >
          Change Password
        </div>
      </div>
    </div>
  );
}

var flagError = 0;

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

function validateConfirm(inputConf, inputPass, p) {
  inputConf.style.borderColor = "#CCCCCC";
  p.style.display = "none";
  if (inputConf.value != inputPass.value) {
    inputConf.style.borderColor = "red";
    p.style.display = "block";
    flagError++;
  }
}

function checkAll(divMainForgot) {
  var allInput = divMainForgot.querySelectorAll("input");
  var allP = divMainForgot.querySelectorAll("p");
  checkNull(allInput[0], allP[0]);
  checkNull(allInput[1], allP[1]);
  //checkNull(allInput[2], allP[2]);
  validateEmail(allInput[0], allP[0]);
  validatePassword(allInput[1], allP[1]);
  validateConfirm(allInput[2], allInput[1], allP[2]);
}

function createListValueForgot(divMainForgot) {
  var listValue = [];
  listValue.push(
    divMainForgot.querySelector(
      "#root > div > div.divForgot > div.divMain > div.divEmail.divChild > input"
    ).value
  );
  listValue.push(
    divMainForgot.querySelector(
      "#root > div > div.divForgot > div.divMain > div.divPassword.divChild > input[type=password]"
    ).value
  );
  listValue.push(
    divMainForgot.querySelector(
      "#root > div > div.divForgot > div.divMain > div.divConfirm.divChild > input[type=password]"
    ).value
  );
  return listValue;
}

export default DivForgotPassword;
