export function RequestLogin(inputEmail, inputPassword, pEmail, pPassword) {
  document.querySelector("#root > div > div.divSpinner > i").style.display =
    "none";
  document.querySelector("#root > div > div.divSpinner > div").style.display =
    "block";
  document.querySelector("#root > div > div.divSpinner > p").innerHTML =
    "Logging in...";
  document.querySelector("#root > div > div.divSpinner").style.display = "flex";
  fetch(
    "http://localhost:8080/user/Login?email=" +
      inputEmail.value +
      "&password=" +
      inputPassword.value,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  )
    .then((response) => {
      // if (!response.ok) {
      //     throw new Error('Network response was not ok ' + response.statusText);
      // }
      return response.json(); // Change this to response.json() if the response is JSON
    })
    .then((data1) => {
      console.log(data1);
      //document.querySelector("#root > div > div.divSpinner").style.display = "none";
      if (data1.code == 1001) {
        if (data1.message == "email is not exits") {
          inputEmail.style.borderColor = "red";
          pEmail.style.display = "block";
        } else {
          inputPassword.style.borderColor = "red";
          pPassword.style.display = "block";
        }
        document.querySelector("#root > div > div.divSpinner").style.display =
          "none";
      } else {
        setTimeout(() => {
          console.log(data1.role);
          if (data1.role == "admin") {
            window.location = "http://localhost:3000/dashboard/profile";
          } else {
          window.location = "http://localhost:3000/home_in";
          }
        }, 2000);
      }
    })
    .catch((error) => {});
}
