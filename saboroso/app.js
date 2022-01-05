var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var formidable = require('formidable');
var formidablee = require('express-formidable');
var http = require('http');
var socket = require('socket.io');
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

var http = http.Server(app);
var io = socket(http);

io.on('connection', function(socket){
  console.log('novo usuário conectado ');
  io.emit("reservation update",{
    date: new Date()
  });
})

//midw
app.use((req, res, next)=>{
  if((req.method === 'POST') && (req.path != '/admin/login')){
    app.use(formidablee({
      encoding:'utf-8',
      uploadDir: path.join(__dirname, "/public/images"),
        keepExtension: true,
        multiples: true
    }));

    var form = new formidable.IncomingForm({
      uploadDir: path.join(__dirname, "/public/images"),
      keepExtension: true
    });
    form.parse(req, function(err, fields, files){
      req.fields = fields;
      req.files = files;
      next();
    });

  }else{
    next();
  }
});



  

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
 
  store: new RedisStore({
    host:'localhost',
    port:6379
  }),
  //criptografia a sessão
  secret:'p@ssw0rd',
  resave: true,
  saveUninitialized: true
 
}));

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.listen(3000, function () {
  console.log('servidor rodando... ');
})

module.exports = app;
