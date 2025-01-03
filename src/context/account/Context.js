import React, { createContext, useState } from 'react';

export const EmailContext = createContext();
export const PasswordContext = createContext();
export const SignUpContext = createContext();
export const FormDataSignUpContext = createContext();
export const TextSpinnerContext = createContext();
export const InputSignUpContext = createContext();
export const CompleteSignUpContext = createContext();
export const ForgotPasswordContext = createContext();

export const EmailProvider = ({ children }) => {
    const [emailTrue, setValueEmailTrue] = useState(true);

    return (
        <EmailContext.Provider value={{ emailTrue, setValueEmailTrue }}>
            {children}
        </EmailContext.Provider>
    );
};

export const PasswordProvider = ({ children }) => {
    const [passwordTrue, setValuePasswordTrue] = useState(true);

    return (
        <PasswordContext.Provider value={{ passwordTrue, setValuePasswordTrue }}>
            {children}
        </PasswordContext.Provider>
    )
}

export const SignUpProvider = ({ children }) => {
    const [flagSignUp, setValueFlagSignUp] = useState(0);

    return (
        <SignUpContext.Provider value={{ flagSignUp, setValueFlagSignUp }}>
            {children}
        </SignUpContext.Provider>
    )
}

export const FormDataSignUpProvider = ({ children }) => {
    const [formData, setFormData] = useState(null);

    return (
        <FormDataSignUpContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormDataSignUpContext.Provider>
    )
}

export const TextSpinnerProvider = ({ children }) => {
    const [textSpinner, setTextSpinner] = useState(null);
    const [spinner, setSpinner] = useState(null);
    const [flagSpinner, setFlagSpinner] = useState(0); // 0: signing, 1: fail, 2: complete
    const [classSpinner, setClassSpinner] = useState("fa-solid fa-check");
    const [iconSpinner, setIconSpinner] = useState(null);
    const [circleSpinner, setCircleSpinner] = useState(null);

    return (
        <TextSpinnerContext.Provider value={{ textSpinner, setTextSpinner, spinner, setSpinner, flagSpinner, setFlagSpinner, classSpinner, setClassSpinner, iconSpinner, setIconSpinner,
            circleSpinner, setCircleSpinner
         }}>
            {children}
        </TextSpinnerContext.Provider>
    )
}

export const InputSignUpProvider = ({ children }) => {
    // set and get data in SignUp
    var [lastName2, setLastName2] = useState(null);
    var [firstName2, setFirstName2] = useState(null);
    var [email2, setEmail2] = useState(null);
    var [password2, setPassword2] = useState(null);
    var [day2, setDay2] = useState(null);
    var [month2, setMonth2] = useState(null);
    var [year2, setYear2] = useState(null);

    return (
        <InputSignUpContext.Provider value={{ 
            lastName2, setLastName2,
            firstName2, setFirstName2,
            email2, setEmail2,
            password2, setPassword2,
            day2, setDay2,
            month2, setMonth2,
            year2, setYear2
         }}>
            {children}
        </InputSignUpContext.Provider>
    )
}

export const CompleteSignUpProvider = ({ children }) => {
    
    var [height, setHeight] = useState(null);
    var [weight, setWeight] = useState(null);
    var [bloodGlucose, setBloodGlucose] = useState(null);
    var [bloodPressure, setBloodPressure] = useState(null);
    var [heartRate, setHeartRate] = useState(null);

    var [listCompleteSignUp, setListCompleteSignUp] = useState(null);
    var [listValueCompleteSignUp, setValueListValueCompleteSignUp] = useState(null);
    var [divCompleteSignUp, setDivCompleteSignUp] = useState(null);

    return (
        <CompleteSignUpContext.Provider value={{ 
            height, setHeight,
            weight, setWeight,
            bloodGlucose, setBloodGlucose,
            bloodPressure, setBloodPressure,
            heartRate, setHeartRate,
            listCompleteSignUp, setListCompleteSignUp,
            listValueCompleteSignUp, setValueListValueCompleteSignUp,
            divCompleteSignUp, setDivCompleteSignUp
         }}>
            {children}
        </CompleteSignUpContext.Provider>
    )
}

export const ForgotPasswordProvider = ({ children }) => {
    
    var [divMainForgot, setDivMainForgot] = useState(null);
    var [listValueForgot, setListValueForgot] = useState(null);

    return (
        <ForgotPasswordContext.Provider value={{ 
            divMainForgot, setDivMainForgot,
            listValueForgot, setListValueForgot
         }}>
            {children}
        </ForgotPasswordContext.Provider>
    )
}



