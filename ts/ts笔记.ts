
let a:number;
a = 10
// 类型声明

function sum(a:number ,b:number):number{
    return a+b
}
let res = sum(123 ,456)
// 函数类型声明

let a: "man" | "girl"
a = "man"
// 限制值，只能写赋值man或girl

let a: boolean | string
a = true
a = 'hello'
// 联合类型

let a:any
// 表示任意类型的值，慎用，赋值给其他变量会把其他变量也变成any

let a:unknown
let b:string
a = "hello"
if(typeof a === "string"){b = a}
// unknown类型安全的any，表示未知的值,不能直接赋值

b = a as string
b = <string>a
// 类型断言，告诉编译器变量的实际类型

function fn():void{}
// void表示空，以函数为例，表示没有返回值得函数
function fn2():never{}
// 表示没有值，返回就会报错

let a: {name: string, age?:number,[otherName:string]: any}
// 加?变可选属性,[otherName:string]:string表示其他任意属性名和属性值

let f:(a:number,b:number)=>number
// 设置函数结构类型声明

let a: string[]
let a: Array<number>
a = ['a','b','c']
// 设置数组中的数据类型

let a: [string,number]
a = ['a',1]
// 元组，固定长度的数组

enum Gender{
    man,//man = 1
    girl//girl = 0
}
let  a: {name: string,gender:Gender}
a = {
    name:'x',
    gender:Gender.man
}
console.log(a.gender ===Gender.man);// true
//枚举,可以节省数据库空间，适用于值少

let a: {name:string} & {age:number}
a = {name:'x',age:1}
// &表示同时

type x = 1|2|3|4|5
let k:x
// 别名x就是1|2|3|4|5

node部分

    tsc 文件名//编译
    tsc 文件名 -w//变化后自动编译
    tsc //编译所有文件
    tsc -w//所有ts文件变化后自动编译

    webpack部分

    npm init -y
    // 初始化项目，创建package.json文件
    npm i -D webpack ts-loader typescript webpack-cli
    // 下载构建工具

类
class Person{
    name:string = 'x';
    static age:number = 18
}
let per = new Person
console.log(per.name,Person.age);
// 直接定义的属性是实例属性，要通过对象的实例去访问
// static开头的属性是静态属性(类属性)，可以通过类去访问
// readonly开头的属性只能读不能改

class Animal {// 父类
    name: string;
    constructor(name: string) {// 构造函数
      this.name = name;
    }
    say() {
      console.log(this.name);
    }
  }
  class Dog extends Animal {// 子类用extends继承父类属性
    age: number;
    constructor(name: string, age: number) {// 构造函数
      super(name), //子类调用构造必须要继用super继承一下父类的属性
      this.age = age;
    }
    sayHello() {
      super.say(), // 子类使用父类的函数
      console.log(this.age);
    }
  }
  let dog1 = new Dog('x', 18);
  dog1.sayHello();
  //super extends

  abstract class Animal{
      abstract sayHello():void
  }
  // abstract
  // 抽象类，让类只能被继承，而不能直接创建对象
  // 抽象方法，只能定义在抽象类中，子类必须对抽象方法重写

  interface type{
      name:string
      age:number
  }
  let obj:type = {
      name:'x',
      age:1
  }
  // interface 接口，用来定义一个类应该包含哪些属性和方法
  // 里面的属性不能有值，方法都是抽象方法

  class Person{
    public name:string // private私有属性，只能在类内部进行访问和修改
    protected num:number // protected属性,只能在当前类和当前类子类中进行访问和修改
    private age:number // public属性可以在任意位置访问和修改（默认值）
    constructor(name:string,age:number){
        this.name = name
        this.age = age
    }
    get getAge(){ // get方法用来访问
        return this.age
    }
    set setAge(value:number){ // set方法用来修改
        if(value > 0){
            this.age = value
        }
    }
}
let per = new Person('x',1)
console.log(per.getAge);
per.setAge = 2
console.log(per.getAge);
per.setAge = -1
console.log(per.getAge);
// 封装类

function fn<T>(a: T):T{
    return a
}
console.log(fn<string>('1'),typeof fn('1'));
console.log(fn<number>(1),typeof fn(1));
// 在定义函数或是类时，如果遇到不确定的类型可以用泛形