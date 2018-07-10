# 新手引导活动

## Build Setup

``` bash
# 安装依赖
npm install

# 开发服务 localhost:9999

npm run dev-learning

# 构建生产包
npm run build-learning
```

## 目录结构说明
├ build：工程构建

&emsp;&emsp;├ webpack.dev.conf.js：开发环境配置

&emsp;&emsp;├ webpack.prod.conf.js：生产环境配置

├ mock：mock服务

├ src：源码

&emsp;&emsp;├ assets：样式及图片

&emsp;&emsp;├ common：公共JS

&emsp;&emsp;&emsp;&emsp;├ element-ui: elementUI定制及扩展

&emsp;&emsp;&emsp;&emsp;├ common.js: 公共处理

&emsp;&emsp;&emsp;&emsp;├ http.js: http封装处理

&emsp;&emsp;├ components： 功能

&emsp;&emsp;&emsp;&emsp;├ learning: 新手引导

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├ index.html 入口页面

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├ main.js 入口文件

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;├ router.js: 路由

## 开发规范
1. **开发尽量使用ES2015**，遵循CommonJS规范
2. **切勿直接操作DOM**，要操作数据
3. **尽量使用Vue的语法糖**，比如用:style代替v-bind:style;用@click代替v-on:click
4. **不要在JS里绑定跟业务相关的事件**，业务事件及逻辑，应该在HTML上绑定。在JS里绑定事件应该用于使用了第三方的插件等场景，如果主动绑定了事件，记得在相关生命周期接触绑定以及销毁相关实例，比如在组件内创建了一个百度echarts，并加了一个定时器来更新数据，在组件销毁时，应该销毁这个echarts实例，并将定时器clear。
5. 命名: 组件名称（包括路由组件）使用`"-"`来分割，比如persons-new-poi .vue，**不推荐使用驼峰**。
6. 事件: 在派发和广播事件时，事件的名称也使用`"-"`来分割，**不能使用驼峰**。
7. **import请使用别名方式快捷引入**，已定义别名包括：如assets、components、common-elementUI及node_modules下所有
8. 考虑到金额数字显示的特殊性，建议在表格中，涉及到金额、税额、价税合计的列宽设置为185（能完整显示16位数字的格式化最小宽度），可以防止汇总行换行。

> ``` javascript
> // 正确
> import 'normalize.css'
>
> // 错误
> import '../node_modules/normalize.css/normalize.css'
>
> // 正确
> import 'assets/qymp.scss'
>
> // 错误
> import '../../assets/qymp.scss'
>
> ```

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
        '404': '您的渠道来源有误，请联系管理员哦～',
        'timeout': '超时了哦'
    }
})
> ```

注2：vm.created中配置httpErrorInfo，可以配置异常code对应的提示语，未配置则使用后台返回的提示语

> ``` javascript
> export default {
    created() {
        this.$root.httpErrorInfo = this.$root.httpErrorInfo || {};
        this.$root.httpErrorInfo[this.$route.path] = {
            '80482824': '未获取到该企业的行业等信息，无法为您提供税收优惠提醒服务~',
        };
    },
})
> ```

### root缓存数据，通过this.$root.xx访问

> 1. 纳税人识别号（nsrsbh）
> 2. 登录数据（loginInfo）
> 3. 当前纳税人信息（loginInfo.currentNsr）

### 消息框架：

> ``` javascript
> this.$alert(msg).then((action)=>{})
> this.$error(msg).then((action)=>{})
> // confirm请使用popover
> ```

### 埋点：
#### 1. 自动埋点:
    1.1 页面进入（data中配置logIsIgnore=true，则不埋点）
    1.2 点击查询／统计按钮
    1.3 点击导出按钮
#### 2. 手动埋点：

> ``` javascript
> /**
>  * 埋点
>  * binding = {mark:appName.pageName.clickName.otherParameters, cost, requestUrl, requestParameters}
>  * 说明：
>  * 1. appName.pageName.clickName.otherParameter定义：
>  *      appName：应用代码
>  *      pageName为页面名称
>  *      clickName：链接代码或按钮代码
>  *      otherParameters：具体由应用来指定）
>  * 2. cost: 请求耗时
>  * 3. requestUrl: 请求URL
>  * 4. requestParameters: 请求参数
>  */
> this.$log.log(binding)
> ```

#### 3. 按钮／链接手动埋点：v-log指令

> ``` html
> <a v-log="testLogInfo">测试</a>
> <script>
> export default {
>     data(){
>         return {
>             testLogInfo: {}
>         }
>     },
>     beforeMount() {
>         this.testLogInfo = {
>             mark: `${this.$root.appName}.${this.$route.meta.name}.链接代码或按钮代码`,
>             requestUrl: 链接代码或按钮url,
>         }
>     }
> }
> </script>
> ```

### 客户端接口：

#### 0. 启动:注入本项目业务客户端接口
> ``` javascript
> this.$client.start();
> ```

#### 1. 通过get方式调用客户端接口:

> ``` javascript
> this.$client.callExternalGetFunc(fnName, data, callback);
> ```

#### 2. 通过set方式调用客户端接口:

> ``` javascript
> this.$client.callExternalSetFunc(fnName, data, callback);
> ```

#### 3. 通过get方式调用本项目业务（非助手）客户端接口:

> ``` javascript
> this.$client.callBussinessGetFunc(fnName, data, callback);
> ```

#### 4. 通过set方式调用本项目业务（非助手）客户端接口:

> ``` javascript
> this.$client.callBussinessSetFunc(fnName, data, callback);
> ```

#### 5. 调用[电税]处理平台接口:

> ``` javascript
> this.$client.callWtTaxAPI(url, tradeId, params = {}, onSuccess, onError);
> ```

#### 6. 调用[电税]发票中心web接口:

> ``` javascript
> this.$client.callWtAPI(url, tradeId, params = {}, onSuccess, onError);
> ```

#### 7. 调用[惠税]平台接口:

> ``` javascript
> this.$client.callPtAPI(url, params = {}, onSuccess, onError);
> ```

#### 8. 打开web页面:

> ``` javascript
> /**
>  * 打开web页面
>  * @param app
>  * {
>  *    "title": "",//应用标题，必填
>  *    "url": "", //应用地址，必填
>  *    "appCode": ""//应用代码，以xgmbs_开头，必填
>  *    "appfuncCode": ""//应用功能代码
>  *    "appType": ""//应用类型，可选值：web、native，默认web
>  *    "appMode": "" //打开模式，可选值：tab、show、showmodal，默认showmodal
>  *    "defButtons": 窗口按钮，默认'max, close'
>  *    "appData": beforeInit参数传递
>  *    "beforeInit": 初始化方法名，默认为空，方法请在打开页面中全局定义
>  *    "beforeClose"：关闭前回调方法名，默认为空，方法请在打开页面中全局定义
>  * }
>  * @param callback 接受closeAppWindow传递的参数作为参数
>  */
>  this.$client.openWebApp(app, callback)
> ```

#### 9. 关闭web页面:

> ``` javascript
> /**
>  * 关闭页面
>  * @param appData 作为参数传递给openAppWindow的回调
>  */
>  this.$client.closeWebApp(appData)
> ```

### 具名客户端回调方法

> 使用场景：用于提供给客户端主动调用的接口

> 设计思路：利用事件监听的模式，客户端调用`window.GxrzClient`下对应的方法触发事件，在各个模块内监听对应的事件作出处理

> 使用示例：

```javascript
  // 1、在common/client-callback.js下添加方法，触发事件，触发时可带参数
  const cc = (function () {
      return {
          hello: name => {
              this.$evt.emit('ev_hello', name, 'hi');
          },
      };
  }).call(Vue.prototype);

  // 2、在模块内监听事件，通常在created或者mounted钩子内，可以接受触发事件时带的参数，也可以访问当前实例
  this.$evt.on('ev_hello', () => {
      console.log(this.$data);
  });

  this.$evt.on('ev_hello', name => {
      console.log(`hello ${name}`);
  });

```


### 典型功能开发

1. 统计（无分页）+导出 [开发说明](./src/components/common/docs/search.md)

2. 分页查询+导出 [开发说明](./src/components/common/docs/search-page.md)

3. 分页查询+2个结果表格+导出 [开发说明](./src/components/common/docs/search-page2.md)

4. 导出 [开发说明](./src/components/common/docs/export.md)

5. 高级查询 [开发说明](./src/components/common/docs/slider-pane.md)

### Date:日期处理

> ``` javascript
> // 日期格式化
> new Date().format(format = 'yyyy-MM-dd')
>
> // 获取当前月第一天
> new Date().getFirstDayOfMonth()
>
> // 获取上个月第一天
> new Date().getFirstDayOfPreMonth()
>
> // 获取上个月最后一天
> new Date().getLastDayOfPreMonth()
> ```

### String:字符串处理

> ``` javascript
> // 数字千分位显示，支持¥等前缀,digit表示小数位数，默认不处理小数位数
> str.toMoney(prefix = '', digit)
> ```

### 图片引用：在模块别名前加～，如～assets

> ``` css
> .container {
>     background: url("~assets/images/eslint.png");
> }
> ```
