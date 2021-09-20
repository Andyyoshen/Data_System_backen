var con = require('../config/ConnectSouce')
var LF = require('../Model/LogicFun')
//[選擇會員測試用]
module.exports.Select = async  function(){
    
    // let obj = {
    //     AC_USER : '5555',
    // }
    // let arr  = ['5555','4']
    var cmd = "SELECT * FROM  account WHERE AC_USER = '5555' "
    //-----------------------Promise的Es6寫法--------------------
    // return new Promise(function(resolve,reject){
    //     con.Example(cmd).then(result=>{
    //         if(result.length!=0){
    //             resolve(result)
    //         }
    //         else{
    //             reject(err)
    //         }
    //     })
    // })
    //------------------------------------------------

    let dataList = await con.Example(cmd)
   //console.log(dataList)
    return dataList

}
//[插入會員]
module.exports.Insert = async function(Register_obj_data){
    LF.Encryption(Register_obj_data.AC_PWD,function(encrypt_Result){
        Register_obj_data.AC_PWD = encrypt_Result
     })
    var cmd = ` INSERT INTO account SET ? `
    let  Insert_result = con.Example3(cmd,Register_obj_data) //陣列有多東西
    return Insert_result

    //-------------------------------------------------------------------------------------------------
    // let account = {AC_PASS : "5566" , AC_USER : "11111"}  //要多下參數麻煩 插入的方法一
    // var cmd = ` INSERT INTO account SET ? `; //要多下參數麻煩 插入的方法一
    //var cmd = "INSERT INTO account (AC_PASS, AC_USER) VALUES ('088', '707')";
    //var cmd = "INSERT INTO account (AC_PASS, AC_USER) VALUES " + "(" + PASS + "," + USER + ")" // 插入的方法二
    //var cmd = `INSERT INTO account (AC_PWD, AC_USER,AC_USERNAME,AC_EMAIL) VALUES ('${AC_PWD}', '${AC_USER}','${AC_USERNAME}','${AC_EMAIL}')`; //插入的方法三

}