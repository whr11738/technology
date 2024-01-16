# MongoDB

## MongoDB （数据库）

### 安装

https://www.mongodb.com/try/download/community

- 安装过程可以把 MongoDB Compass 安装先去掉，避免下载要翻墙导致安装卡死
- 安装完成后配置环境变量:
- 打开环境变量 -> 系统变量 -> Path -> 新建 -> 输入安装路径下的 bin 文件夹的路径
  例如 C:\Program Files\MongoDB\Server\7.0\bin
- 如果不创建 C:\data\db 文件夹，数据库文件会在根目录下 data 文件夹中

### 使用

终端中输入 mongod

## MongoDB Compass （数据库可视化管理工具）

### 使用

桌面生成快捷方式

### 安装

https://www.mongodb.com/try/download/compass

## mongoose （控制 MongoDB 数据库的依赖）

### 安装

npm i mongoose -s

### 使用

用 js 编写
