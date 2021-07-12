const express = require('express');
const https = require('https'); // no need to import this because it's a native node module and so it comes with the project initialisation
const bodyParser = require('body-parser');

const app = express();

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");

    // })
    // res.send("Server is up and running!");
});

app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function(req, res){
    // console.log("Post request recieved");
        // making an http (get) request over the internet to the open weather (api) url to fetch some data
        const query = req.body.cityName;
        const appKey = "08c7881a89d3c99e4e2b83bae432388b";
        const unit = metric;
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey +"&units=" + unit;
        https.get(url, function(response) {
        //     console.log(response.statusCode);
    
            response.on("data", function(data){
                const weatherData = JSON.parse(data); // turns the JSON that is currently in another format(hex or string or binary) to a javascript object
                // console.log(weatherData);
                const temp = weatherData.main.temp;
                const weatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                
                res.write(`<p>The weather is currently `  + weatherDescription + `</p>`);
                res.write(`<h1>The temperatute in ` + query + ` is ` + temp + ` degree Celsius.</h1>`);
                res.write(`<img src=` + imageUrl +`>`);
    
                res.send();
    
                // console.log(weatherDescription);
                // const object = {
                //     Name: "John",
                //     noOfLegs: 3
                // };
                // console.log(JSON.stringify(object));
            });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
})