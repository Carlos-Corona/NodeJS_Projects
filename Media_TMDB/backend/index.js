import express from "express";

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());


app.listen(3000, () => {
    console.log("Connected To Backend!");
})