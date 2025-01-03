import React from "react";
import App from "../component/account/App"
import { EmailProvider, PasswordProvider, SignUpProvider, FormDataSignUpProvider, TextSpinnerProvider, InputSignUpProvider, CompleteSignUpProvider 
    , ForgotPasswordProvider
} from "../context/account/Context";

function CreatePage(){
    return (
        <EmailProvider>
        <PasswordProvider>
        <SignUpProvider>
        <FormDataSignUpProvider>
        <TextSpinnerProvider>
        <InputSignUpProvider>
        <CompleteSignUpProvider>
        <ForgotPasswordProvider>
            <App/>
        </ForgotPasswordProvider>
        </CompleteSignUpProvider>
        </InputSignUpProvider>
        </TextSpinnerProvider>
        </FormDataSignUpProvider>
        </SignUpProvider>
        </PasswordProvider>
        </EmailProvider>
    );
}

export default CreatePage;