import express from "express";
import mysql from "mysql";
import cors from "cors";

var _global_id = 0;

const app = express();
// push them above the router middleware!

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());


const db = mysql.createConnection({
    host:"localhost",
    user:"db_admin",
    password:"P455_dbLog",
    database:"tmdb_database"
});

app.use(cors())


app.get("/", (req, res) => {
    res.json("Connected to backend!");
})


// GET METHOD TO REQUEST ALL DATA AS JSON FILE THROUGHT API
app.get("/api/media/", (req,res) => {
    const q = "SELECT * FROM media;"
    db.query(q,(err,data) => {
        if (err) {
            return res.json(err);
        }
        console.log("Connected To Backend! /api/media GET");
        return res.json(data);
    });
});


// GET METHOD TO REQUEST ESPECIFIC DATA AS JSON FILE THROUGHT API
app.get("/api/media/:id", (req,res) => {
    const q = "SELECT * FROM media WHERE id = ?;"
    db.query(q,[req.params.id],(err,data) => {
        if (err) {
            return res.json(err);
        }
        console.log("Connected To Backend! /api/media GET [id]");
        return res.json(data);
    });
});

app.get("/api/show/last_id/", (req,res) => {
    let answer = {
        id:_global_id
    }
    console.log(_global_id)
    return res.json(answer);
});

app.post("/api/store/last_id/:id", (req,res) => {
    console.log(req.params.id);
    _global_id = req.params.id;

    let answer = {
        id:_global_id
    }
    return res.json(answer);
});



// POST METHOD TO SET ESPECIFIC DATA AS JSON FILE THROUGHT API
app.post("/api/media/", (req,res) => {
    const q = "INSERT INTO media (`id`,`title`,`descr`,`cover`,`vote_average`,`release_date`,`media_type`) VALUES (?);"
    const values = [
        req.body.id,
        req.body.title,
        req.body.descr,
        req.body.cover,
        req.body.vote_average,
        req.body.release_date,
        req.body.media_type
    ];
    
    db.query(q,[values],(err, data) => {
        if (err) {
            console.log(Date.now());
            console.log("MEDIA error here;")
            console.log(values)
            return res.json(err);
        }
        console.log("MEDIA created here;")
        console.log(values)
        return res.json(data);
    });
});

// PUT METHOD TO UPDATE ESPECIFIC DATA AS JSON FILE THROUGHT API
app.put("/api/media/:id",(req,res) => {
    let id = req.params.id;
    let title = req.body.title;
    let descr = req.body.descr;
    let cover = req.body.cover;
    let vote_average = req.body.vote_average;
    let release_date = req.body.release_date;
    let media_type = req.body.media_type;
    let sql = "UPDATE media SET title = ?, descr = ?, cover = ?,vote_average = ?, release_date = ?,media_type = ? WHERE id = ?;"
    db.query(sql,[title, descr, cover, vote_average, release_date, media_type, id], (err, data) => {
        if (err) {
            return res.json(err);
        } 
        console.log("MEDIA Updated PUT [id]");
        return res.json(data);
    });

});

// DELETE METHOD TO DELETE ESPECIFIC DATA AS JSON FILE THROUGHT API
app.delete("/api/media/:id",(req,res) => {
    let sql = "DELETE FROM media WHERE id = ?";
    db.query(sql,[req.params.id],(err,data) =>{
        if (err) {
            console.log("error on DELETE", req.params.id)
            return res.json(data);
        }
        console.log("DELETED media with id = ", req.params.id);
        return res.json(data);
    })
})

app.listen(3000, () => {
    console.log("Connected To Backend! Updated");
})