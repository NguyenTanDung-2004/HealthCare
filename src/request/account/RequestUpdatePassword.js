export function RequestUpdatePassword(listData){

    document.querySelector("#root > div > div.divCodeBox > div.divInput > input").style.borderColor = "#CCCCCC";
    document.querySelector("#root > div > div.divCodeBox > div.divInput > p").style.display = "none"

    const rawData = {
        email: listData[0],
        password: listData[1],
        code: listData[3]
    }

    const jsonData = JSON.stringify(rawData);
    fetch('http://localhost:8080/user/UpdatePassword', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
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
                document.querySelector("#root > div > div.divSpinner > i").style.display = "block";
                document.querySelector("#root > div > div.divSpinner > div").style.display = "none";
                document.querySelector("#root > div > div.divSpinner > p").innerHTML = "Change password successfully!"
                document.querySelector("#root > div > div.divSpinner").style.display = "flex";
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }, 1000)
            setTimeout(() => {
                document.querySelector("#root > div > div.divSpinner").style.display = "none";
            }, 3000)
        }
        else{
            document.querySelector("#root > div > div.divCodeBox > div.divInput > input").style.borderColor = "red";
            document.querySelector("#root > div > div.divCodeBox > div.divInput > p").style.display = "block"
            document.querySelector("#root > div > div.divSpinner").style.display = "none";
        }
    })
    .catch(error => {
        document.querySelector("#root > div > div.divSpinner").style.display = "none";
        console.error('Error during fetch operation:', error);
    });
}