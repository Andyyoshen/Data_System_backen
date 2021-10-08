var from_Images_authority = require('../DB/Images_authority')

module.exports.Authority_Judgment = async function(U_data,IsVerifyId_result){
    // U_data使用者帶過來得圖片參數
    U_data =Object.values(U_data) 
    //SelectImage_Aut_result 是撈圖片的權限
    var SelectImage_Aut_result = await from_Images_authority.SelectImage_Aut(U_data)
    //下面是判斷使用者的權限是否符何圖片可觀看權限
    return SelectImage_Aut_result.some(x=>{ //javescript some() 符合回傳true
        return  IsVerifyId_result.AI_Status == x.IA_AuthorityStatus      
        })
}