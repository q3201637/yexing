var express=require('express')
var router=express.Router();
var mysql = require('mysql');
var url=require('url')

var connection = mysql.createConnection({
host : 'rm-bp1ec70r7fc75f58q.mysql.rds.aliyuncs.com',
user : 'root',
password : 'Qq2045377',
database : 'test1'
});
connection.connect();


router.post('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  //  res.send(pp);
    var phone=req.body.phone;
    var phone1="18326054680"
/*    console.log(phone)
    console.log(phone1)
    if(phone==phone1){
    	console.log("1")
    }else{
    	console.log('2')
    }*/
    var password=req.body.password;
    var pp=""   
    var sql = "SELECT * FROM user where phone='"+phone+"' and password='"+password+"'";
    connection.query(sql,function (err, result) {
    	console.log(JSON.stringify(result))
    if(err){
     console.log('[SELECT ERROR] - ',err.message);
     pp={state:"err"}
      res.send("err"); 
     return;
    }
     if(result.length==0){
     	pp={state:"default"}
     	res.send(pp);
     }else{
         pp={state:"success",data:result}
        res.send(pp);
     }
});

});

module.exports=router;  