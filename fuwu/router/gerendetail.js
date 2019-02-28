var express=require('express')
var router=express.Router();
var mysql = require('mysql');
var url=require('url');
var fs = require("fs");
var async = require("async");
var uuid = require('node-uuid');
//解析formdata 要用 multipart
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var connection = mysql.createConnection({
host : 'rm-bp1ec70r7fc75f58q.mysql.rds.aliyuncs.com',
user : 'root',
password : 'Qq2045377',
database : 'test1'
});
connection.connect();

function wenjianjia(baseUrl){
    var p=new Promise(function(resolve,reject){
        if(!fs.existsSync(baseUrl)){
          fs.mkdirSync(baseUrl,function(err,data){
                if(err){
                  reject('error');
                  return
                }
                resolve('success')
          })
        }else{
          resolve('success')
        }
    })
    return p
}

router.post('/update',  function(req, res, next) {
  // res.render('index', { title: 'Express' });
  //  res.send(pp);
    var resdata,id;
    var datas=req.body
    var dataUrl=datas.src
    var id1=uuid.v1();
    var userid=datas.userid; 
    var name =datas.name 
    var baseUrl="c:/uploads/"+userid+"/touxiang";
    var resdata;
    var base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64, 'base64'); 
    function photocreate(){
        var p =new Promise(function(resolve,reject){
            fs.writeFile(baseUrl+"/"+id1+".jpg",dataBuffer,function(err){
            if(err){
            reject('失败IL·')
              }else{
                resolve('success')
              }
            })
        })
        return p
    }
    if(dataUrl==""){
    console.log('ppp')
      var modSql = 'UPDATE user SET name=?  WHERE userId = ?';
      var addSqlParams = [name,userid];
      connection.query(modSql,addSqlParams,function (err, result) {
          if(err){
            console.log('[INSERT ERROR] - ',err.message);
            res.send('error')
          };
          if(result){            
            res.send({name:name,photo:""});
            return
          }
        }) 
    }else{
      wenjianjia(baseUrl).then(function(){
        return photocreate()
      }).then(function(){
      console.log(name)
      var modSql = 'UPDATE user SET picture = ?,name=?  WHERE userId = ?';
      var addSqlParams = [id1, name,userid];
        connection.query(modSql,addSqlParams,function (err, result) {
          if(err){
            console.log('[INSERT ERROR] - ',err.message);
            reject("error")
            return;
          };
          if(result){
            
            res.send({name:name,photo:id1});
          }
        })  
      }).then(function(){

      })
    }
    

 })

router.post('/imgnameget',  function(req, res, next) {
  var userid=req.body.userid
  var sql = 'SELECT * FROM user WHERE userId = ?'
   connection.query(sql,[userid],function (err, result) {
          if(err){
            console.log(result);
          };
          if(result){
            res.send(result);
          }
        })  
})

router.post('/faxian',  function(req, res, next) {
  var sql = 'SELECT * FROM faxian order by id desc'
   connection.query(sql,[],function (err, result) {
          if(err){
            console.log(result);
            res.send("error")
          };
          if(result){
            res.send(result);
          }
        })  
})

module.exports=router;  