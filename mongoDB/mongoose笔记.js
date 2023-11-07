// 安装
// npm i mongoose --save
// 引入
// var mongoose = require("mongoose");
// 连接数据库
// mongoose.connect('mongodb://数据库IP地址:端口号/数据库名');
// mongoose.connect('mongodb://127.0.0.1:23333/bysjDB');  
// 断开数据库连接
// mongoose.disconnect()
// 数据库连接成功事件
// mongoose.connection.once("open",function(){console.log("数据库连接成功");});
// 数据库断开事件
// mongoose.connection.once("close",function(){console.log("数据库已断开连接");});
var mongoose = require('mongoose');
// console.log(mongoose);
mongoose.connect('mongodb://127.0.0.1:23333/bysjDB');  
mongoose.connection.once("open",function(){console.log("数据库连接成功");});
mongoose.connection.once("close",function(){console.log("数据库已断开连接");});

// 创建Schema(模式)对象，创建约束对象,代表数据库
var Schema = mongoose.Schema
var userinfo = new Schema({
    username:String,
    password:String,
    power:{
        type:Number,//类型
        default:0//默认值
    }
},
//连接集合时会自动在后面加s再连接，没有就会创建，为了避免这种情况得加这句
{ collection: 'userinfo' })

// 通过Schema创建Model，代表数据库中的集合
// 第一个参数为映射的集合，第二个参数为对集合进行约束的Schema
// 映射的集合如果没有结尾没有s，就会创建一个结尾有s的新集合
var Userinfo = mongoose.model('userinfo',userinfo)

// 向集合中插入新文档
// 第一个参数为插入的数据，第二个参数为回调函数
Userinfo.create(
    {
        username:"user1",
        password:"123123456",
        power:2,
    },
    function(err){
        if (!err) {
            console.log('插入成功');
        }
    }
)

// 查询数据
// 参数分别为 查询条件，投影，查询选项，回调函数(必须有)
Userinfo.find(
    {name:'user1'},
    function(err,docs){
        if(!err){
            console.log(docs);
        }
    }
)
//根据_id来查找
Userinfo.findById(
    '001',
    function(err,docs){
        if(!err){
            console.log(docs);
        }
    }
)

// 修改数据
// updateOne修改一个，updateMany修改多个
// 参数分别为:查询条件，修改后的对象，配置参数，回调函数
Userinfo.updateOne({name:'user1'},{$set:{power:1}},function(err){
    if (!err) {
        console.log('修改成功');
    }
})

// 删除数据
//删除多个remove,deleteMany,删除一个deleteOne
Userinfo.deleteOne({power:2},function(err){
    if (!err) {
        console.log('删除成功');
    }
})

// 统计文档数量
Userinfo.count({},function(err,count){
    if (!err) {
        console.log(count);
    }
})

//Document和集合中的文档一一对应，Document是Model的实例
// 通过Model查询到的结果都是Document

// 新建文档
var x = new Userinfo({
    username: "man",
    password: "123456",
    power: 0,
})
// 保存文档
x.save(function(err){
    if(!err){
        console.log('保存成功');
    }
})

// 修改文档
Userinfo.findOne({username:'man'},function(err,doc){
    if (!err) {
        // doc.update({$set:{username:'girl'}},function(err){
        //     if (!err) {
        //         console.log('修改成功');
        //     }
        // })
        doc.username = 'girl'
        doc.save()
    }
})

// 删除文档
Userinfo.findOne({username:'girl'},function(err,doc){
    if (!err) {
        doc.remove(function(err){
            if (!err) {
                console.log('删除成功');
            }
        })
    }
})