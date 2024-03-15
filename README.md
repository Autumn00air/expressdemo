## 图书馆的后端部分
使用了MongoDB作为数据库，利用mongoose进行连接和数据交互
使用express搭建的web服务，没有使用generator，而是直接安装，然后使用nodemon进行监视和启动服务
需要注意的是，为了使用import模块导入和es6，使用了babel，需要安装babel-cli和@babel/preset-env
但是貌似?.查询链这种还是不支持
### 验证使用的是session验证，使用了express-session
### 根目录就model和routes两个文件夹，model文件夹中包含了数据库模型，routes文件夹中包含了路由，以及app.js作为入口也是主文件
### mongoose还是挺好用的，后面操作数据的增删改查都差不多，但是需要注意的是，使用mongoose的模型，需要在模型中使用mongoose.Schema