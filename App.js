//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express(); //instancia de express

app.use(express.static(__dirname)); //Se utiliza para Cargar los Archivos staticos locales
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/Index.html");//
});

app.post("/", function(req, res) {

  var nombre = req.body.Nombre;
  var apellido = req.body.Apellido;
  var mail = req.body.Email;

  var data = {
    members: [
      {
        email_address: mail,
        status: "subscribed",
        merge_fields:{
          FNAME: nombre,
          LNAME: apellido
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/2cdd45f56b",
    method: "POST",
    headers:{
      "Authorization": "aeud83 d15bfe897dfd7ccd747bf0e0c970dc48-us4"//Modelo de Autenticacion Basica en HTML
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if (error){
      console.log(error);
    } else {
      console.log(response.statusCode);
    }
  });


});

app.listen(3000, function() {
  console.log("Servidor Corriendo en el Puerto 3000");
});
//*******************ANIMACIONES EXTRAS, BOTONES, CONTROLES Y MAS*********************************************
//MailChimps Key: d15bfe897dfd7ccd747bf0e0c970dc48-us4
//audience ID: 2cdd45f56b
//console.log(nombre, apellido, mail);
