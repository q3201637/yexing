var express=require('express')
var router=express.Router();
var mysql = require('mysql');
var url=require('url');
var fs = require("fs");
var async = require("async");
var uuid = require('node-uuid');
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
router.post('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  //  res.send(pp);
    var resdata,id;
    var datas=req.body    
    var dataUrl=datas.dataUrl
    var id1=uuid.v1();
    var userid=datas.userid;
    var biaoti=datas.biaoti;
    var content=datas.content;   
    var date =datas.date
    var baseUrl="c:/uploads/"+userid+"/wenzhang";
    var base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64, 'base64'); 
    wenjianjia(baseUrl).then(function(data){
        fs.writeFile(baseUrl+"/"+id1+".jpg",dataBuffer,function(err){
            if(err){
              }else{
                console.log('success')
              }
            })
    }).then(function(){
    	var addSql = 'INSERT INTO wenzhang(userid, biaoti,content,photo,date) VALUES(?,?,?,?,?)';
        var addSqlParams = [userid, biaoti,content,id1,date];
        connection.query(addSql,addSqlParams,function (err, result) {
          if(err){
            console.log('[INSERT ERROR] - ',err.message);
            reject("error")
            return;
          };
          if(result){
    	    resdata={id:result.insertId,biaoti:biaoti,content:content,photo:id1,state:"success"}
            res.send(resdata);
          }
        })  
    }).catch(function(reason){
        console.log("error");
        resdata={state:"error"};
        res.send(resdata)
    })

 })

router.post('/update', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  //  res.send(pp);
    var resdata;
    var datas=req.body    
    var dataUrl=datas.dataUrl
    var id1=uuid.v1();
    var id =datas.id
    var userid=datas.userid;
    var biaoti=datas.biaoti;
    var content=datas.content;   
    var date =datas.date
    var baseUrl="c:/uploads/"+userid+"/wenzhang";
    var base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64, 'base64'); 
    wenjianjia(baseUrl).then(function(data){
        fs.writeFile(baseUrl+"/"+id1+".jpg",dataBuffer,function(err){
            if(err){
              }else{
                console.log('success')
              }
            })
    }).then(function(){
        var sql = 'update wenzhang set biaoti = ?, content=?,photo=? where id =? ';
        var params=[biaoti,content,id1,id]
        connection.query(sql,params,function (err, result) {
          if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
          };
          if(result){
            resdata={id:id,biaoti:biaoti,content:content,photo:id1,state:"success"}
            res.send(resdata);
          }
        })  
    }).catch(function(reason){
        console.log("error");
        resdata={state:"error"};
        res.send(resdata)
    })

 })

module.exports=router;  