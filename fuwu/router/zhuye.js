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


router.post('/haoyou1', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  //  res.send(pp);
    var datas=req.body;    
    if(datas.type=="tansuo"){
      var sql = 'select u.id,u.userid,u.biaoti,u.content,u.photo,u.date,a.picture,a.name from wenzhang as u  left join user a on u.userid = a.userid GROUP BY u.id,u.userid,u.biaoti,u.content,u.photo,u.date,a.picture,a.name ORDER BY RAND() LIMIT 9';
    }else if(datas.type=="guanzhu"){
      var userid=datas.userid
      var sql = 'select b.id,b.biaoti,b.content,b.photo,b.date,u.name,u.picture,u.userid from guanzhu as a  left join wenzhang b on a.other = b.userid left join user u on u.userid=a.other where a.me = '+userid+' order by b.date desc  limit 7';
    }else if(datas.type=="guanzhumore"){
      var userid=datas.userid;
      var date=datas.date;
      var sql = 'select b.id,b.biaoti,b.content,b.photo,b.date,u.name,u.picture,u.userid from guanzhu as a  left join wenzhang b on a.other = b.userid left join user u on u.userid=a.other where a.me = '+userid+' and b.date < "'+date+'" order by b.date desc  limit 10';
    }else{
      var sql = 'select u.id,u.userid,u.biaoti,u.content,u.photo,u.date,a.picture,a.name from wenzhang as u  left join user a on u.userid = a.userid GROUP BY u.id,u.userid,u.biaoti,u.content,u.photo,u.date,a.picture,a.name  limit 0,7 ';
    }
    connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    };
      res.send(result)
    })
    
 })

router.post('/mine',function(req,res,next){
  var userid=req.body.userid;
  var date =req.body.date;
  var ziji=req.body.ziji;
  if(ziji==userid){
    var sql = 'select u.id,u.userid,u.biaoti,u.content,u.photo,u.date,a.picture,a.name from wenzhang as u  left join user a on u.userid = a.userid where u.userid = '+userid+' and u.date < "'+date+'" order by u.date desc  limit 10';
    connection.query(sql,function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      };
        res.send({data:result,len:1})
    })
  }else{
    var pp =function(){
      var p=new Promise(function(reslove,reject){
        var sql ='select * from guanzhu as a where a.me = '+ziji+' and a.other = '+userid+' '
        connection.query(sql,function (err, result) {
          if(err){
            console.log('[SELECT ERROR] - ',err.message);
            reject('error');
          };     
            reslove(result.length)
          })
      })
      return p
    }
    pp().then(function(len){
      var sql;
      if(len==0){
        var sql = 'select u.id,u.userid,u.biaoti,u.content,u.photo,u.date,a.picture,a.name from wenzhang as u  left join user a on u.userid = a.userid where u.userid = '+userid+' and u.date < "'+date+'" order by u.date desc  limit 3';
      }else{
        var sql = 'select u.id,u.userid,u.biaoti,u.content,u.photo,u.date,a.picture,a.name from wenzhang as u  left join user a on u.userid = a.userid where u.userid = '+userid+' and u.date < "'+date+'" order by u.date desc  limit 3';
      }
      connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          reject('error');
          };
          res.send({data:result,len:len})
      })
    })
  }
 
})

router.post('/mine1',function(req,res,next){
  var userid=req.body.userid;
  var date =req.body.date;
  var sql = 'select u.id,u.userid,u.biaoti,u.content,u.photo,u.date,a.picture,a.name from wenzhang as u  left join user a on u.userid = a.userid where u.userid = '+userid+'  order by u.date desc  limit 3';
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    };
      res.send(result)
    })
})

router.post('/xuyan/select',function(req,res,next){
  var userid=req.body.userid;
  var sql ='select * from xuyan where userid ='+userid+''
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    };
      res.send(result)
    })
});

router.post('/xuyan/insert',function(req,res,next){
  var userid=req.body.userid;
  var biaoti=req.body.biaoti;
  var text=req.body.text;
  var sql ='insert into xuyan (userid,biaoti,text) values (?,?,?) on duplicate key update biaoti=?,text=?'
  var params=[userid,biaoti,text,biaoti,text];
  connection.query(sql,params,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    };
      res.send(result)
    })
})

router.post('/guanzhu/insert',function(req,res,next){
  var me=parseInt(req.body.from);
  var other=parseInt(req.body.to);
  var sql ='insert into guanzhu (me,other) values (?,?) '
  var params=[me,other];
  connection.query(sql,params,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    };
      res.send(result)
    })
});

router.post('/guanzhu/delete',function(req,res,next){
  var me=parseInt(req.body.from);
  var other=parseInt(req.body.to);
  var sql ='delete from guanzhu where me = '+me+' and other = '+other+' '
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    };
      res.send(result)
    })
});

router.post('/shoucang/one',function(req,res,next){
  var userid=req.body.userid;
  var kapian=req.body.kapian
  var sql ='select * from shoucang where userid ='+userid+' and kapian = '+kapian+'  '
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    };
      res.send(result)
    })
});

router.post('/shoucang/delete',function(req,res,next){
  var userid=req.body.userid;
  var kapian=req.body.kapian
  var sql ='delete from shoucang where userid ='+userid+' and kapian = '+kapian+'  '
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    };
      res.send(result)
    })
});

router.post('/shoucang/insert',function(req,res,next){
  var userid=req.body.userid;
  var kapian=req.body.kapian;
  console.log(kapian)
  var sql ='insert into shoucang (userid,kapian) values (?,?)'
  var params=[userid,kapian]
  connection.query(sql,params,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    };
      res.send(result)
    })
});

router.post('/nangua/kapianupdate',function(req,res,next){
  var userid=req.body.userid;
  var kapian =req.body.kapian;
  var pp =function(){
    var p=new Promise(function(reslove,reject){
      var sql ='select nangua from user where userid = '+userid+' '  
      connection.query(sql,function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        reject('err');
      };
        reslove(result[0].nangua)
      })
    })
    return p
  }
  pp().then(function(nangua){
    console.log(nangua+" "+kapian)
    if(nangua!="" && nangua>=kapian){
      nangua=nangua-kapian
      var sql ='update user set nangua = '+nangua+' where userid = '+userid+' '  
      connection.query(sql,function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        reject('err');
      };
        res.send('ok')
      })
    }else{
      res.send('no')
    }
  })
  
});

module.exports=router;  