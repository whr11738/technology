// 引入fs
var fs = require('fs');

// 同步文件读取与异步文件读取与写入操作类似
// 结果以16进制返回是增加可读的文件类型比如图片，用toString()可转为字符串

// 简单文件读取

fs.readFile('hello.txt',function(err,data){
    if(!err){
        console.log(data.toString());
    }
})

// 流式文件读取,每次读65536字节

var rs = fs.createReadStream('hello.txt')
// 监听打开与关闭，可不写
rs.once('open',function(){
    console.log('流打开了');
})
rs.once('close',function(){
    console.log('流关闭了');
})
// 如果要读取一个可读流中的数据，必须为可读流绑定一个data事件，绑定后会自动读取数据
rs.on('data',function(data){
    console.log(data.toString());
})

// 在有了可读流rs和可写流ws后,可以用pipe直接传输内容
var rs = fs.createReadStream('hello.txt')
var ws = fs.createWriteStream('hello2.txt')
rs.pipe(ws)