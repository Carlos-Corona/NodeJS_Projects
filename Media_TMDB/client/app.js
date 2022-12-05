const express = require("express");
const app = express();



const port = process.env.PORT || 5500;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

// motor de plantillas
app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));

//Rutas web
app.use('/', require('./router/Routes'));
app.use('/mascotas', require('./router/Mascotas'));

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "ERROR 404"
    })
})


app.listen(port, () => {
    console.log("Connected To frontend!");
})

