// webpack文件

const path = require('path');

module.exports = {
    // 指定入口文件
    entry:"./src/index.ts",
    // 指定打包文件目录
    output:{
        path:"./dist",
        // 打包后文件名
        filename:"bundle.js"
    },
    // 指定webpack打包时用的模块
    module:{
        // 规则
        rules:[
            {
                // 生效的文件
                test: /|.ts$/,
                // 要使用的loader
                use:'ts-loader',
                // 要排除的文件
                exclude:/node-modules/
            }
        ]
    }
}

// 在package.json文件中scripts对象下227行写入 "build": "webpack" 进行打包