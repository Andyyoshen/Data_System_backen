var from_ImageCode = require('../General/ImageCode')
var from_LogicFun =  require('../LogicFun')
module.exports.ImageEncryOut = async function(){
    let Codetext = ''
    let ImageCode = {

        Imagedata : '',
        CodeEncry : ''
    }
    
   await from_ImageCode.getImageCode().then(rs=>{
        Codetext = rs.text  //取得驗證文字
        ImageCode.Imagedata = rs.data //取得驗證圖片
    })

    await from_LogicFun.Encryption(Codetext,function(callbackency){
        ImageCode.CodeEncry = callbackency //對圖形驗證文字加密
    })
    return ImageCode
    
}