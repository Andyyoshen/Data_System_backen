var bodyParser = require('body-parser');
var createError = require('http-errors');

var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var session = require('express-session') //要注意路徑
var MySQLStore = require('express-mysql-session')(session)
//var FileStore = require('session-file-store')(session);
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// ----- 測試中暫時關閉
var  MySqlOptions = {
      host: 'localhost',          //地址
      user: 'root',               //使用者名稱
      password: '123456',        //密碼
      database: 'session_test',    //資料庫     
  }
//------------------
// ----- 測試中暫時關閉
app.use(session({
  name: 'key',
  secret: 'chyingp',  // 用来对session id相关的cookie进行签名
  store: new MySQLStore(MySqlOptions),
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
      maxAge: 1000 * 1000 // 有效期，单位是毫秒
  }
}))
//-------
//console.log(session())
//========================================================================
app.post('/test2', function(req, res, next) {
  // req.session.name = 'cc'
  //  console.log(req.session )
  res.send("d");
});
app.use(bodyParser.json())
app.get('/test4',function(req,res,next){
  res.status(201).send({
    Status: true,
    Data: "dddd",
    Msg: "sucess"
  })
});
app.post('/test5', function (req, res) {
  //console.log("主页 POST 请求");
 res.send(req.body.name)
 // res.send();
})
//========================================================================

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 取得public靜態檔

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
