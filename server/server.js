 require('./config/config');
 const express = require('express');
 const mongoose = require('mongoose');



 const app = express();

 const bodyParser = require('body-parser');


 //  analizar la aplicación / x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: false }))

 //  analizar la aplicación / json
 app.use(bodyParser.json())


 app.use(require('./routes/usuario'));



 // en el localhost, definiendo el puerto donde esta corriendo nuestra base de datos mongodb
 mongoose.connect(process.env.URLDB, (err, res) => {

     if (err) throw err;

     console.log('Base de datos ONLINE');


 });



 app.listen(process.env.PORT, () => {
     console.log('escuchando el puerto', process.env.PORT);
 });