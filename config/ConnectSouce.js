// var db = require('../config/db.js')
// var mysql = require('mysql')
// exports.index = function(req, res){
//     var connection = mysql.createConnection(db);
//     var query ='SELECT * FROM account';
//    connection.query(query, function(err, rows, fields){
//        if(err) {
//            throw(err)
//            console.log(err)
//        }
//        console.log(rows)
//       // res.render('index', { title: '這是 mysql + node.js 示範版本', 'items': rows });   
//    });
// }
var db = {};
var mysql = require('mysql');
var address = require('../config/db')

//建立連線
var connection = mysql.createConnection(address);
//查詢
module.exports.Example =  function (sql) { 
    try{
        return new Promise(function(resolve,reject){
            connection.query(sql, function (err, rows, fields) {
                if (err) {
                    //console.log("錯誤");
                    console.log(err)
                    reject(err)
                    
                    //callback(err, null);
                }
                else{
                    resolve(rows)
                }
    
            });
         })
    }
    catch(err){
       
        return "你好"
    }
     
    // connection.query(sql, function (err, rows, fields) {
    //     if (err) {
    //         console.log("錯誤"+err);
    //         callback(err, null);
    //         return;
    //     };
    //    // console.log(rows)
    //     callback(rows);
    // });
}

module.exports.Example2 =  function (sql,post, callback) { 
    connection.query(sql,post, function (err, rows, fields) {
        if (err) {
            console.log("錯誤"+err);
            callback(err, null);
            return;
        };
       // console.log(rows)
        callback(rows);
    });
}


module.exports.Example3 =  function (sql,post, callback) { 

    return new Promise(function(resolve,reject){
        connection.query(sql,post,function(err,rows,fields){
            if(err){
                reject(err)
            }
            else{
                resolve(rows)
            }
        })
    })
}