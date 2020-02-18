//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express(); //instancia de express
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public")); //Se utiliza para Cargar los Archivos staticos locales

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/Index.html");//
});

app.post("/", function(req, res) {

  var nombre = req.body.Nombre;
  var apellido = req.body.Apellido;
  var mail = req.body.Email;

  console.log(nombre, apellido, mail);
});

app.listen(3000, function() {
  console.log("Servidor Corriendo en el Puerto 3000");
});
//*******************ANIMACIONES EXTRAS, BOTONES, CONTROLES Y MAS*********************************************
