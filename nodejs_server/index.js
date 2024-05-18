const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const port = 5000
const bodyParser = require("body-parser");
const userRoute=require("./route/user")

dbConnect();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user",userRoute);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})