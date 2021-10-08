var con = require('../../config/ConnectSouce')
module.exports.SelectImage_Aut = async function(arry){
    var cmd = `SELECT image_authority.IA_AuthorityStatus,images_web.Img_number
    FROM images_web
    INNER JOIN image_authority
    ON image_authority.IA_ImgID = images_web.Img_ID
    WHERE images_web.Img_number = ? `
    let SelectImage_Aut_result = await con.Example3(cmd,arry)
    
    return SelectImage_Aut_result
}