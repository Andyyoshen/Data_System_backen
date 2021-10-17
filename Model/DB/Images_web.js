var con = require('../../config/ConnectSouce')

module.exports.SelectDogByimg_number = async function(arry){
    var cmd = `SELECT image_authority.IA_AuthorityStatus,images_web.Img_number,images_web.Img_filename
    FROM images_web
    INNER JOIN image_authority
    ON image_authority.IA_ImgID = images_web.Img_ID
    WHERE images_web.Img_number = ? AND 
    image_authority.IA_AuthorityStatus = ?`
    //var cmd = `SELECT * FROM images_web WHERE Img_number =  ?  `
    let SelectDogByimg_number_result = await con.Example3(cmd,arry)
    return SelectDogByimg_number_result
}