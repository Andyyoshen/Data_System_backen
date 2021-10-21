var from_ACCOUNT = require('../DB/ACCOUNT')
var from_LogicFun = require('../LogicFun')
var from_MailFun = require('../General/MailFun')
const e = require('express')
//[確認忘記帳號後寄信]
module.exports.CheckForget = async function(obj){
    //if(AC_EMAIL == ??) 符合信箱格式
    let arry_AC = Object.values(obj) // 物件轉陣列
    var table = ''
    let emailmsg = ''
    //arry_AC.push(AC_USER,AC_EMAIL)
   let SelectByForget_result = await from_ACCOUNT.SelectByForget(arry_AC)
    if(SelectByForget_result.length>0){
        // 寄件函式
    let SendEmail_result =  await  this.SendEmail(SelectByForget_result)
        return SendEmail_result
    } 
    return false
    
}
//[寄出忘記帳號郵件]
module.exports.SendEmail = async function(SelectByForget_result){

    let today = ''
    let token = ''
    let msg = ''
    from_LogicFun.GetNowDay(function(today_result){
        today = today_result
    })
    let id = SelectByForget_result[0].AC_ID+"§"+today //未加密Tokn
    let name = SelectByForget_result[0].AC_USERNAME
    let email = SelectByForget_result[0].AC_EMAIL
    from_LogicFun.Encryption(id,function(ency_result){
        token = ency_result
    })
    let strbody =  '<p>親愛的' + name + '先生/小姐 你好</p>'+
                   '<p>要重設帳戶密碼，請使用以下連結並按步驟操作。</p>'+
                   '<a href="http://localhost:8080/#/ForgetPassword">重設密碼</a>'+
                   '<p>注意!! 修改密碼需再'+  today +"日內完成"+'</p>'+
                   '<p>郵件驗證碼' + token+'</p>' 
   // let strbody = '<a href="#">abc</a>'
    await from_MailFun.SendMailModel(strbody,email).then(result=>{
        if(result){
            msg = true
        } 
        else{
            msg = false
        }
    }).catch(err=>{
        console.log("錯誤"+err)
    })
     return msg
}
