var from_LogicFun = require('../LogicFun')
var from_ACCOUNT = require('../DB/ACCOUNT')
//[依信箱驗證token]
module.exports.CheckToken = async function(id){
    let passToken = ''
    let todaytime = ''
    let table_ac = ''

    //解密
    try{
    from_LogicFun.Decryption(id,function(result){
        passToken = result
    })
    }
    catch(err){
        return false
    }
    let tokenpass_arr = passToken.split('§')
    if(tokenpass_arr.length == 2){
        let acid = tokenpass_arr[0]
        let tokentime = tokenpass_arr[1]

        //取得今天日期
        await  from_LogicFun.GetNowDate2().then(res=>{ 
            todaytime = res
        })


        if(tokentime == todaytime){
            
            //用AC_ID取得帳號資料
          await  from_ACCOUNT.SelectByACID(acid).then(res=>{
              table_ac = res
          })
        //   console.log(table_ac)
        //   return false
            if(table_ac.length == 1){
                return true
            }
                return false
        }
        return false
    }
    return false
    
    //console.log(passToken)
}


//[驗證更改忘記密碼]
module.exports.CheckPassWord = async function(obj){
    let passToken = ''
    let todaytime =''
    let table_arry = []
    let escpwd = ''
    let table_res = ''
    from_LogicFun.Decryption(obj.newpasswordtoken,function(result){
        passToken = result
    })
    let tokenpass_arr = passToken.split('§')
    if(tokenpass_arr.length == 2){
        let acid = tokenpass_arr[0]
        let tokentime = tokenpass_arr[1]

        await from_LogicFun.GetNowDate2()
        .then(res=>{
            todaytime = res
        })
        if(tokentime == todaytime){
            from_LogicFun.Encryption(obj.newpwd,function(pwdresult){
                escpwd = pwdresult
            })
            table_arry.push(escpwd)
            table_arry.push(acid)
            // 用AC_ID更改密碼
         await from_ACCOUNT.UpdateChangePwd(table_arry)
         .then(rs=>{
            table_res = table_arry
         })
            if(table_res.length ==2){
                return true
            }
            return false
        }

        return false
    }

    return false

}
module.exports.CheckAll = async function(obj){
    let passbool = ''
    if(obj.pwd != obj.checkpwd){
        return false
    }
    this.CheckPassWord(obj)
    .then(rs=>{
        passbool = rs
    })
}