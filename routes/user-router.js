'use strict';
const express = require('express'),
    errors = require('../middlewares/errors'),
    router = express.Router();
const conn = require('../models/user-schema');
// Ruta para mostrar la pagina de inicio y mostrar los contactos existentes
router.get("/", function(req, res) {
    if (req.session.username) {
        res.redirect('/teams');
    } else {
        res.render('login-form', {
            title: "Inicio de sesión",
            message: req.query.message
        });
    }
});
router.get("/login", function(req, res) {
        res.redirect('/');
});
router.post("/login", function(req, res) {
    let user = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(user);
    conn.findOne({
        username: user.username,
        password: user.password
    }, (err, docs) => {
        req.session.username = (docs != null) ? user.username : null;
        console.log(req.session, '---', docs);
        return (req.session.username) 
            ? res.redirect('/teams') 
            : errors.http401(req, res);
    });
});
router.get("/signin", function(req, res) {
    res.render('signin-form', {
        title: "Registro de usuarios",
    });
});
router.post("/signin", function(req, res) {
    let user = {
        user_id: 0,
        username: req.body.username,
        password: req.body.password
    };
    console.log(user);
    conn.create(user, (err) => {
        if (!err) {
            res.redirect(`/?message=El usuario ${user.username} 
                ha sido creado`);
        } else {
            console.log("Error al crear usuario");
        }
    });

});
router.get("/logout", function(req, res) {
        req.session.destroy((err) => {
            return (err)
                    ? errors.http500(req, res)
                    : res.redirect('/');
                });
});
// Ruta para mostrar formulario para agregar un contacto
module.exports = router;