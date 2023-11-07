// 引入fs
var fs = require('fs');

//检查一个文件是否存在
var x = fs.existsSync('a.mp3')
console.log(x);

//查看文件状态
fs.stat('hello2.txt',function(err,stat){
    console.log(stat);
})

// 删除目标文件
fs.unlinkSync('hello2.txt')

// 读取文件目录
fs.readdir('.',function(err,files){
    if(!err){
        console.log(files);
    }
})

// 监视文件状态,1000为一秒监视一次
fs.watchFile('hello.txt',{interval:1000},function(curr,prev){
    console.log('文件发生变化');
    console.log('修改后文件状态: ',curr);
    console.log('修改前文件状态: ',prev);
})