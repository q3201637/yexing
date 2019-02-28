var express=require('express')
var router=express.Router();
var mysql = require('mysql');
var url=require('url')
var fs = require("fs");
var connection = mysql.createConnection({
host : 'rm-bp1ec70r7fc75f58q.mysql.rds.aliyuncs.com',
user : 'root',
password : 'Qq2045377',
database : 'test1'
});
connection.connect();

router.post('/', function(req, res, next) {
	var phone=req.body.phone;
	var password=req.body.password;
	var name='无';
	var id;
	var createtime=new Date();
	var resdata;
	var sql1 ='select * from user where phone = '+phone+' ';
	var params1=[];
	var sql2='insert into user (phone,password,name,creattime) values (?,?,?,?)'
	var params2=[phone,password,name,createtime];	

    function pp(sql,params){
      return new Promise(function(resolve,reject){
      	connection.query(sql,params,function (err, result) {
            if(err){
              console.log('[INSERT ERROR] - ',err.message);
              reject("error")
            };
            if(result){
          	  resolve(result)    	     
            }
          })
      })
    };

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

    pp(sql1,params1).then(function(data){ //查询有无电话号码
    	if(data.length!=0){
    		throw ("phone")
    	}else{
    		return pp(sql2,params2)  //插入数据
    	} 
    }).then(function(data){   //创建id文件夹
    	id=data.insertId
        	/*fs.mkdirSync("c:/uploads/"+id,function(err,data){
                if(err){                	
                  throw ('error');
                }
                fs.mkdirSync("c:/uploads/"+id+'touxiang',function(err,data){
                  if(err){                	
                    throw ('error');
                  }	
                  fs.mkdirSync("c:/uploads/"+id+'wenzhang',function(err,data){
                    if(err){                	
                    throw ('error');
                    }	
                    return('success')
                  })
                })	
            })*/
            fs.mkdirSync("c:/uploads/"+id);
             fs.mkdirSync("c:/uploads/"+id+'/touxiang');
              fs.mkdirSync("c:/uploads/"+id+'/wenzhang');
    }).then(function(){
    	res.send({type:'success',id:id,name:name,phone:phone,password:password,createtime:createtime});
    }).catch(function(err){
    	console.log(err)
    	  if(err=='phone'){
            res.send({type:'phone'})
    	  }else{
            res.send({type:'error'})
    	  }
    })



})

module.exports=router;  