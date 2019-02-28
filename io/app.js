var express = require('express'); //引入express模块
var app = express();
var fs=require('fs')
var mysql = require('mysql');
var bodyParser = require('body-parser');
server = require('http').createServer(app);
var io = require('socket.io')(server);
var connection = mysql.createConnection({
host : 'rm-bp1ec70r7fc75f58q.mysql.rds.aliyuncs.com',
user : 'root',
password : 'Qq2045377',
database : 'test1'
});
connection.connect();

var onlineUsers = {};
//当前在线人数
var onlineCount = 0;

io.on('connection', function(socket){
  //用户登录
    socket.on('login',async function(obj){ //可能disconnect没触发，将前设备登陆信息清除
      /*for(var i in onlineUsers){
        if(i==obj.userid){
        await  delete onlineUsers.userid
        }
       }*/
      console.log('dsds')
    	socket.name=obj.userid;
      var len =onlineUsers.length
    	 /*if(!onlineUsers.hasOwnProperty(obj.userid)) {
    	 	onlineUsers[obj.userid] = socket;
           // onlineUsers[obj.userid] = obj.username;
            //在线人数+1
            onlineCount++;
            console.log("id:"+obj.userid+"的用户"+obj.name+"登录了")
           // onlineUsers[obj.userid].emit("msg","aa")
        }*/
        onlineUsers[obj.userid] = socket; //将登陆信息存入onlineusers
        for(var i in onlineUsers){
        if(i==obj.userid){
        await  delete onlineUsers.userid
        }
       }
        if((!onlineUsers.hasOwnProperty(obj.userid))){
          onlineCount++
        }
        loginbackmsg(obj.userid).then(function(result){  //登陆后将没账号没收到（isread=0）的再发一遍
          socket.emit("iochatreceive1",result)
        })
    });
    //收到用户消息
    socket.on("chatnews",function(obj){
      /*for(var i in onlineUsers ){
        console.log(socket)
        console.log(onlineUsers[i]==socket)
      }*/
      //先存入数据库
        insertchat(obj).then(function(result){
          for(var i in onlineUsers){
              console.log(i)
            }
          //如果好友在线就发出
          if(onlineUsers.hasOwnProperty(obj.receive)) {
           // console.log(obj.receive+'在线，开始转发')
            onlineUsers[obj.receive].emit("iochatreceive",obj)
          }
          //发送者后台io已经收到了        
          socket.emit('iochatreceive2',obj)
        })     
    });
    //用户主动或者被动失去连接后将其在onlineUsers中移除
    socket.on("disconnect",function(obj){
       for(var i in onlineUsers){
        if(i==obj.userid){
          delete onlineUsers.userid
        }
       }   
    });
    socket.on("disconnect1",function(obj){
       for(var i in onlineUsers){
        if(i==obj.userid){
          delete onlineUsers.userid
        }
       }
    });
})

function insertchat(obj){
    var time=new Date().getTime()
    var p=new Promise(function(resolve,reject){
      var addSql = 'INSERT INTO chat(id,send, receive,text,type,isread,isreceived,time) VALUES(?,?,?,?,?,?,?,?)';
      var addSqlParams = [obj.id,obj.send, obj.receive,obj.text,obj.type,obj.isread,obj.isreceived,time];
      connection.query(addSql,addSqlParams,function (err, result){
            console.log("插入成功");
            resolve(result)
        },
        function (tx, error) {
            console.log('插入失败: ' + error.message);
            reject('error')
        });
    })
    return p
}

function loginbackmsg(userid){
  var pp=new Promise(function(resolve,reject){
    var sql = 'SELECT * FROM chat where receive = ? AND isread = 0';
    connection.query(sql,[userid],function (err, result){
            console.log("查询成功")
            console.log(result);
            resolve(result)
        },
        function (tx, error) {
            console.log('查询失败: ' + error.message);
            reject('error')
        });
  })
  return pp  
}

server.listen(3031);
console.log('后台连接上')