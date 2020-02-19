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
          FNAME: nombre, //Variables de la Pagina MailChimp
          LNAME: apellido //Se Pueden Anexar Mas Variables
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data); // se convierte el objeto data en formato JSON

  var options = { //de esta forma se envia los datos, se autoriza y se guarda un nuevo contacto.
    url: "https://us4.api.mailchimp.com/3.0/lists/2cdd45f56b", //audience ID: 2cdd45f56b
    method: "POST",
    headers:{
      "Authorization": "aeud83 d15bfe897dfd7ccd747bf0e0c970dc48-us4"//Modelo de Autenticacion Basica en HTML /MailChimps Key: d15bfe897dfd7ccd747bf0e0c970dc48-us4
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if (error){
      console.log(error);
      //res.send("Hubo un error en el registro!!, por favor trate de Nuevo...");
      res.sendFile(__dirname + "/ErrorPage.html");
    } else {
      console.log(response.statusCode); // se verifica la respuesta del servidor
      if (response.statusCode === 200){
        //res.send("El registro fue exitoso!!");
        res.sendFile(__dirname + "/Success.html");
      } else {
        //res.send("Hubo un error en el registro!!, por favor trate de Nuevo...");
        res.sendFile(__dirname + "/ErrorPage.html");
      }
    }
  });

});

app.listen(3000, function() {
  console.log("Servidor Corriendo en el Puerto 3000");
});

//console.log(nombre, apellido, mail);
//*******************ANIMACIONES EXTRAS, BOTONES, CONTROLES Y MAS*********************************************
