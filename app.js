const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000,function(){
  console.log("Server started on port 3000.")
})

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  const query=req.body.cityName;
  const apiKey="e085e65cfe41ca3ec7d0043f5c88abd6";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const description=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const iconUrl=" http://openweathermap.org/img/wn/" + icon + "@4x.png";
      res.write("<h1>The temperature in "+query+" is " + temp + " degree celsius.</h1>");
      res.write("<p>The weather is currently " + description + "</p>");
      res.write("<img src="+iconUrl+">");
      res.send();
    })
  })
})






// http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=e085e65cfe41ca3ec7d0043f5c88abd6&units=metric
