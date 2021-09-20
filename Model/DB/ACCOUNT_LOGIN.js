var con = require('../../config/ConnectSouce')

var OB = {
    AL_ACID :'',
    AL_IP : '123',
    AL_MDATE : '',
    AL_MSG : ''
}


//[插入登入會員紀錄]
module.exports.Insert_ACCOUNT_LOGIN = function(AL_ACID,AL_IP,AL_MDATE,AL_MSG,callback){
    var cmd = `INSERT INTO ACCOUNT_LOGIN (AL_ACID, AL_IP,AL_MDATE,AL_MSG)
     VALUES ('${AL_ACID}', '${AL_IP}','${AL_MDATE}','${AL_MSG}')`
     con.Example(cmd,function(result){
         callback(result)
     })
}

module.exports.Insert_ACCOUNT_LOGIN2 = function(obj,callback){
    var cmd = "INSERT INTO ACCOUNT_LOGIN SET ? "
     con.Example2(cmd,obj,function(result){
         callback(result)
     })
}