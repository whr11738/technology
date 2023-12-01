// 初始化
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:23333/bysjDB');  
var Schema = mongoose.Schema
var userinfo = new Schema({
    username:String,
    password:String,
    power:{
        type:Number,//类型
        default:0//默认值
    }
})
var Userinfo = mongoose.model('userinfo',userinfo)

Userinfo.findOne({username:'girl'},function(err,doc){
    if (!err) {
        doc.remove(function(err){
            if (!err) {
                console.log('删除成功');
            }
        })
    }
})