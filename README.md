# README SOL Project
``` bash
# 安装依赖
npm install

# 开发服务 localhost:9999

npm run dev

# 构建生产包
npm run build
```

## 目录结构说明
├ build：工程构建

&emsp;&emsp;├ webpack.dev.conf.js：开发环境配置

&emsp;&emsp;├ webpack.prod.conf.js：生产环境配置

├ mock：mock服务

├ src：源码

&emsp;&emsp;├ assets：样式及图片

&emsp;&emsp;├ common：公共JS

&emsp;&emsp;&emsp;&emsp;├ common.js: 公共处理

&emsp;&emsp;&emsp;&emsp;├ http.js: http封装处理

&emsp;&emsp;├ components： 功能

&emsp;&emsp;&emsp;&emsp;├ module: 模块

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├ index.html 入口页面

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├ main.js 入口文件

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├ router.js: 路由

## API说明
### XMLHttpRequests： [API参考](https://github.com/mzabriskie/axios)

> ``` javascript
> //请使用this.$http调用，而非axios！！！
> this.$http.get(url[, config])
> this.$http.post(url[, data[, config]])
> ```

注1：config参数中可以配置异常信息提示，key支持http状态码及timeout，未配置则使用默认提示语

> ``` javascript
> this.$http.post(url, {
    errorInfo: {
        '404': '页面不存在～',
        'timeout': '超时了'
    }
})
> ```

### 消息框架：

> ``` javascript
> this.$alert(msg).then((action)=>{})
> this.$error(msg).then((action)=>{})
> ```

### Date:日期处理

> ``` javascript
> // 日期格式化
> new Date().format(format = 'yyyy-MM-dd')
>
> ```

### 图片引用：在模块别名前加～，如～assets

> ``` css
> .container {
>     background: url("~assets/images/eslint.png");
> }
> ```
