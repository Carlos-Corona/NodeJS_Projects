const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    res.send('MASCOTAS')
    //res.render("mascotas", {listaMascotas: "Aquí irán todas las mascotas"})
})

router.get('/mapas', (req, res) => {
    res.send('papas')
    //res.render("mascotas", {listaMascotas: "Aquí irán todas las mascotas"})
})

module.exports = router;