var crypto = require('crypto');
var key = "37725295ea78b626";
var iv = "efcf77768be478c2";
//[解密]
module.exports.Decryption =  async function(TodayToken) {
    
   // return new Promise(function(resolve,resject){
        let src = "";
        const cipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
        src += cipher.update(TodayToken, "hex", "utf8");
        src += cipher.final("utf8");
        
        return src
        // resolve(src)
   // })

}