import React, { useContext, useEffect, useRef } from "react";
import "../../css/account/Complete.css";
import {
  CompleteSignUpContext,
  TextSpinnerContext,
} from "../../context/account/Context";
import { RequestCompletAccount } from "../../request/account/RequestCompleteAccount";
function DivForgotPassword() {
  var { height, setHeight } = useContext(CompleteSignUpContext);
  var { weight, setWeight } = useContext(CompleteSignUpContext);
  var { bloodGlucose, setBloodGlucose } = useContext(CompleteSignUpContext);
  var { bloodPressure, setBloodPressure } = useContext(CompleteSignUpContext);
  var { heartRate, setHeartRate } = useContext(CompleteSignUpContext);
  var { listCompleteSignUp, setListCompleteSignUp } = useContext(
    CompleteSignUpContext
  );
  var { listValueCompleteSignUp, setValueListValueCompleteSignUp } = useContext(
    CompleteSignUpContext
  );
  var { divCompleteSignUp, setDivCompleteSignUp } = useContext(
    CompleteSignUpContext
  );

  var { spinner, setSpinner } = useContext(TextSpinnerContext);
  var { textSpinner, setTextSpinner } = useContext(TextSpinnerContext);

  var list = useRef([]);

  useEffect(() => {
    setListCompleteSignUp(list.current);
    setValueListValueCompleteSignUp([0, 0, 90, 130, 90, 70, 80]);
    setDivCompleteSignUp(document.querySelector(".divForgotPassword"));
  }, []);

  function clickComplete() {
    flag = 0;
    checkAll(listCompleteSignUp);
    if (flag == 0) {
      listCompleteSignUp[5].style.display = "none";
      setDataForListValue(listCompleteSignUp, setValueListValueCompleteSignUp);
      flag1 = 1;
      spinner.current.style.display = "flex";
      spinner.current.querySelector("p").innerHTML = "Completing...";
      spinner.current.querySelector(
        "#root > div > div.divSpinner > i"
      ).style.display = "none";
      spinner.current.querySelector(
        "#root > div > div.divSpinner > div"
      ).style.display = "block";
    } else {
      listCompleteSignUp[5].style.display = "block";
    }
  }

  useEffect(() => {
    if (flag1 == 1) {
      RequestCompletAccount(createRawData(listValueCompleteSignUp));
    }
  }, listValueCompleteSignUp);

  return (
    <div class="divForgotPassword divComplete" style={{ height: "80%", width: "60%" }}>
      <div class="divHeader">
        <p>
          Thank you for signing up. To complete your profile, please fill in the
          required infomation.
        </p>
      </div>
      <div class="divMain" style={{ height: "80%", width: "100%", position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
        <div class="divBMI divChild" style={{ height: "fit-content", width: "100%" }}>
          <p>BMI index - Cm/Kg</p>
          <p ref={(e) => (list.current[5] = e)}>
            You must enter interger 67&lt;height&lt;272, 25&lt;weight&lt;638
            (Ex: 170 - 70)!
          </p>
          <div class="divInput" style={{ height: "fit-content", width: "100%" }}>
            <input
              ref={(e) => (list.current[0] = e)}
              class="inputHeight"
              placeholder="Height (cm)"
            ></input>
            <input
              ref={(e) => (list.current[1] = e)}
              class="inputWeight"
              placeholder="Weight (kg)"
            ></input>
          </div>
        </div>
        <div class="divBloodGlucose divChild" style={{ height: "fit-content", width: "100%" }}>
          <p>Blood glucose level (Fasting/Non-Fasting test) - mg/dl</p>
          <div ref={(e) => (list.current[2] = e)} class="divRadioButton">
            <div class="divLevel">
              <label class="form-check-label" for="flexRadioDefault12">
                &lt; 99 / &lt; 140
              </label>
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault1"
                id="flexRadioDefault12"
                defaultChecked
              />
            </div>
            <div class="divLevel" >
              <label class="form-check-label" for="flexRadioDefault13">
                100 - 125 / 140 - 199
              </label>
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault1"
                id="flexRadioDefault13"
              />
            </div>
            <div class="divLevel">
              <label class="form-check-label" for="flexRadioDefault14">
                &gt; 126 / &gt; 200
              </label>
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault1"
                id="flexRadioDefault14"
              />
            </div>
          </div>
        </div>
        <div class="divBloodPressure divChild" style={{ height: "fit-content", width: "100%" }}>
          <p>Blood pressure (Systolic/Disastolic) - mmHg</p>
          <div ref={(e) => (list.current[3] = e)} class="divRadioButton">
            <div class="divTop">
              <div class="divLevel">
                <label class="form-check-label" for="flexRadioDefault4">
                  &lt; 99 / &lt; 80
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault2"
                  id="flexRadioDefault4"
                  defaultChecked
                />
              </div>
              <div class="divLevel">
                <label class="form-check-label" for="flexRadioDefault5">
                  120 - 129 / &lt; 80
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault2"
                  id="flexRadioDefault5"
                />
              </div>
              <div class="divLevel">
                <label class="form-check-label" for="flexRadioDefault6">
                  130 - 139 / 80 - 89
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault2"
                  id="flexRadioDefault6"
                />
              </div>
            </div>
            <div class="divBottom">
              <div class="divLevel">
                <label class="form-check-label" for="flexRadioDefault7">
                  &gt; 140 / &gt; 90
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault2"
                  id="flexRadioDefault7"
                />
              </div>
              <div class="divLevel">
                <label class="form-check-label" for="flexRadioDefault8">
                  &gt; 180 / &gt; 120
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault2"
                  id="flexRadioDefault8"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="divHeartRate divChild" style={{ height: "fit-content", width: "100%", position: "relative" }}>
          <p>Heart rate - heartbeat/minute</p>
          <div ref={(e) => (list.current[4] = e)} class="divRadioButton" style={{width: "100%"}}>
            <div class="divLevel">
              <label class="form-check-label" for="flexRadioDefault9">
                &lt; 60
              </label>
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault3"
                id="flexRadioDefault9"
              />
            </div>
            <div class="divLevel">
              <label class="form-check-label" for="flexRadioDefault10">
                60 - 100
              </label>
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault3"
                id="flexRadioDefault10"
                defaultChecked
              />
            </div>
            <div class="divLevel">
              <label class="form-check-label" for="flexRadioDefault11">
                &gt; 100
              </label>
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault3"
                id="flexRadioDefault11"
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => clickComplete()}
          className="text-white shadow-md btn-completed"
        >
          Complete Sign Up
        </button>
      </div>
    </div>
  );
}

var flag1 = 0;

var flag = 0;

function checkNull(input) {
  input.style.borderColor = "#CCCCCC";
  if (input.value == "") {
    input.style.borderColor = "red";
    flag++;
  }
}

function checkValue(input, min, max) {
  input.style.borderColor = "#CCCCCC";
  const num = parseInt(input.value, 10);
  var bool =
    !isNaN(num) && Number.isInteger(num) && num.toString() === input.value;
  if (bool == true) {
    if (num >= min && num <= max) {
      return true;
    } else {
      input.style.borderColor = "red";
      flag++;
      return false;
    }
  } else {
    input.style.borderColor = "red";
    flag++;
    return false;
  }
}

function checkAll(list) {
  checkNull(list[0]);
  checkNull(list[1]);
  checkValue(list[0], 67, 272);
  checkValue(list[1], 25, 638);
}

function setDataForListValue(list, setListValue) {
  var listValue = [0, 0, 0, 0, 0];
  listValue[0] = parseInt(list[0].value);
  listValue[1] = parseInt(list[1].value);

  var listSelect = list[2].querySelectorAll("input");
  for (var i = 0; i < listSelect.length; i++) {
    if (listSelect[0].checked == true) {
      listValue[2] = 90;
      listValue[3] = 130;
    } else if (listSelect[1].checked == true) {
      listValue[2] = 112.5;
      listValue[3] = 169.5;
    } else if (listSelect[2].checked == true) {
      listValue[2] = 136;
      listValue[3] = 210;
    }
  }

  var listSelect1 = list[3].querySelectorAll("input");
  for (var i = 0; i < listSelect1.length; i++) {
    if (listSelect1[0].checked == true) {
      listValue[4] = 90;
      listValue[5] = 70;
    } else if (listSelect1[1].checked == true) {
      listValue[4] = 124.5;
      listValue[5] = 70;
    } else if (listSelect1[2].checked == true) {
      listValue[4] = 134.5;
      listValue[5] = 84.5;
    } else if (listSelect1[3].checked == true) {
      listValue[4] = 150;
      listValue[5] = 100;
    } else if (listSelect1[4].checked == true) {
      listValue[4] = 190;
      listValue[5] = 130;
    }
  }

  var listSelect2 = list[4].querySelectorAll("input");
  for (var i = 0; i < listSelect2.length; i++) {
    if (listSelect2[0].checked == true) {
      listValue[6] = 50;
    } else if (listSelect2[1].checked == true) {
      listValue[6] = 80;
    } else if (listSelect2[2].checked == true) {
      listValue[6] = 110;
    }
  }

  setListValue(listValue);
}

function createRawData(list) {
  const rawData = {
    height: list[0],
    weight: list[1],
    bloodGlucoseRange: list[2],
    bloodPressureRange: list[4],
    heartRateRange: list[6],
    bloodGlucoseRange1: list[3],
    bloodPressureRange1: list[5],
  };
  return rawData;
}

export default DivForgotPassword;
