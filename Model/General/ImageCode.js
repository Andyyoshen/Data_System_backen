var svgCaptcha = require('svg-captcha')

module.exports.getImageCode = async function(){
    var cap = svgCaptcha.create({
        size: 4, // 验证码长度
        width:160,
        height:60,
        fontSize: 50,
        mathMin:1,
        mathMax:9,
        ignoreChars: '0oO1ilIabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#7B7B7B' // 验证码图片背景颜色
    })
    return cap
    
}