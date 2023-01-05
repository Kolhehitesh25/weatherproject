
const express = require("express");

const https= require("http");

const app = express();
const bodyparser = require("body-parser");


const https = require("https");

app.use(bodyparser.urlencoded({ extended: true }));



app.get("/", function (req, res) {


    res.sendFile(__dirname + "/index.html");

    // res.send("hello this is start:");
});

app.post("/", function (req, res) {

    console.log(req.body.cityname);

    const query = req.body.cityname;
    const Apikey = "703802b4f81565383588b391cec76adf";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + Apikey;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherdata = JSON.parse(data);
            console.log(weatherdata);

            const temp = weatherdata.main.temp;
            console.log(temp);

            const weatherdesc = weatherdata.weather[0].description;
            console.log(weatherdesc);

            const icon = weatherdata.weather[0].icon;
            console.log(icon);

            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The temperature of " + query + " is" + temp + "degree fahrenheit<" + "/h1> ");
            res.write("<h2>The current weather is</h2>" + weatherdesc);
            res.write("<img src=" + imageurl + ">");
            res.send();



        });


    });
});


app.listen(3000, function () {
    console.log("port no. is start::");
});
