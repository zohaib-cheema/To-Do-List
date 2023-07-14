const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

const items = [];
const workItems = [];

const date = require(__dirname + "/date.js");

app.get("/",function(req,res){  
    const day = date.getDate();
    res.render("list", {listTitle : day, newListItems : items});
});

app.post("/",function(req,res){
    const newItem = req.body.newItem;

    if(req.body.list==="Work") {
        workItems.push(newItem);
        res.redirect("/work");
    }
    else {
        items.push(newItem);
        res.redirect("/");
    }
});

app.get("/work",function(req,res){
    res.render("list", { listTitle : "Work List", newListItems : workItems});
});

app.listen(3000,function(){
    console.log("Server is now running on port 3000");
});