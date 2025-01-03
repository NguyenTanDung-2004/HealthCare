import React, { useContext } from "react";
import "../../css/account/DivCodeBox.css";
import { ForgotPasswordContext } from "../../context/account/Context";
import { RequestUpdatePassword } from "../../request/account/RequestUpdatePassword";

function DivCodeBox() {
  var { listValueForgot, setListValueForgot } = useContext(
    ForgotPasswordContext
  );

  function clickCancel() {
    setListValueForgot(null);
    document.querySelector("#root > div > div.divForgot").style.zIndex = "1";
    document.querySelector("#root > div > div.divCodeBox").style.top = "-300px";
  }

  function clickConfirm() {
    var list = listValueForgot;
    if (list.length == 4) {
      list.splice(3, 1);
    }
    list.push(
      document.querySelector(
        "#root > div > div.divCodeBox > div.divInput > input"
      ).value
    );
    RequestUpdatePassword(list);
    document.querySelector("#root > div > div.divSpinner > i").style.display =
      "none";
    document.querySelector("#root > div > div.divSpinner > div").style.display =
      "block";
    document.querySelector("#root > div > div.divSpinner > p").innerHTML =
      "Updating...";
    document.querySelector("#root > div > div.divSpinner").style.display =
      "flex";
  }

  return (
    <div class="divCodeBox">
      <p>Please enter your code that we sent via your email.</p>
      <div class="divInput">
        <p>Code wrong!</p>
        <input placeholder="Your code:"></input>
      </div>
      <div onClick={() => clickConfirm()} className="text-white">
        Confirm
      </div>
      <div onClick={() => clickCancel()} className="text-white">
        Cancel
      </div>
    </div>
  );
}

export default DivCodeBox;
