import React, { useContext, useEffect, useRef } from "react";
import "../../css/account/DivBlur.css"
import { SignUpContext } from "../../context/account/Context";
function CreateDivBlur(){

    var divBlur = useRef(null);
    var {flagSignUp, setValueFlagSignUp} = useContext(SignUpContext);
    useEffect(() => {
        if (flagSignUp == 1){
            divBlur.current.style.display = "block";
        }
        else{
            divBlur.current.style.display = "none";
        }
    }, [flagSignUp]);

    return ( 
        <div ref={divBlur} class="divBlur"></div>
    );
}

export default CreateDivBlur;