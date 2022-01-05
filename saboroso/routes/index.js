var conn = require('./../inc/db');
var express = require('express');
var router = express.Router();
var menus = require('./../inc/menus')
var reservation = require('./../inc/reservation');
var contato = require('./../inc/contato');


let defaults = {
  title: 'Restaurante Saboroso!',
  headerIndex: false
};

let defaultsReservation = {
  title: 'Reserva - Restaurante Saboroso!',
  header: {
    background: 'images/img_bg_2.jpg',
    title: 'Reserve uma Mesa!'
  },
  body: {}
};

let defaultsContact = {
  title: 'Contato - Restaurante Saboroso!',
  header: {
    background: 'images/img_bg_3.jpg',
    title: 'Diga um oi!'
  },
  body: {}
};
/* GET users listing. */

router.get('/', function(req, res, next) {
 
/* GET home page. */

  menus.getMenus().then(results => {

    res.render('index', {
      title: 'Restaurante Saborosooo!!',
      menus: results,
      background: 'images/img_bg_1.jpg',
      h1: 'Restaurante Saboroso!',
      headerIndex: true
    });
    });

  });
 

router.get('/contact', function(req, res, next) {
  menus.getMenus().then(results => {
  res.render('contact', {
    title: 'Restaurante Saboroso!!',
    background: 'images/img_bg_3.jpg',
    h1: 'Diga Oi',
    body: {},
    headerIndex: false
      });
    });
  });

  router.get('/menu', function(req, res, next) {
 
    menus.getMenus().then(results => {

    res.render('menu', {
      title: 'Restaurante Saboroso!!',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu',
      menus: results,
      headerIndex: false
      });
      });
    });
    
    router.get('/reservation', function(req, res, next) {
      
      res.render('reservation', {
        title: 'Restaurante Saboroso!!',
        background: 'images/img_bg_2.jpg',
        h1: 'Reserve uma mesa',
        body: {},
        headerIndex: false
      });
    });
    menus.getMenus().then(results => {
      router.get('/services', function(req, res, next) {
 
        res.render('services', {
          title: 'Restaurante Saboroso!!',
          background: 'images/img_bg_2.jpg',
          h1: 'Prazer poder servir',
          menus: results,
          headerIndex: false
          });
        });
        });

        router.post('/reservation', function(req, res, next) {

          
          if(!req.body.name){
            reservation.render(req,res,"Digite o nome");
          } else if (!req.body.email){
            reservation.render(req,res,'Digite o email');
          } else if (!req.body.people){
            reservation.render(req,res,'Digite o numero');
          } else if (!req.body.date){
            reservation.render(req,res,'Digite o data');
          } else if (!req.body.time){
            reservation.render(req,res,'Digite o hora');
          }else{
          }
          reservation.save(req.body).then(results =>{
              req.body ={};
              reservation.render(req,res,null,"Reserva realizada com sucesso!", false);

            }).catch(err=>{
              reservation.render(req, res, err.message, null, true);
            })
          });

          router.post('/contact', function(req, res, next) {
            if(!req.body.name){
              contato.render(req,res,"Digite o nome");
            } else if (!req.body.email){
              contato.render(req,res,'Digite o email');
            } else if (!req.body.message){
              contato.render(req,res,'Digite a mensagem ');
            }else{
            }
              contato.save(req.body).then(results =>{
                req.body ={};
                contato.render(req,res,null,"Mensagem enviada com sucesso!", false);
  
              }).catch(err=>{
                contato.render(req, res, err.message);
              })
            });


module.exports = router;
