'use strict';

const TeamModel = require('../models/team-model'),
  errors = require("../middlewares/errors"),
  teammod = new TeamModel();

class TeamController {
  getAll(req, res, next) {
    return (req.session.username)
      ? teammod.getAll((docs) => {
        res.render('index', {
          title:'Indentation War',
          user:req.session.username,
          data: docs
        });
      })
      : errors.http401(req, res, next)
  }

  getOne(req, res, next) {
    let _id = req.params._id;
    console.log(_id);

    return (req.session.username)
      ? teammod.getOne(_id, (docs) => {
        console.log(docs);
        
        res.render('edit', {
          title : 'Editar Contacto',
          user : req.session.username,
          data : docs
        });
      })
      : errors.http401(req, res, next);
  }

  save(req, res, next) {
    let contacto = {
      _id: (req.body._id || null),
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      facebook: req.body.facebook
    };
    
    console.log(contacto);

    return (req.session.username)
      ? teammod.save( contacto, () => res.redirect('/teams') )
      : errors.http401(req, res, next);
  }

  delete(req, res, next) {
    let _id = req.params._id;
    console.log(_id);

    return (req.session.username)
      ? teammod.delete( _id, () => res.redirect('/teams') )
      : errors.http401(req, res, next);
  }

  addForm(req, res, next) {
    return (req.session.username)
      ? res.render('add', {
        title: 'Agregar Contacto',
        user : req.session.username
      })
      : errors.http401(req, res, next);
  }
}

module.exports = TeamController;