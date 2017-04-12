'use strict';
const express = require('express'),
    router = express.Router();
const conn = require('../models/team-schema');
// Ruta para mostrar la pagina de inicio y mostrar los contactos existentes
router.get("/", function(req, res) {
    conn.find({}, (err, docs) => {
        if (!err) {
            res.render("index", {
                title: 'Agenda de contactos',
                data: docs
            });
        } else {
            console.log(err);
        }
    })
});
// Ruta para mostrar formulario para agregar un contacto
router.get('/agregar', function(req, res) {
    res.render('add', {
        title: 'Agregar Contacto'
    });
});
// Ruta para crear un contacto
router.post('/', function(req, res) {
    let contacto = {
        _id: (req.body._id || null),
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        facebook: req.body.facebook
    };
    console.log(contacto);
   
                conn.create(contacto, (err) => {
                    if (!err) {
                        res.redirect('/');
                    } else {
                        console.log("Error en create(contacto)");
                    }
                });
           });
// Ruta para editar contactos
router.get('/editar/:_id', function(req, res) {
    conn.findOne({
        _id: req.params._id
    }, (err, docs) => {
        if (!err) {
            res.render('edit', {
                title: 'Editar Contacto',
                data: docs
            });
        } else {
            console.log(err);
        }
    });
});
// Ruta para actualizar los contactos
router.put('/actualizar/:_id', function(req, res) {
    let contacto = {
        _id: (req.body._id || null),
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        facebook: req.body.facebook
    };
    console.log(contacto);
                conn.findOneAndUpdate({
                    _id: contacto._id
                }, {
                      name: contacto.name,
                    phone: contacto.phone,
                    email: contacto.email,
                    facebook: contacto.facebook
                }, (err) => {
                    if (!err) {
                        res.redirect('/');
                    } else {
                        console.log("Error en actualizar contacto)");
                    }
                });
            
});
//Ruta para eliminar un contacto
router.delete('/eliminar/:_id', function(req, res) {
    let _id = req.params._id;
    console.log(_id);
    conn.remove({
        _id: _id
    }, (err) => {
        if (!err) {
            res.redirect('/');
        } else {
            console.log("Error al eliminar contacto");
        }
    });
});
//se hace un middleware para los errores 
router.use((req, res, next) => {
    let err = new Error();
    err.status = 404;
    err.statusText = 'NOT FOUND';
    res.render('error', {
        error: err
    });
});
module.exports = router;