import React from "react";
import DivLeft from "./DivLeft";
import FormLogin from "./FormLogin";
import "../../css/account/App.css";
import SignUp from "./SignUp";
import DivBlur from "./DivBlur";
import Spinner from "./Spinner";
import DivForgotPassword from "./Complete";
import DivForgot from "./ForgotPassword";
import DivCodeBox from "./CodeBox";

function CreateAccountPage() {
  return (
    <div className="divMain">
      <DivLeft />
      <FormLogin />
      <SignUp />
      <DivBlur />
      <Spinner />
      <DivForgotPassword />
      <DivForgot />
      <DivCodeBox />
    </div>
  );
}

export default CreateAccountPage;
