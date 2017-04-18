'use strict';
const TeamController = require('../controllers/team-controller'),express = require('express'),
    router = express.Router();
const conn = require('../models/team-schema');
 const tc = new TeamController();
// Ruta para mostrar la pagina de inicio y mostrar los contactos existentes
router.get("/teams",tc.getAll);
// Ruta para mostrar formulario para agregar un contacto
router.get('/agregar', tc.addForm);
// Ruta para crear un contacto
router.post('/teams', tc.save);
// Ruta para editar contactos
router.get('/editar/:_id', tc.getOne);
// Ruta para actualizar los contactos
router.put('/actualizar/:_id', tc.save);
//Ruta para eliminar un contacto
router.delete('/eliminar/:_id',tc.delete);

module.exports = router;