var con = require('../../config/ConnectSouce')

module.exports.SelectByUser = function(arry,callback){
    var cmd = "SELECT * FROM account WHERE AC_USER = ?"
    con.Example2(cmd,arry,function(result){
        if(result.length == 0){
            callback(false)
        }
        else{
            callback(result)
        }
    })
}
//[依AC_USERID和AC_PWD 查詢account表 ]
module.exports.SelectByAC_IDAC_PWD = async function(arry){
    var cmd = `SELECT * FROM account WHERE AC_ID = ? && AC_PWD = ?`
    let dataList2 = await con.Example3(cmd,arry)
    return dataList2
    // con.Example(cmd,function(result){
    //     console.log(result)
    //     callback(result)
    // })
}
//[依AC_USER查詢]
module.exports.SelectByUserID = async function(arry){
    var cmd = `SELECT AC_ID, AC_USER,AC_USERNAME,AC_EMAIL FROM account WHERE AC_USER =?`
    let SelectByUserID_result =  con.Example3(cmd,arry)
    return SelectByUserID_result
}
//[依AC_USER,AC_Email查詢會員]
module.exports.SelectByForget = async function(arry){
    var cmd = "SELECT AC_ID,AC_USERNAME,AC_USER,AC_EMAIL FROM account WHERE AC_USER=? AND AC_EMAIL=? "
    let dataList = await con.Example3(cmd,arry)
    return dataList
    // con.Example3(cmd,arry,function(result){
    //     callback(result)
    // })
}

//[依AC_ID查詢帳號]

module.exports.SelectByACID = async function(arry){
    var cmd = "SELECT * FROM account WHERE AC_ID = ?"

    let  dataList = await con.Example3(cmd,arry)
    return dataList
}

//[依AC_ID更改密碼]
module.exports.UpdateChangePwd = async function(arry){
   var cmd = "UPDATE `account` SET `AC_PWD`=? WHERE `AC_ID`=?"

    let dataList = await con.Example3(cmd,arry)
    return dataList
}