const { text } = require('express');
var nodemailer = require('nodemailer')
//[寄信模組]
module.exports.SendMailModel = async function(strbody,email){
    var transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'chsummerpower@gmail.com',
            pass:'Wwee1230'
        }
    });
    var options = {
        from:'chsummerpower@gmail.com',
        
        to:email, // 資料庫裡的eamil
        
        subject:'測式',

        text:"你們好",

        html: strbody 
    }
    return new Promise(function(resolve,reject){
        transporter.sendMail(options,function(err,info){
            if(err){
                reject(err)
            }
            else{
                resolve(true)
            }
        })
    })
   
}