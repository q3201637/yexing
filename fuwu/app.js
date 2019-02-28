var express = require('express'); //引入express模块
var app = express();
var fs=require('fs')

var bodyParser = require('body-parser');
server = require('http').createServer(app);




//设置链接头
app.use(function(req, res, next){
    
    //设置跨域访问
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /*让options请求快速返回*/
    }else {
        next();
    }
});

//缺少下俩个req。body无法使用
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//图片
app.use('/tupian/uploads', function(req, res){  
  //  console.log(req.query.name);  
 //   console.log(req.query.email);
    var pp=req.url.split("/")
    var name0=pp[1].toString();
    var name1=pp[2].toString();
    var name2=pp[3]
   fs.readFile('c:/uploads/'+name0+'/'+name1+'/'+name2,'binary',function(err, file) {
    if (err) {
      console.log(err);
      return;
    }else{
        res.writeHead(200, {'Content-Type': 'image/jpg'});
        res.write(file,'binary');
        res.end();
        return;    
    }
});
     
});

app.use('/denglu',require('./router/denglu'));
app.use('/register',require('./router/register'));
app.use('/chat',require('./router/chat'));
app.use('/zhuye',require('./router/zhuye'));
app.use('/wenzhang',require('./router/wenzhang'));
app.use('/gerendetail',require('./router/gerendetail'));










server.listen(3030);
console.log('后台连接上')