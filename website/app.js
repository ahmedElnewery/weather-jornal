/* Global Variables */
const generateBtn = document.getElementById("generate");
// API Confing
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "e6195e6f19dc781691c2611326627e31";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
// GET data
const getData = async (url = "") => {
  const req = await fetch(url);
  try {
    const data = await req.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// POST data
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
};
// Update UI
const updateUI = async (data) => {
  const projectData = await getData("/data");
  document.getElementById("date").innerHTML = `Date: ${projectData.date}`;
  document.getElementById("temp").innerHTML = `Temperature: ${projectData.temperature} &#8457`;
  document.getElementById("content").innerHTML = `Your Feeling: ${projectData.feelings}`;
};
// Gererate data
const updateData = async () => {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  const country = "us"; //default
  const response = await fetch(
    baseURL + zipCode + "," + country + "&appid=" + apiKey
  );
  try {
    const data = await response.json();
    data.feelings = feelings;
    data.date = newDate;
    await postData("/", data);
    updateUI(data);
  } catch (err) {
    console.log("error", err);
  }
};
generateBtn.addEventListener("click", updateData);
