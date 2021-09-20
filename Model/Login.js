var DB_ac = require('../Model/DB/ACCOUNT')
var con = require('../config/ConnectSouce')
var ac = require('../Model/Account')
var lf = require('../Model/LogicFun')
var from_ACCOUNT_LOGIN = require('../Model/DB/ACCOUNT_LOGIN')
module.exports.CheckPass = function(obj,callback){
    let pass = ""
    let Total_Encrtpt = ''

    let ALobj = {
        AL_ACID :'',
        AL_IP : '',
        AL_MDATE : '',
        AL_MSG : ''
    }
//    let ACarry = []
//    ACarry.push(AC_USER)
   
    DB_ac.SelectByUser(obj.AC_USER,function(result){
        
        if(result.length != undefined ){
            lf.Encryption(obj.AC_PWD,function(EncrypResult){
                pass = EncrypResult //對輸入的AC_PWD加密
             })

             ALobj.AL_ACID = result[0].AC_ID
             ALobj.AL_IP = '123.15.66'
             lf.GetNowDate(function(getTodayresult){
                ALobj.AL_MDATE = getTodayresult
            })

            if(result[0].AC_PWD == pass){
                ALobj.AL_MSG = '登入成功'
                Total_Encrtpt = result[0].AC_ID +"§" +pass

                lf.Encryption(Total_Encrtpt,function(Total_Encrtpt_result){
                    Total_Encrtpt = Total_Encrtpt_result
                   // callback(Total_Encrtpt_result)
                }) // 對Total_Encrtpt加密後傳回
            }
            else{
                ALobj.AL_MSG = '密碼錯誤'
            }
             from_ACCOUNT_LOGIN.Insert_ACCOUNT_LOGIN2(ALobj,
                 function(result){}) //新增登入紀錄
             callback(Total_Encrtpt)
        }
        else{
           // console.log("查無此帳號")
            callback(Total_Encrtpt)
        }
        
    })
    // var cmd = "SELECT * FROM account"
    // con.Example(cmd,function(result){
    //     callback(result)
    // })
}
//[驗證圖型驗證碼]
module.exports.CheckImageCodePass = async function(imagepasscode,sessioncode){
    let DeImageStr = ''
    lf.Decryption(sessioncode,function(coderesult){
        DeImageStr = coderesult

    })
        if(imagepasscode == DeImageStr){
            return true
        }
        return false

    
}