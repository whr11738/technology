//记得安装npm i express
//然后用node file.js开启
const express=require('express');
// 创建应用对象
const app=express();
// 创建路由规则
// request是对请求报文的封装
// response是对响应报文的封装
// 第一个参数是地址，第二个参数是对应的函数
app.get('/server',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    const date='hello，get'
    let str=JSON.stringify(date)
    response.send(str);
})//回应get请求

app.post('/server',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    const date={
        name:'dataname'
    }
    let str=JSON.stringify(date)
    //2秒后返回内容以便测试
    setTimeout(() => {
        response.send(str);
    }, 2000);
})//回应post请求

app.all('/server',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置请求头需要补充这行
    response.setHeader('Access-Control-Allow-Headers','*');
    response.send('hello，all');
})//回应所有请求

app.listen(8000,()=>{
    console.log('8000,开启成功');
})

app.all('/jsonp-server',(request,response)=>{
    const data={name:'jsonp'}
    let str=JSON.stringify(data)
    //用end没有响应头，handle是那边的函数名，调用那边的handle函数
    // 只能识别js代码所以这样写使模板能够解析
    response.end(`handle(${str})`)
})