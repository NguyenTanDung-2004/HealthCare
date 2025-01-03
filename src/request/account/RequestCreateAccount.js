export function CreateAccount(formData, spinner, setSpinner, iconSpinner, setIconSpinner, circleSpinner, setCircleSpinner, inputEmail, pErrorEmail, divCompleteSignUp){
    iconSpinner.style.display = "none";
    circleSpinner.style.display = "block";


    const jsonData = JSON.stringify(formData);
    fetch('http://localhost:8080/user/SignUp', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include', // allow save cookie from client
        body: jsonData
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        console.log(data1);
        setTimeout(() => 
        {
            if (data1.code == 1001){
                inputEmail.style.borderColor = "red";
                pErrorEmail.style.display = "block";
                circleSpinner.style.display = "none";
                iconSpinner.style.display = "block";
                iconSpinner.className = "fa-solid fa-xmark"
                iconSpinner.style.color = "white";
                iconSpinner.style.backgroundColor = "red";
                iconSpinner.style.padding = "7px 10px";
                spinner.querySelector("p").innerHTML = "Sign Up fail!";
                setTimeout(() => 
                {
                    spinner.style.display = "none";
                }, 3000)
            }
            else{
                circleSpinner.style.display = "none";
                iconSpinner.style.display = "block";
                iconSpinner.className = "fa-solid fa-check"
                iconSpinner.style.color = "black";
                iconSpinner.style.backgroundColor = "greenyellow";
                iconSpinner.style.padding = "10px 10px";
                spinner.querySelector("p").innerHTML = "Sign Up successfully!";
                setTimeout(() => 
                {
                    spinner.style.display = "none";
                }, 3000)
                setTimeout(() => 
                {
                    document.querySelector("#root > div > div.divSignUp").style.transform = "scale(0)";
                    divCompleteSignUp.style.top = "9%";
                }, 0)
            }
        }, 2000
        )
    })
    .catch(error => {
        inputEmail.style.borderColor = "red";
        pErrorEmail.style.display = "block";
        circleSpinner.style.display = "none";
        iconSpinner.style.display = "block";
        iconSpinner.className = "fa-solid fa-xmark"
        iconSpinner.style.color = "white";
        iconSpinner.style.backgroundColor = "red";
        iconSpinner.style.padding = "7px 10px";
        spinner.querySelector("p").innerHTML = "Sign Up fail!";
        setTimeout(() => 
        {
            spinner.style.display = "none";
        }, 3000)
        console.error('Error during fetch operation:', error);
    });
}

