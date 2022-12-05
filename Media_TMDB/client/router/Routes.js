const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    // console.log(__dirname)
    res.send("HOME DIR");
})

router.get('/serv', (req, res) => {
    res.send("SERV DIR")
    //res.render("servicios", {tituloServicios: "Este es un mensaje dinámico de servicios"})
})

module.exports = router;