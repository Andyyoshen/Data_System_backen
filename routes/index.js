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
var from_GetView = require('../Model/apiLogic/GetView')
var from_GetAuthority = require('../Model/apiLogic/GetAuthority')
var from_GetRegister = require('../Model/apiLogic/GetRegister')

app.use(bodyParser.json())
/* GET home page. */

router.get('/rdstest', function (req, res, next) {
  // res.status(201).send({
  //   Status: true,
  //   Data: "hellow",
  //   Msg: "sucess"
  // })
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
  try{
    ac.Select().then(result => {
      console.log("adsasdasd")
      console.log(result)
      res.status(201).send({
        Status: true,
        Data: result,
        Msg: "sucess"
      })
      
    })
  }
  catch(err){
    console.log("大家好")
  }
  
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
//[觀看柴權圖片(權線)]
router.post('/DogViewCard',async function(req,res,next){
  lf.IsVerifyDate(req.body.Token_data.Token,async function(callback_Token){
    if(callback_Token == true){
      try{
        // IsVerifyId_result 撈使用者權限
        let IsVerifyId_result = await lf.IsVerifyId(req.body.Token_data.TokenID)
        
        // 把資料庫的權限表丟到Authority_Judgment_result 注意!! 這裡只是判斷權線
        let Authority_Judgment_result = await from_GetAuthority.Authority_Judgment(req.body.U_data,IsVerifyId_result)
        
        if(Authority_Judgment_result == true){
          let ViewPicture_result = await from_GetView.ViewPicture(req.body.U_data,IsVerifyId_result)
          {
            res.send({
            Status:true,
            Data:ViewPicture_result,
            Msg:"sucess"
            })
          }
        }
        else{
          res.send({
            Status:false,
            Data:'權線不足',
            Msg:"fail"
          })
        }
       
      }
      catch(err){
        console.log(err)
        res.send({
          Status:505,
          Data:'',
          Msg:"fail"
        })
      }
    }
  })
})
//[觀看內容(權線)]
router.post('/ViewCard',async function(req,res,next){
  
  lf.IsVerifyDate(req.body.Token_data.Token,async function(callback_Token){
    if(callback_Token == true){
      try{
        let IsVerifyId_result = await lf.IsVerifyId(req.body.Token_data.TokenID)
        if(IsVerifyId_result.AI_Status == 'admin'){
          res.send({
            Status:true,
            Data:'/TaiwanMap',
            Msg:"sucess"
          })
        }
        else{
          res.send({
            Status:false,
            Data:'無效驗證',
            Msg:"fail"
          })
        }
       
        }
      catch(err){
        console.log(err)
      }
      
    }
 })
})
//[依TokenID查詢使用者資料]
router.post('/GetAccountInfo',function(req,res,next){
  lf.IsVerifyDate(req.body.Token_data.Token,async function(callback_Token){
    if(callback_Token == true){  
      try{
        var GetACID_result =  await lf.GetACID(req.body.Token_data.TokenID)
        if(GetACID_result != false){
          res.send({
            Status: true,
            Data: GetACID_result,
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
//[依AC_USERNAME查詢帳號]
router.post('/CheckAccountUserName', function (req, res, next){
  console.log(req.body.U_data)
  lf.IsVerifyDate(req.body.Token_data.Token,async function(callback_Token){
    if(callback_Token == true){
      try{
      let SelectByUserNAME_result = await from_ACCOUNT.SelectByUserNAME(req.body.U_data)
      console.log(SelectByUserNAME_result)
      if(SelectByUserNAME_result.length==0)
      {
        res.send({
          Status:true,
          Data:"sucess",
          Msg:"sucess"
        })
      }
      else{
        res.send({
          Status:true,
          Data:"fail",
          Msg:"sucess"
        })
      }
    }
    catch(err){
      res.send({
        Status:false,
        Data:"",
        Msg:"fail"
      })
    }  
    }
    else{
      res.send({
        msg: "過期",
        list: req.body.Token
      })
    }
    
  })
})

//[依AC_USER查詢帳號]
router.post('/SearchAccount', function (req, res, next){
  console.log(req.body.U_data)
  lf.IsVerifyDate(req.body.Token_data.Token,async function(callback_Token){
    if(callback_Token == true){
      try{
      let SelectByUserID_result = await from_ACCOUNT.SelectByUserID(req.body.U_data)
      console.log(SelectByUserID_result)
      if(SelectByUserID_result.length==0)
      {
        res.send({
          Status:true,
          Data:"sucess",
          Msg:"sucess"
        })
      }
      else{
        res.send({
          Status:true,
          Data:"fail",
          Msg:"sucess"
        })
      }
    }
    catch(err){
      res.send({
        Status:false,
        Data:"",
        Msg:"fail"
      })
    }  
    }
    else{
      res.send({
        msg: "過期",
        list: req.body.Token
      })
    }
    
  })
})
//[依AC_EMAIL查詢帳號]
router.post('/CheckAccountEmail', function (req, res, next){
  console.log(req.body.U_data)
  lf.IsVerifyDate(req.body.Token_data.Token,async function(callback_Token){
    if(callback_Token == true){
      try{ 
      let SelectByUserEMAIL_result = await from_ACCOUNT.SelectByUserEMAIL(req.body.U_data)
      console.log(SelectByUserEMAIL_result)
      if(SelectByUserEMAIL_result.length==0)
      {
        res.send({
          Status:true,
          Data:"sucess",
          Msg:"sucess"
        })
      }
      else{
        res.send({
          Status:true,
          Data:"fail",
          Msg:"sucess"
        })
      }
    }
    catch(err){
      res.send({
        Status:false,
        Data:"",
        Msg:"fail"
      })
    }  
    }
    else{
      res.send({
        msg: "過期",
        list: req.body.Token
      })
    }
    
  })
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
      try{
          let Insert_result =  await ac.Insert(req.body.U_data)
          if(Insert_result.length!=0){
            
              let SelectNewaccountData_result = await ac.SelectNewaccountData() //撈最新註冊的AC_ID

              InfoStatusData ={
                  AI_ACID:SelectNewaccountData_result[0].AC_ID,
                  AI_Status : 'copper' //copper銅
              
                }
                // Insertaccinfo_result 插入初始權線
              let Insertaccinfo_result = await ac.InsertAccountInfoStatus(InfoStatusData)
              
                // 取得註冊會員資料
              let RegisterLogin_result = await  from_GetRegister.RegisterLogin(req.body.U_data)

              res.send({
                Status:true,
                Data:RegisterLogin_result,
                Msg:"sucess"
              })
          }
     
    
     }
     catch(err){
       console.log(err)
       res.send({
        Status:false,
        Data:'',
        Msg:"fail"
       })
     }
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

        from_GetForget.CheckToken(req.body.code).then(rs => {
          if (rs == true) {
            res.send({
              Status: true,
              Data: "",
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

        break;
      
 
      //[驗正修改密碼]    
      case "change":
        from_GetForget.CheckPassWord(req.body).then(rs => {
          if (rs == true) {
            res.send({
              Status: true,
              Data: "",
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
        console.log("大家好")
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
router.post('/DecryptionTest', function (error,req, res, next) {
  try{
    lf.Decryption(req.body.Token, function (callback) {
      res.status(201).send({
        mas: "sucess",
        list: callback
      })
    })
  }
  catch(err){
    res.send({
      mas: "fail",
    })
  }
  
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
