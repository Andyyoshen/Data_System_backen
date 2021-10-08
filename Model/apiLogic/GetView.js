var from_General_Web = require('../DB/General_web')
var from_Image_Web = require('../DB/Images_web')
module.exports.ViewPicture = async function(data){
    try{
        data = Object.values(data) //將物件轉為陣列
        let SelectURL_result = await from_General_Web.SelectURL()
      //  var arry = ['Test01']  
        let SelectDogByimg_number_result = await from_Image_Web.SelectDogByimg_number(data)
        let str_resutl =SelectURL_result[0].G_Contents+SelectDogByimg_number_result[0].Img_filename
        return str_resutl
    }
    catch(err){
        console.log(err)
        return "錯誤"
    }
    
    
}

