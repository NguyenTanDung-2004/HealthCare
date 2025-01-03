import React, { useContext, useEffect, useRef } from "react";
import "../../css/account/Spinner.css";
import { TextSpinnerContext } from "../../context/account/Context";
import { ClipLoader } from "react-spinners";

function CreateSpinner() {
  const { textSpinner, setTextSpinner } = useContext(TextSpinnerContext);
  setTextSpinner("Signing Up...");

  const { spinner, setSpinner } = useContext(TextSpinnerContext);
  var spinnerRef = useRef(null);
  var { iconSpinner, setIconSpinner } = useContext(TextSpinnerContext);
  var iSpinnerRef = useRef(null);
  var { circleSpinner, setCircleSpinner } = useContext(TextSpinnerContext);
  var circleSpinnerRef = useRef(null);

  useEffect(() => {
    setSpinner(spinnerRef);
    setIconSpinner(iSpinnerRef);
    setCircleSpinner(circleSpinnerRef);
  }, []);

  return (
    <div ref={spinnerRef} className="divSpinner">
      <i ref={iSpinnerRef} className="fa-solid fa-check"></i>

      <div ref={circleSpinnerRef}>
        <ClipLoader color="#1445FE" size={30} />
      </div>
      <p>{textSpinner}</p>
    </div>
  );
}

export default CreateSpinner;
