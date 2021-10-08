var con = require('../../config/ConnectSouce')

module.exports.SelectDogByimg_number = async function(arry){
    var cmd = `SELECT * FROM images_web WHERE Img_number =  ?  `
    let SelectDogByimg_number_result = await con.Example3(cmd,arry)
    return SelectDogByimg_number_result
}