const express = require("express");
const cors = require("cors");
const btoa = require("btoa");
require("dotenv").config();
// const fetch = require("node-fetch");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const username = "ca04fb35-9dae-499a-805f-f35d79495551";
const password = "";

app.get("/api/jobs", async (req, res) => {
  const { keyword } = req.query;

  const apiUrl = `https://www.reed.co.uk/api/1.0/search?keywords=${keyword}`;

  try {
    const base64Credentials = btoa(`${username}:${password}`);
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    res.json(data.results);
  } catch (error) {
    console.log("Error while making request", error);
  }
});

app.get("/api/job/:id", async (req, res) => {
  const { id } = req.params;

  const apiUrl = `https://www.reed.co.uk/api/1.0/jobs/${id}`;

  try {
    const base64Credentials = btoa(`${username}:${password}`);
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("respose sent");
    res.json(data);
  } catch (error) {
    console.log("Error while making request", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
