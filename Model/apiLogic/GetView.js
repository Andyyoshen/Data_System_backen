var from_General_Web = require('../DB/General_web')
var from_Image_Web = require('../DB/Images_web')
module.exports.ViewPicture = async function(U_data,IsVerifyId_result){
    console.log(U_data)
    console.log(IsVerifyId_result)
    console.log("大家好")
     let tatle = {
        tatle_U_data: U_data.Img_number,
        tatle_U_data_IsVerifyId_result: IsVerifyId_result.AI_Status
     }
    try{
        data = Object.values(tatle) //將物件轉為陣列
        let SelectURL_result = await from_General_Web.SelectURL() //撈基礎網址
      //  var arry = ['Test01']  
        let SelectDogByimg_number_result = await from_Image_Web.SelectDogByimg_number(data) //撈圖片資訊
        console.log(SelectDogByimg_number_result)
        
        var Img_filenameArry =  SelectDogByimg_number_result.map(x=>{
             
           return SelectURL_result[0].G_Contents + x.Img_filename  // 將基礎網址與圖片資訊合併
        })
        return Img_filenameArry
    }
    catch(err){
        console.log(err)
        return "錯誤"
    }
    
    
}

