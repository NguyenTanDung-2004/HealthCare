import React, { useContext, useEffect, useRef, useState } from "react";
import "../../css/account/SignUp.css"
import { SignUpContext, FormDataSignUpContext, TextSpinnerContext, InputSignUpContext, CompleteSignUpContext } from "../../context/account/Context";
import { CreateAccount } from "../../request/account/RequestCreateAccount";

function CreateSignUpBox(){
    const iEye = useRef(null);
    const inputPassword = useRef(null);

    // event change password type
    var flagChangePassword = 1;
    const changeClassIEye = (firstClassName, secondClassName) => {
        console.log("nguyentandung");
        if (iEye.current && inputPassword.current) { // Check if the ref is available
          if (flagChangePassword === 0) {
            flagChangePassword = 1;
            inputPassword.current.type = "password"
            iEye.current.className = firstClassName; // Change to second class
          } else {
            flagChangePassword = 0;
            iEye.current.className = secondClassName; // Change to first class
            inputPassword.current.type = "text"
          }
        }
    };

    // create option in Dob
        // get current date
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
    const year = currentDate.getFullYear();
    
        // useRef for select
    var dayRef = useRef(null);
    var monthRef = useRef(null);
    var yearRef = useRef(null);
        // set value for select
    useEffect(() => {
        if (dayRef.current) dayRef.current.value = day;
        if (monthRef.current) monthRef.current.value = month;
        if (yearRef.current) yearRef.current.value = year;
        setDay1(day);
        setMonth1(month)
        setYear1(year);
    }, [day, month, year]);

        // render month
    var listMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const renderOptionMonth = () =>{
        const element = [];
        for (let i = 0; i < listMonth.length; i++){
            element.push(
                <option value={i + 1}>{listMonth[i]}</option>
            );
        }
        return element;
    }

        // render day
    const renderOptionDay = (numberOfOption, prefixText) => {
        const elements = [];
        for (let i = 0; i < numberOfOption; i++) {
            elements.push(
                <option value={i + 1}>{prefixText + " " + (i + 1)}</option>
            );
        }
        return elements;
    };

        // render year
    const renderOptionYear = () => {
        const elements = [];
        for (let i = 1916; i <= year; i++) {
            elements.push(
                <option value={i}>{i}</option>
            );
        }
        return elements;
    }
    // create option in dob

    // set animation for click 1 sex
    const div1SexRefs = useRef([]);
    const input1SexRefs = useRef([]);
    const clickDiv1SexRefs = (event, index) => {
        input1SexRefs.current[index].click();
        if (index == 0){
            setSex("Female");
        }
        else if (index == 1){
            setSex("Male");
        }
        else{
            setSex("Other");
        }
    }

    const handleLabelClick = (event, index) => {
        event.stopPropagation(); // Prevents the event from bubbling up to the div
        clickDiv1SexRefs(event, index);
    };
    // set animation for click 1 sex

    // display signup
    var divSignUpRef = useRef(null);
    var {flagSignUp, setValueFlagSignUp} = useContext(SignUpContext);
    useEffect(() => {
        if (flagSignUp == 1){
            divSignUpRef.current.style.transform = "scale(1)";
        }
        else{
            divSignUpRef.current.style.transform = "scale(0)";
        }
    }, [flagSignUp])
    // display signup

    // turn off signup
    var iTurnOffSignup = useRef(null);
    const clickITurnOffSignUp = () => {
        setValueFlagSignUp(0);
    }
    // turn off signup

    // set and get data in SignUp
    var [lastName, setLastName] = useState("");
    var [firstName, setFirstName] = useState("");
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    var [day1, setDay1] = useState("");
    var [month1, setMonth1] = useState("");
    var [year1, setYear1] = useState("");
    var [sex, setSex] = useState("Female");
    // set and get data in SignUp

    // event for clicking signup
    const {formData, setFormData} = useContext(FormDataSignUpContext);
    const {spinner, setSpinner} = useContext(TextSpinnerContext);
    const {flagSpinner, setFlagSpinner} = useContext(TextSpinnerContext);
    var {iconSpinner, setIconSpinner} = useContext(TextSpinnerContext);
    var {circleSpinner, setCircleSpinner} = useContext(TextSpinnerContext);
    var {divCompleteSignUp, setDivCompleteSignUp} = useContext(CompleteSignUpContext);
    const clickingSignUp = () => {
        var formData1 = createFormData(lastName, firstName, email, password, day1, month1, year1, sex);
        console.log(formData1);
        setFormData(formData1);
        checkBeforeSignUp(lastName2, firstName2, email2, password2, month2, year2, pErrorEmail, pErrorPassword, pErrorDob, year1);
        if (flagError == 0){
            spinner.current.style.display = "flex";
            CreateAccount(formData1, spinner.current, setSpinner, iconSpinner.current, setIconSpinner, circleSpinner.current, setCircleSpinner, email2.current, pErrorEmail.current, divCompleteSignUp);
        }
       flagError = 0;
    }
    // event for clicking signup

    // assign value for input in Signup
    var {lastName2, setLastName2} = useContext(InputSignUpContext);
    var {firstName2, setFirstName2} = useContext(InputSignUpContext);
    var {email2, setEmail2} = useContext(InputSignUpContext);
    var {password2, setPassword2} = useContext(InputSignUpContext);
    var {day2, setDay2} = useContext(InputSignUpContext);
    var {month2, setMonth2} = useContext(InputSignUpContext);
    var {year2, setYear2} = useContext(InputSignUpContext);
    var lastName2Ref = useRef(null);
    var firstName2Ref = useRef(null);
    var email2Ref = useRef(null);
    useEffect(() => {
        setLastName2(lastName2Ref);
        setFirstName2(firstName2Ref)
        setEmail2(email2Ref);
        setPassword2(inputPassword);
        setDay2(dayRef);
        setMonth2(monthRef);
        setYear2(yearRef);
    }, []);

    var pErrorEmail = useRef(null);
    var pErrorPassword = useRef(null);
    var pErrorDob = useRef(null);
    // assign value for input in Signup

    return(
        <div ref={divSignUpRef} class="divSignUp">
            <div class="divHeader">
                <p>SIGN UP</p>
                <i onClick={clickITurnOffSignUp} ref={iTurnOffSignup} class="fa-solid fa-xmark"></i>
            </div>
            <div class="divLastFirstName divChild">
                <input ref={lastName2Ref} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name"></input>
                <input ref={firstName2Ref} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name"></input>
            </div>
            <div class="divEmail divChild divChild1">
                <p ref={pErrorEmail} class="pError">Your email is wrong or it is existed!</p>
                <input ref={email2Ref} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email:"></input>
            </div>
            <div class="divPassword divChild divChild1">
                <p ref={pErrorPassword} class="pError">Your password must include at least 8 character!</p>
                <input value={password} onChange={(e) => setPassword(e.target.value)} ref={inputPassword} type="password" placeholder="Your Password:"></input>
                <i ref={iEye} onClick={() => changeClassIEye("fa-solid fa-eye-slash", "fa-solid fa-eye")} class="fa-solid fa-eye-slash"></i>
            </div>
            <div class="divDob divChild">
                <p>Day of birth</p>
                <p ref={pErrorDob} class="pError">Your age must be more than 12 years!</p>
                <div class="divInput">
                    
                    <select value={day1} onChange={(e) => setDay1(e.target.value)}  ref={dayRef} name="date" id="date">
                       {renderOptionDay(30, "")}
                    </select>

                    <select value={month1} onChange={(e) => setMonth1(e.target.value)} ref={monthRef} name="month" id="month">
                        {renderOptionMonth()}
                    </select>

                    <select value={year1} onChange={(e) => setYear1(e.target.value)} ref={yearRef} name="month" id="month">
                        {renderOptionYear()}
                    </select>
                </div>
            </div>
            <div class="divSex divChild">
                <p>Sex</p>
                <div>
                    <div onClick={(e) => clickDiv1SexRefs(e, 0)} class="div1Sex" ref={el => (div1SexRefs.current[0] = el)}>
                        <label  class="form-check-label" for="flexRadioDefault1">
                            Female
                        </label>
                        <input ref={el => (input1SexRefs.current[0] = el)} class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
                    </div>
                    <div onClick={(e) => clickDiv1SexRefs(e, 1)} class="div1Sex" ref={el => (div1SexRefs.current[1] = el)}>
                        <label  class="form-check-label" for="flexRadioDefault2">
                            Male
                        </label>
                        <input ref={el => (input1SexRefs.current[1] = el)} class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                    </div>
                    <div onClick={(e) => clickDiv1SexRefs(e, 2)} class="div1Sex" ref={el => (div1SexRefs.current[2] = el)}>
                        <label  class="form-check-label" for="flexRadioDefault3">
                            Other
                        </label>
                        <input ref={el => (input1SexRefs.current[2] = el)} class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                    </div>
                </div>
            </div>
            <div onClick={clickingSignUp} class="divButtonSignUp divChild">Sign Up</div>
        </div>
    );
}

var flagError = 0;
function checkAge(year, inputMonth, inputYear, pError){
    inputYear.current.style.borderColor = "initial";
    pError.current.style.display = "none";

    const currentYear = new Date().getFullYear();
    if (currentYear - year < 12){
        inputYear.current.style.borderColor = "red";
        pError.current.style.display = "block"
        flagError++;
    }
}

function checkNull(input, pError){
    input.current.style.borderColor = "#CCCCCC";
    pError.current.style.display = "none"

    if (input.current.value == ""){
        input.current.style.borderColor = "red";
        pError.current.style.display = "block"
        flagError++;
    }
}

function checkNull1(input){
    input.current.style.borderColor = "#CCCCCC";

    if (input.current.value == ""){
        input.current.style.borderColor = "red";
        flagError++;
    }
}

function checkBeforeSignUp(
    lastName, firstName, email, password, month, year, pEmail, pPassword, pDob, valueOfYear
){
    checkAge(valueOfYear, month, year, pDob);
    checkNull1(lastName);
    checkNull1(firstName);
    checkNull(email, pEmail);
    checkNull(password, pPassword);
    validateEmail(email, pEmail);
    validatePassword(password, pPassword)
}

function createFormData(lastName, firstName, email, password, day, month, year, sex){
    var day1 = "" + day;
    var month1 = "" + month;
    if (day < 10){
        day1 = "0" + day;
    }
    if (month < 10){
        month1 = "0" + month;
        console.log(month1);
    }
    const rawData = {
        lastName: lastName,
        firstName: firstName,
        email: email,
        password: password,
        dob: year + "-" + month1 + "-" + day1, // YYYY-MM-DD format
        gentle: sex
    };
    return rawData;
}

function validateEmail(input, p) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    var result = emailPattern.test(input.current.value);
    input.current.style.borderColor = "#CCCCCC";
    p.current.style.display = "none"
    if (result == true){
    }
    else{
        input.current.style.borderColor = "red";
        p.current.style.display = "block"
        flagError++;
    }
}

function validatePassword(input, p){
    input.current.style.borderColor = "#CCCCCC";
    p.current.style.display = "none"

    if (input.current.value.length < 8){
        input.current.style.borderColor = "red";
        p.current.style.display = "block"
        flagError++;
    }
}



export default CreateSignUpBox;