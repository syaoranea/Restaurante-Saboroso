var conn = require('./../inc/db');

var express = require('express');
const users = require('../inc/users');
const { text } = require('express');
var admin = require("./../inc/admin");
var menuss = require("./../inc/menus");
var router = express.Router();

router.use(function(req, res, next){
    if(['/login'].indexOf(req.url) === -1 && !req.session.user){
        res.redirect("/admin/login")
    }else{
       next();
    }
});


router.use(function(req,res,next){
    req.menus = admin.getMenus(req);
    next();
});



router.get('/logout', function(req, res, next) {
    
    delete req.session.user;
    res.redirect("/admin/login")
});

router.get('/', function(req, res, next) {
    admin.dasboard().then(data =>{
        res.render('admin/index', admin.getParams(req, {
            title: 'Painel Administrativo',
            data
        }));
    }).catch(err => {
        console.error(err);
    });
    });
    
    

router.get('/contacts', function(req, res, next) {
    
    res.render('admin/contacts', admin.getParams(req, {
        title: 'Painel Administrativo'
    }));
});


router.get('/emails', function(req, res, next) {
    
    res.render('admin/emails', admin.getParams(req, {
        title: 'Painel Administrativo'
    }));
});


router.get('/login', function(req, res, next) {
    
    res.render('admin/login', {
        title: 'Painel Administrativo',
        body: {},
        erro: false
        });
});

router.post('/login', function(req, res, next) {
    if(!req.body.email){
        users.render(req, res, "Preencha o campo email");
    }else if(!req.body.password){
        users.render(req, res, "Preencha o campo senha");
    }else{
        users.login(req.body.email, req.body.password).then(user =>{
            req.session.user = user;
            res.redirect("/admin");
        }).catch(err=>{
            users.render(req, res, err.message || err);
        });
    }
});


router.get('/menus', function(req, res, next) {
    menuss.getMenus().then(data => {
        res.render('admin/menus', admin.getParams(req, {
            title: 'Painel Administrativo',
            data
        }));
    });
    
    
});

router.post('/menus', function(req, res, next) {

    menuss.save(req.fields, req.files).then(results=>{
        console.log(results);
        res.send(results);   
    }).catch(err=>{
        console.log(err);
        res.send(err); 
    })
     
    
});

router.delete("/menu/:id", function(req, res, next ){
    menuss.delete().then(results=>{
        console.log(err);
        res.send(results);
    }).catch(err=>{
        console.log(err);
        res.send(err);
    })
})


router.get('/reservations', function(req, res, next) {
    
    res.render('admin/contacts', admin.getParams(req, {
        title: 'Painel Administrativo'
    }));
});


router.get('/users', function(req, res, next) {
    
    res.render('admin/users', admin.getParams(req, {
        title: 'Painel Administrativo'
    }));
});


module.exports = router;