function rand(m, n) {
  return Math.ceil(Math.random() * (n - m + 1)) + m - 1;
}
const p = new Promise((resolve, reject) => {
  const n = rand(1, 100);
  if (n > 50) {
    resolve(n);
  } else {
    reject(n);
  }
});
p.then(
  (value) => {
    console.log(1, value);
  },
  (reason) => {
    console.log(0, reason);
  },
);

将一个异步函数封装成promise风格
const util = require('util')
util.promisify

Promise.resolve('success')   状态变成成功，直接返回成功的结果
Promise.reject('error')      状态变成失败直接返回失败的结果
Promise.all([p1,p2])         p1,p2中全成功就返回成功的结果，有一个失败就返回失败的结果
Promise.race([p1,p2])        p1,p2中最快改变状态出结果的就是他的结果

如果promise封装的是同步函数就会先改变状态再调用then回调函数
如果封装的是异步函数就会先调用then再处理改变状态再在then中返回结果

链式调用,then的返回结果也是Promise对象
const p = new Promise((resolve)=>{
    resolve('ok')
})
p.then(()=>{
    return new Promise((resolve)=>{
        resolve('success')
    })
}).then(value=>{
    console.log(value);
})

异常穿透，过程中遇到失败的情况会在最后catch函数输出
const p = new Promise((resolve,reject)=>{
    reject('err1')
})
p.then(()=>{
    console.log('1');
}).then(()=>{
    console.log('2');
}).then(()=>{
    throw 'err2'
}).then(()=>{
    console.log('4');
}).then(()=>{
    console.log('5');
}).catch(reason=>{
    console.log(reason);
})

中断链式的方法，过程中使一个状态处于未改变状态
const p = new Promise((resolve)=>{
    resolve('ok')
})
p.then(()=>{
    console.log('1');
}).then(()=>{
    console.log('2');
}).then(()=>{
    console.log('3');
    return new Promise(()=>{})
}).then(()=>{
    console.log('4');
}).then(()=>{
    console.log('5');
}).catch(reason=>{
    console.log(reason);
})

fs.readFile('./1.xt',(err,data1)=>{
    if(err) throw err;
    fs.readFile('./1.xt',(err,data2)=>{
        if(err) throw err;
        fs.readFile('./1.xt',(err,data3)=>{
            if(err) throw err;
            console.log(data1+data2+data3);
        })
    })
})

mineReadFile是之前一个封装好的用来读取文件的函数
await可以获取右边promise对象成功的结果有效解决上面回调地狱问题
async function main(){
    let data1 = await mineReadFile('./1.txt')
    let data2 = await mineReadFile('./2.txt')
    let data3 = await mineReadFile('./3.txt')
    console.log(data1+data2+data3);
}
main()