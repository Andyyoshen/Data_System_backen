var crypto = require('crypto');
var AC = require('../Model/ACE')
var from_ACCOUNT = require('../Model/DB/ACCOUNT')
const { copyFileSync } = require('fs');

var key = "37725295ea78b626";
var iv = "efcf77768be478c2";
let sign = ""

//[加密]
module.exports.Encryption = function (encrypt, callback) {
    let sign = "";
    const cipher = crypto.createCipheriv("aes-128-cbc", key, iv); // createCipher在10.0.0已被废弃
    sign += cipher.update(encrypt, "utf8", "hex");
    sign += cipher.final("hex");
    callback(sign)
}
//[解密]
module.exports.Decryption = function (TodayToken, callback) {
    let src = "";
    const cipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
    src += cipher.update(TodayToken, "hex", "utf8");
    src += cipher.final("utf8");
    callback(src)

}

//[透過Token驗證API是否過期]
module.exports.IsVerifyDate = function (Token, callback) {
    this.Decryption(Token, function (result) {
        //------------------- 日期相減比較----------------------
        let TodayYear = new Date().getFullYear()
        let TodayMonth = new Date().getMonth() + 1
        let TodayDay = new Date().getDate()
        let TodayHour = new Date().getHours()
        let TodayMinutes = new Date().getMinutes()
        let Today_Total_Time = TodayYear + "/" + TodayMonth + "/" + TodayDay + " " + TodayHour + ":" + TodayMinutes
        let Today_Total_Time_Trance = new Date(Today_Total_Time)
        let Late_Time = new Date(result)
        let Final_Time = parseInt(Math.abs(Today_Total_Time_Trance - Late_Time) / 1000 / 60)
        //------------------- 日期相減比較----------------------
        if (Final_Time < 100) {
            callback(true)
        }
        else {
            callback(false)
        }
    })
}
//[透過TokenID來獲取AC_ID]
module.exports.GetACID = async function(id){
    let decry_string = ""
    let tt = ""
    if (id != undefined) {
        const Decryption_result = await AC.Decryption(id)
            decry_string = Decryption_result
            decry_string = decry_string.split('§')
            if (decry_string.length != 2) {
                return false
            }
            else {
               const SelectByACID_result = await from_ACCOUNT.Select_Account_Some_Info_ByACID(decry_string[0])
               if(SelectByACID_result.length!=0){
                   return SelectByACID_result
               }
               else{
                   return false
               }
            }
    }
    else {
        return false
    }
}
//[驗證TokenID是否正確] 
module.exports.IsVerifyId = async function (id) {
    let decry_string = ""
    let tt = ""
    if (id != undefined) {
        const Decryption_result = await AC.Decryption(id)
            decry_string = Decryption_result
            decry_string = decry_string.split('§')
            if (decry_string.length != 2) {
                return false
            }
            else {
               const SelectByAC_IDAC_PWD_result = await from_ACCOUNT.SelectByAC_IDAC_PWD(decry_string)
               //console.log(SelectByAC_ID_Join_result[4])
               if(SelectByAC_IDAC_PWD_result.length!=0){
                   const SelectByAC_ID_Join_result = await from_ACCOUNT.SelectByAC_ID_Join(decry_string[0])
                   
                   return SelectByAC_ID_Join_result[0]
               }
               else{
                   return false
               }
            }
    }
    else {
        return false
    }
}

//[取得今天日期時間]
module.exports.GetNowDate = function (callback) {
    let TodayYear = new Date().getFullYear()
    let TodayMonth = new Date().getMonth() + 1
    let TodayDay = new Date().getDate()
    let TodayHour = new Date().getHours()
    let TodayMinutes = new Date().getMinutes()
    let TodayDate_Time = TodayYear + "/" + TodayMonth + "/" + TodayDay + " " + TodayHour + ":" + TodayMinutes
    callback(TodayDate_Time)
}
//[取得今天日期]
module.exports.GetNowDay = function (callback) {
    let TodayYear = new Date().getFullYear()
    let TodayMonth = new Date().getMonth() + 1
    let TodayDay = new Date().getDate()
    let TodayDate_Day = TodayYear + "/" + TodayMonth + "/" + TodayDay
    callback(TodayDate_Day)
}

//[取得今天日期]
module.exports.GetNowDate2 = async function () {
    let TodayYear = new Date().getFullYear()
    let TodayMonth = new Date().getMonth() + 1
    let TodayDay = new Date().getDate()
    let TodayDate_Day = TodayYear + "/" + TodayMonth + "/" + TodayDay

    return TodayDate_Day
}

