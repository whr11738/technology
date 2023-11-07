// 引入fs
var fs = require('fs');

// 有Sync就是同步执行，不然就是异步执行,异步是通过回调函数返回的而不是返回值

// 打开文件
// fs.openSync('path','flages')
// 第一个参数是文件路径，第二个参数r是读，w是写

var fd = fs.openSync('hello.txt','w')

// 向文件中写入内容
// fs.writeSync(fd,string,number)
// 第一个参数是文件的描述符，第二个参数是要写入的内容，第三个参数是写入起始位置

fs.writeSync(fd,"内容",20)

// 保存并关闭文件
// fs.closeSync(fd)

fs.closeSync(fd)

// 异步进行,对性能有要求再用

fs.open('hello.txt','w',function(err,fd){
    if(!err){
        fs.write(fd,'内容',function(){
            if(!err){
                console.log('写入成功');
            }
            fs.close(fd,function(err){
                if(!err){
                    console.log('文件已关闭');
                }
            })
        })
    }
    else{
        console.log('报错原因: ',err);
    }
})

// 简单文件写入，封装了打开，写入与保存,flag位置为设置操作，a为追加，r为读，w为写

fs.writeFile('hello.txt','内容2',{flag:'a'},function(err){
    if(!err){
        console.log('写入成功');
    }
})

// 绝对路径写法
// C:/Users/Administrator/Desktop/nodeJS/hello.txt
// C:\\Users\\Administrator\\Desktop\\nodeJS\\hello.txt

fs.writeFile('C:\\Users\\Administrator\\Desktop\\nodeJS\\hello.txt','内容2',{flag:'a'},function(err){
    if(!err){
        console.log('写入成功');
    }
})

// 流式写入,建立一个可持续写入的管子，适用于大文件

var ws = fs.createWriteStream('hello.txt')
// 监听打开与关闭，可不写
ws.once('open',function(){
    console.log('流打开了');
})
ws.once('close',function(){
    console.log('流关闭了');
})
ws.write('内容1')
ws.write('内容2')
ws.write('内容3')
// 因为是异步所以不能用close关，得用end
ws.end()