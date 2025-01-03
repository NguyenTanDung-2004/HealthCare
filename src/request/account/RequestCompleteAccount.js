export function RequestCompletAccount(rawData) {
  const jsonData = JSON.stringify(rawData);
  fetch("http://localhost:8080/user/Complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // allow save cookie from client
    body: jsonData,
  })
    .then((response) => {
      // if (!response.ok) {
      //     throw new Error('Network response was not ok ' + response.statusText);
      // }
      return response.json(); // Change this to response.json() if the response is JSON
    })
    .then((data1) => {
      if (data1.code == 1000) {
        setTimeout(() => {
          window.location = "http://localhost:3000/home_in";
        }, 1000);
      }
    })
    .catch((error) => {
      console.error("Error during fetch operation:", error);
    });
}
