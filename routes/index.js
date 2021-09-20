var bodyParser = require('body-parser');
const e = require('express');
var express = require('express');
var router = express.Router();
var app = express();
var con = require('../config/ConnectSouce')
var ac = require('../Model/Account')
var lf = require('../Model/LogicFun')
var lg = require('../Model/Login')
var from_ACCOUNT = require('../Model/DB/ACCOUNT')
var from_SendForget = require('../Model/apiLogic/SendForget')
var from_GetForget = require('../Model/apiLogic/GetForget')
var from_ImgaeCode = require('../Model/General/ImageCode')
var from_ImageOut = require('../Model/apiLogic/ImageOut')
app.use(bodyParser.json())
/* GET home page. */

router.get('/dbtest', function (req, res, next) {
  console.log("一")
  //ac.Select(function(result){
  // res.render('index',{ title: JSON.stringify(result[3]) })
  // res.send({
  // msg:JSON.stringify(result[3]),
  //  user:result
  // })
  // console.log(result)
  //})
  // ac.Select().then(r=>{
  //   console.log(r)
  // })
  ac.Select().then(result => {
    console.log(result)
  })
  // console.log(rr)

});

router.get('/error',function (req, res, next){
  next('error page.');
})

//[取得圖型驗證碼]
router.post('/getImageCode', function (req, res, next) {
  from_ImageOut.ImageEncryOut().then(rs => {

    req.session.imagepass = rs.CodeEncry

    console.log(req.session.imagepass)

    res.type('svg')

    res.status(201).send({
      Status: true,
      Data: rs.Imagedata,
      Msg: "sucess"
    })

  }).catch(err => {
    console.log(err)
  })
})

//[比對圖型驗證碼]
router.post('/checkimagecodepass', function (req, res, next) {
  let passImagecode = ''
  lg.CheckImageCodePass(req.body.imagepasscode, req.session.imagepass).then(ans => {
    if (ans == true) {
      res.status(200).send({
        msg: "比對成功"
      })
    }
    if (ans == false) {
      res.status(200).send({
        msg: "比對失敗"
      })
    }

  })
  // console.log(passImagecode)
})
//[查詢帳號]
router.post('/SelectUser', function (req, res, next) {
  lf.IsVerifyDate(req.body.Token_data.Token, async function (callback_Token) {
    if (callback_Token == true) {
      console.log(req.body)
      let IsVerifyId_result = await lf.IsVerifyId(req.body.Token_data.TokenID)
      // console.log(IsVerifyId_result)
      if (IsVerifyId_result == true) {

        try {
          let SelectByUserID_result = await from_ACCOUNT.SelectByUserID(req.body.AC_USER)
          if (SelectByUserID_result.length != 0) {
            res.send({
              Status: true,
              Data: SelectByUserID_result,
              Msg: "sucess"
            })
          }
          else {
            res.send({
              Status: false,
              Msg: "fail"
            })
          }
        }
        catch (err) {
          console.log(err)
        }
      }
      else {
        res.send({
          Status: false,
          Msg: "無效TokenID"
        })
      }

    }
    else {
      res.send({
        Status: false,
        Msg: "無效Token"
      })
    }
  })
})
//[新增帳號]
router.post('/Register',  function (req, res, next) {
  lf.IsVerifyDate(req.body.Token_data.Token, async function (callback) {
    if (callback == true) {
     let Insert_result =  await ac.Insert(req.body.U_data)
     try{
      if(Insert_result.length!=0){
        res.send({
          Status:true,
          Data:'',
          Msg:"sucess"
        })
      }
     }
     catch(err){
       console.log(err)
     }
      // ac.Insert(req.body.AC_PWD, req.body.AC_USER, req.body.AC_USERNAME, req.body.AC_EMAIL, function (result) {
      //   res.status(201).send({
      //     msg: "成功",
      //     list: req.body
      //   })
      // })
    }
    else {
      res.status(201).send({
        msg: "過期",
        list: req.body.Token
      })
    }
  })
});
//[帳號登入]
router.post('/login', function (req, res, next) {
  lf.IsVerifyDate(req.body.Token_data.Token, function (callback) {
    if (callback == true) {

      lg.CheckImageCodePass(req.body.U_data.imagepasscode, req.session.imagepass)
        .then(ans => {
          if (ans == true) {
            lg.CheckPass(req.body.U_data, function (callback) {
              if (callback != "") {
                res.send({
                  Status: true,
                  Data: callback,
                  Msg: "sucess"
                })
              }
              else {
                res.send({
                  Status: false,
                  Msg: "fail"
                })
              }
            })
          }
          else {
            // next(err)
            res.send({
              Status: false,
              Msg: "圖型對比失敗"
            })
          }
        })
        .catch(err => {
          console.log(err)
          const error = new Error("page not found")
          next(error)
        })
    }
    else {
      res.send({
        msg: "過期",
        list: req.body.Token
      })
    }
  })
});
//[傳送忘記密碼驗證碼]
router.post('/SendForget', function (req, res, next) {
  lf.IsVerifyDate(req.body.Token_data.Token, async function (callback) {
    if (callback == true) {
    let CheckForget_result = await  from_SendForget.CheckForget(req.body.U_data)
    try{
      if(CheckForget_result == true){
        res.send({
          Status: true,
          Data: "",
          Msg: "sucess"
        })
      }
      else{
        res.send({
          Status: false,
          Msg: "fail"
        })
      }
    }
    catch(err){
      console.log(err)
    }
    }
  })
})
//[檢核忘記密碼]
router.post('/GetForget', function (req, res, next) {
  switch (req.body.TYPE) {
    //[驗證token]
    case "check":
      from_GetForget.CheckToken(req.body.Token).then(rs => {
        if (rs == true) {
          res.status(201).send({
            mas: "sucess",
            list: true
          })
        }
        else {
          res.status(400).send({
            mas: "fail",
            list: false
          })
        }
      })
      break
    //[驗正修改密碼]    
    case "change":
      from_GetForget.CheckPassWord(req.body).then(rs => {
        if (rs == true) {
          res.status(201).send({
            mas: "sucess",
            list: true
          })
        }
        else {
          res.status(400).send({
            mas: "fail",
            list: false
          })
        }
      })
      break
    default:
      console.log("TYPE錯誤")
      break
  }
})
//[驗證API是否過期]
router.post('/IsVerifyDateTest', function (req, res, next) {
  lf.IsVerifyDate(req.body.Token, function (callback) {
    console.log(callback)
    res.status(201).send({
      mas: "sucess",
      list: callback
    })

  })
})
//[解密]
router.post('/DecryptionTest', function (req, res, next) {
  lf.Decryption(req.body.Token, function (callback) {
    res.status(201).send({
      mas: "sucess",
      list: callback
    })
  })
})
//[取得今天日期並加密]
router.post('/CryptionTest', function (req, res, next) {
  let TodayYear = new Date().getFullYear()
  let TodayMonth = new Date().getMonth() + 1
  let TodayDay = new Date().getDate()
  let TodayHour = new Date().getHours()
  let TodayMinutes = new Date().getMinutes()
  let TodayDate_Time = TodayYear + "/" + TodayMonth + "/" + TodayDay + " " + TodayHour + ":" + TodayMinutes
  lf.Encryption(TodayDate_Time, function (callback) {
    res.status(201).send({
      Status: true,
      Data: callback,
      Msg: "sucess"
    })
  })
});


module.exports = router;
