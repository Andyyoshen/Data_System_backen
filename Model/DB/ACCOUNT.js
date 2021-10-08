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
//[依AC_ID Join account_info 查詢AI_Status表]
module.exports.SelectByAC_ID_Join = async function(arry){
    // var cmd =   `SELECT account_info.AI_Status
    //             FROM account_info
    //             INNER JOIN account
    //             ON account_info.AI_ACID = account.AC_ID`
    var cmd = `SELECT AI_Status FROM account_info WHERE AI_ACID = ?`
    let SelectByAC_ID_Join_result = await con.Example3(cmd,arry)
    return SelectByAC_ID_Join_result
}
//[依AC_ID和AC_PWD 查詢account表 ]
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
//[依AC_USERNAME查詢]
module.exports.SelectByUserNAME = async function(arry){
    var cmd = `SELECT AC_ID, AC_USER,AC_USERNAME,AC_EMAIL FROM account WHERE AC_USERNAME =?`
    let SelectByUserID_result =  con.Example3(cmd,arry)
    return SelectByUserID_result
}
//[依AC_EMAIL查詢]
module.exports.SelectByUserEMAIL = async function(arry){
    var cmd = `SELECT AC_ID, AC_USER,AC_USERNAME,AC_EMAIL FROM account WHERE AC_EMAIL =?`
    let SelectByUserID_result =  con.Example3(cmd,arry)
    return SelectByUserID_result
}
//[依AC_ID查詢]
module.exports.Select_Account_Some_Info_ByACID = async function(arry){
    var cmd =   `SELECT account.AC_USERNAME,account.AC_EMAIL,account_info.AI_Status 
                FROM account 
                INNER JOIN account_info 
                ON account.AC_ID = account_info.AI_ACID
                WHERE account.AC_ID = ?`

    //var cmd = `SELECT AC_USERNAME,AC_EMAIL FROM account WHERE AC_ID =?`
    let SelectByACID_result =  con.Example3(cmd,arry)
    return SelectByACID_result
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