const express= require("express");
const bodyParser=require("body-parser");

const app=express();
const request=require("request");

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req,res)
    {
        res.sendFile(__dirname+"/index.html");
    });


app.post("/", function(req,res){
    //console.log(req.body.crypto);
    var crypto= req.body.crypto;
    var fiat= req.body.fiat;
    
    var baseURL= "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    var finalURL= baseURL+crypto+fiat;
    
    request(finalURL,function(eror,response,body){
        console.log(response.statusCode);
        
    var data= JSON.parse(body);
    var price= data.last;
    var currentDate= data.display_timestamp;
        res.write("<p>The current date is: "+ currentDate+"</p>");
        
        res.write("<h1>The current price of" + crypto +" is: "+price+ fiat+"</h1>");
    
        res.send();
        
    });
});

app.listen(3000, function(){
    
    console.log("Server is running on port 3000.")
    
});
