const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();


app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde) // salta los siguiente 5 registros
        .limit(limite) // muestrame los 5 registros
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios: usuarios,
                    cuantos: conteo
                });
            });


        });

});




app.post('/usuario', function(req, res) {

    // este body es lo que va aparecer cuando nosotros procesemos o mejor dicho,
    // cuando el body paser, procese cualquier payload que reciba de las peticiones de arriba,
    // bodyPaser
    let body = req.body;



    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });
});

app.put('/usuario/:id', function(req, res) {

    // Aesta variable yo le puse ide pero es mejor ponerle id, pero es para no confundirme
    // porque normalmente le ponen id a todo 
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);






    Usuario.findByIdAndUpdate(id, body, { new: true, runValidator: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })


});

app.delete('/usuario/:id', function(req, res) {


    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });

        };


        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }



        res.json({
            ok: true,
            usuario: usuarioBorrado
        });


    });


});


module.exports = app