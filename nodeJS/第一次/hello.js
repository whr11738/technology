// module.exports.内容 或 module.exports={}将内容暴露出去，exports也可以但只适用部分情况
console.log('hello');
exports.x = 'hello中的x'

module.exports = {
    y:1
}