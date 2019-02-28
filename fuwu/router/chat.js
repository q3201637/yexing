var express=require('express')
var router=express.Router();
var mysql = require('mysql');
var url=require('url');
var connection = mysql.createConnection({
host : 'rm-bp1ec70r7fc75f58q.mysql.rds.aliyuncs.com',
user : 'root',
password : 'Qq2045377',
database : 'test1'
});
connection.connect();


router.post('/readupdate', function(req, res, next) {
   var send=req.body.send;
   var receive =req.body.receive;
    var modSql = 'UPDATE chat SET isread = ?,isreceived=?  WHERE send = ? AND receive = ?';
      var addSqlParams = [1, 1,send,receive];
        connection.query(modSql,addSqlParams,function (err, result) {
          if(err){
            console.log('[INSERT ERROR] - ',err.message);
          };
          if(result){
          	console.log(result)
          	res.send('success')
          }
        })  
})


module.exports=router;