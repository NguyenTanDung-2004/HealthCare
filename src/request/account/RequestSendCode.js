export function RequestSendCode(inputEmail, p){
    fetch('http://localhost:8080/user/SendCodeUpdatePassword?email=' + inputEmail.value, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        if (data1.code == 1000){
            setTimeout(() => {
                document.querySelector("#root > div > div.divCodeBox").style.top = "1%";
                document.querySelector("#root > div > div.divSpinner").style.display = "none";
                document.querySelector("#root > div > div.divForgot").style.zIndex = "0";
            }, 1000)
        }
        else{
            inputEmail.style.borderColor = "#CCCCCC";
            p.style.display = "none"
        }
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}