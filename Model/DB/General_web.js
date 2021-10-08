var con = require('../../config/ConnectSouce')
module.exports.SelectURL = async function(){
    var cmd =  `SELECT * FROM  general_web WHERE G_Number = 'url'`
    let SelectURL_result = await con.Example3(cmd,null)
    return SelectURL_result
}