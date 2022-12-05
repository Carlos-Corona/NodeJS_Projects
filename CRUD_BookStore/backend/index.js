import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"db_admin",
    password:"P455_dbLog",
    database:"book_store"
});

app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.json("Connected to backend!");
})

app.get("/books", (req,res) => {
    const q = "SELECT * FROM books;"
    db.query(q,(err,data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post("/books", (req,res) => {
    const q = "INSERT INTO books (`id`,`title`,`descr`,`cover`) VALUES (?);"
    const values = [
        req.body.id,
        req.body.title,
        req.body.descr,
        req.body.cover
    ];
    db.query(q,[values],(err, data) => {
        if (err) {
            return res.json(err);
        }
        console.log("Book created here;")
        return res.json(data);
    });
});



app.listen(8800, () => {
    console.log("Connected To Backend! Updated");
})