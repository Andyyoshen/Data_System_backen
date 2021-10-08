var from_ACCOUNT = require('../DB/ACCOUNT')
var from_LogicFun = require('../LogicFun')
var from_ACCOUNT_LOGIN = require('../DB/ACCOUNT_LOGIN')
module.exports.RegisterLogin = async function(obj){
    
    let pass = ""
    let Total_Encrtpt = ''

    let ALobj = {
        AL_ACID :'',
        AL_IP : '',
        AL_MDATE : '',
        AL_MSG : ''
    }
        let SelectByUserID_result = await from_ACCOUNT.SelectByUserID(obj.AC_USER)
        console.log(SelectByUserID_result)
        ALobj.AL_ACID = SelectByUserID_result[0].AC_ID
        ALobj.AL_IP = '123.15.66'
        from_LogicFun.GetNowDate(function(getTodayresult){
            ALobj.AL_MDATE = getTodayresult
        })

        if(SelectByUserID_result.length == 1){
            ALobj.AL_MSG = '註冊登入成功'

            Total_Encrtpt = SelectByUserID_result[0].AC_ID +"§" +obj.AC_PWD
            from_LogicFun.Encryption(Total_Encrtpt,function(Total_Encrtpt_result){
                Total_Encrtpt = Total_Encrtpt_result
               // callback(Total_Encrtpt_result)
            }) // 對Total_Encrtpt加密後傳回
            try{
                await from_ACCOUNT_LOGIN.Insert_ACCOUNT_LOGIN3(ALobj)
                return Total_Encrtpt
            }
            catch{
                return Total_Encrtpt
            }
            
            
        }
    
}