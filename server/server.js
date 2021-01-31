require('./config/config');


const express = require('express');
const app = express();

const bodyParser = require('body-parser');

//  analizar la aplicación / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//  analizar la aplicación / json
app.use(bodyParser.json())


app.get('/usuario', function(req, res) {
    res.json('get Usuario');
})
app.post('/usuario', function(req, res) {

    // este body es lo que va aparecer cuando nosotros procesemos o mejor dicho,
    // cuando el body paser, procese cualquier payload que reciba de las peticiones de arriba,
    // bodyPaser
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            persona: body
        })
    }


    res.json({
        persona: body
    });
});

app.put('/usuario/:id', function(req, res) {

    // Aesta variable yo le puse ide pero es mejor ponerle id, pero es para no confundirme
    // porque normalmente le ponen id a todo 
    let ide = req.params.id;
    res.json({
        ide
    });
})

app.delete('/usuario', function(req, res) {
    res.json('delete Usuario');
})

app.listen(process.env.PORT, () => {
    console.log('escuchando el puerto', process.env.PORT);
});