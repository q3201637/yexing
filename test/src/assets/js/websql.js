export  default {
  install(Vue){
    var dbname='websql';/*数据库名*/
    var version = '1.0'; /*数据库版本*/
    var dbdesc = 'websql'; /*数据库描述*/
    var dbsize = 2*1024*1024; /*数据库大小*/
    var dataBase = null; /*暂存数据库对象*/
    /*数据库中的表单名*/
    var websqlTable = "websqlTable";
    //drop table friend 删除表
    //打开数据库
    dataBase = window.openDatabase(dbname, version, dbdesc, dbsize,function() {});
    Vue.prototype.websqlOpenDB=function () {
      console.log("数据库打开成功")
      return dataBase;
    }
    //删除表
    Vue.prototype.dbdrop=function (tableName) {
      var sql="drop table if exists"+" "+ tableName
      dataBase.transaction(function (ctx,result) {
        ctx.executeSql(sql,[],function(ctx,result){
          console.log("表删除成功 " + tableName);
        },function(tx, error){
          console.log('表删除失败:' + tableName + error.message);
        });
      });
    }
    //新建firend表
    Vue.prototype.frienddbbcreat=function () {
      var tableName="friend"+localStorage.getItem("userid")
      var creatTableSQL = 'CREATE TABLE IF  NOT EXISTS '+ tableName + ' (userid number,text text,time text,type text,photo text,name text,PRIMARY KEY (`userid`))';
      dataBase.transaction(function (ctx,result) {
        ctx.executeSql(creatTableSQL,[],function(ctx,result){
          console.log("表创建成功 " + tableName);
        },function(tx, error){
         console.log('创建表失败:' + tableName + error.message);
        });
      });
    };

    //新建chat表
    Vue.prototype.chatdbbcreat=function () {
      var tableName="chat"+localStorage.getItem("userid")
      var creatTableSQL = 'CREATE TABLE IF  NOT EXISTS '+ tableName + ' (id number, send number,receive number,text text,type text,isread number,isreceived number, time text,PRIMARY KEY (`id`))';
      dataBase.transaction(function (ctx,result) {
        ctx.executeSql(creatTableSQL,[],function(ctx,result){
          console.log("表创建成功 " + tableName);
        },function(tx, error){
          console.log('创建表失败:' + tableName + error.message);
        });
      });
    };

    //friend表插入数据
    Vue.prototype.frienddbinsert=function (obj) {
      var tableName="friend"+localStorage.getItem("userid");
      var insterTableSQL = 'INSERT INTO ' + tableName + ' (userid,text,time,type,photo,name) VALUES (?,?,?,?,?,?)';
      dataBase.transaction(function (ctx) {
        ctx.executeSql(insterTableSQL,[obj.userid,obj.text,obj.time,obj.type,obj.photo,obj.name],function (ctx,result){
            console.log("插入" + tableName   + "成功");
          },
          function (tx, error) {
           console.log('插入'+ tableName   +'失败: ' + error.message);
          });
      });
    };

    //chat表插入
    Vue.prototype.chatdbinsert=function (obj) {
      var tableName="chat"+localStorage.getItem("userid")
      console.log(obj)
      var insterTableSQL = 'INSERT OR IGNORE INTO ' + tableName + ' (id,send,receive,text,type,isread,isreceived,time) VALUES (?,?,?,?,?,?,?,?)';
      dataBase.transaction(function (ctx) {
        ctx.executeSql(insterTableSQL,[obj.id,obj.send,obj.receive,obj.text,obj.type,obj.isread,obj.isreceived,obj.time],function (ctx,result){
            console.log("插入" + tableName   + "成功");
          },
          function (tx, error) {
            console.log('插入失败: ' + error.message);
          });
      });
    };

    //friend表更新数据1
    Vue.prototype.frienddbupdate=function (obj) {
      var tableName="friend"+localStorage.getItem("userid")
      var sql = 'UPDATE ' + tableName + ' SET text = ? ,time = ?, type = ?  WHERE userid = ?';
      dataBase.transaction(function (ctx,result) {
        ctx.executeSql(sql,[obj.text,obj.time,obj.type,obj.userid],function(ctx,result){
          console.log("更新成功 " + tableName + name);
        },function(tx, error){
          console.log('更新失败:' + tableName  + name + error.message);
        });
      });
    };
    //friend表更新数据2
    Vue.prototype.frienddbupdate2=function (obj) {
      var tableName="friend"+localStorage.getItem("userid")
      var sql = 'UPDATE ' + tableName + ' SET name = ? ,photo = ? WHERE userid = ?';
      dataBase.transaction(function (ctx,result) {
        ctx.executeSql(sql,[obj.name,obj.photo,obj.userid],function(ctx,result){
          console.log("更新成功 " + tableName + name);
        },function(tx, error){
          console.log('更新失败:' + tableName  + name + error.message);
        });
      });
    };


    //查询friend表是否有这位用户的数据
    Vue.prototype.frienddbis=function (obj) {
      var tableName="friend"+localStorage.getItem("userid");
      var selectSQL = 'SELECT * FROM ' + tableName + ' WHERE userId = ?';
      var pp=new Promise(function (resolve,reject) {
        dataBase.transaction(function (ctx) {
          ctx.executeSql(selectSQL,[obj.userid],function (ctx,result){
              resolve([result.rows.length,obj]);
            },
            function (tx, error) {
              console.log('查询失败: ' + error.message);
            });
        });
      })
      return pp
    };

    //friend所有数据获取
    Vue.prototype.friendget=function () {
      var tableName="friend"+localStorage.getItem("userid");
      var sql = 'SELECT * FROM ' + tableName + '  order by time asc'
      var pp=new Promise(function (resolve,reject) {
        dataBase.transaction(function (ctx) {
          ctx.executeSql(sql,[],function (ctx,result){
              resolve(result)
            },
            function (tx, error) {
              console.log('friendadd查询失败: ' + error.message);
              reject()
            });
        });
      });
      return pp
    }


    //通过userid从chat表获取数据
    Vue.prototype.chatget=function (userid) {
      var tableName="chat"+localStorage.getItem("userid");
      var sql ='SELECT * FROM ' + tableName + ' WHERE send = ?  OR  receive = ? order by time asc'
      var pp =new Promise(function (resolve,reject) {
        dataBase.transaction(function (ctx) {
          ctx.executeSql(sql,[userid,userid],function (ctx,result){
              resolve(result)
            },
            function (tx, error) {
              console.log('chatget查询失败: ' + error.message);
              reject(error)
            });
        });
      });
      return pp
    }

    //io返回更新chat表的isreceived
    Vue.prototype.iochatback=function (obj) {
      var tableName="chat"+localStorage.getItem("userid");
      var sql ='UPDATE ' + tableName + ' SET isreceived = ?  WHERE id = ?'
      dataBase.transaction(function (ctx,result) {
        ctx.executeSql(sql,[1,obj.id],function(ctx,result){
          console.log("更新成功iochatback " + tableName + name);
        },function(tx, error){
          console.log('更新失败:' + tableName  + name + error.message);
        });
      });
    }

   //接收消息或者发送消息更新friend表流程
    Vue.prototype.friendadd=function (obj) {
      var that=this
      this.frienddbis(obj).then(function ([result,obj]) {
        if(result==0){   //无数据则先获取好友头像和名字，，有数据则直接更新
          return(that.friendphotoget(obj))
        }else{
          that.frienddbupdate(obj);
          return new Promise(() => {
          })
        }
      }).then(function () {
        that.frienddbinsert(obj)
      })
    }


    //请求好友头像和好友名字
    Vue.prototype.friendphotoget=async function(obj) {
      var url=this.$store.state.url;
      var userid=obj.userid;
      await this.axios.post(url+"/gerendetail/imgnameget",{"userid":userid}).then(function (result) {
        if(result.data.length!=0){
          obj.name=result.data[0].name;
          obj.photo=result.data[0].picture;
        }else{
          obj.name='无'
          obj.photo=''
        }
      })
      return obj
    }

    //打开聊天窗口将当前userid的信息设置已读并传回后端
    Vue.prototype.msgsetsee=async function (send,receive) {
      var tableName="chat"+localStorage.getItem("userid");
     // var sql ='SELECT id FROM ' + tableName + ' WHERE send = ?  AND  isread = ? GROUP BY id'
        //先改本地
        var sql = 'UPDATE ' + tableName + ' SET isread=?  WHERE send = ? AND isread=?';
        dataBase.transaction(function (ctx,result) {
          ctx.executeSql(sql,[1,send,0],function(ctx,result){
            console.log("更新msgsetsee成功 " + tableName);
          },function(tx, error){
            console.log('更新msgsetsee失败:' + tableName  + error.message);
          });
        });
        //改后台
      var url=this.$store.state.url;
      this.axios.post(url+"/chat/readupdate",{"send":send,"receive":receive}).then(function (result) {
        console.log("更新后台msgsetsee成功 " + tableName);
      }).catch(function (error) {
        console.log('更新后台msgsetsee失败:' + tableName  + error.message);
      })

    };

  }
}
