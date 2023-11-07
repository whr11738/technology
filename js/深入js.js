let [x, y] = [1, 2] 
;[x, y] = [y, x]//解构赋值
log?.(); //如果有定义log()函数则调用
try {
  // 可能会导致错误的代码
} catch (error) {
  // 在错误发生时怎么处理
}

if (a === b) {
  stop();
}
a === b && stop();
//与的左边为真时才会判断右边，否则右边甚至不会执行

a ?? b
(a !== null && a !== undefined) ? a : b;
//??替代||的妙用，a不是null或undefined就返回a，否则返回b

void 0;
//当undefined用

let y = { ...x };
Object.assign({}, x);
//将x对象的属性复制到第一个参数的对象中

console.log(/[aeiou]/.test(x));
//正则表达式

//1
this.$store.state.tableData.unshift({
  name: this.form.name,
  don: this.form.don,
  fangjian: this.form.fangjian,
  chuang: this.form.chuang,
  school: this.form.school,
  class: this.form.class,
  gender: this.form.gender,
  number: this.form.number,
  phone: this.form.phone,
  homephone: this.form.homephone,
});

//2
let newTableData = {};
for (let i in this.form) {
  newTableData[i] = this.form[i];
}
this.$store.state.tableData.unshift(newTableData);

//3
this.$store.state.tableData.unshift(Object.assign({}, this.form));

//4
this.$store.state.tableData.unshift({ ...this.form });

function x(f) {
  return function (a) {
    return function (b) {
      return f.call(this, a, b);
    };
  };
}
const f = (x, y) => x + y;
console.log(x(f)(1)(2));
//高阶函数
