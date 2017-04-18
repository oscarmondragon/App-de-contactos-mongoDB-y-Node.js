'use strict';

const UserModel = require('../models/user-model'),
  errors = require('../middlewares/errors'),
  usermod = new UserModel();

class UserController {
  index(req, res, next) {
    if ( req.session.username ) {
      res.redirect('/teams');
    } else {
      res.render('login-form', {
        title: 'Autenticación de Usuarios',
        message: req.query.message
      });
    }
  }

  logInGet(req, res, next) {
    res.redirect('/');
  }

  logInPost(req, res, next) {
    let user = {
      username: req.body.username,
      password: req.body.password
    };

    console.log(user);

    usermod.getUser(user, (docs) => {
      req.session.username = ( docs != null ) ? user.username : null;

      console.log(req.session, '---', docs);

      return (req.session.username)
        ? res.redirect('/teams')
        : errors.http401(req, res, next);
    });
  }

  signInGet(req, res, next) {
    res.render('signin-form', { title: 'Registro de Usuarios' });
  }

  signInPost(req, res, next) {
    let user = {
      user_id: 0,
      username: req.body.username,
      password: req.body.password
    };

    console.log(user);

    usermod.setUser(user, (docs) => {
      res.redirect(`/?message=El usuario ${user.username} ha sido creado`);
    });
  }
  
  logOut(req, res, next) {
    req.session.destroy((err) => {
      return (err)
          ? errors.http500(req, res, next)
          : res.redirect('/');
    });
  }
}

module.exports = UserController;