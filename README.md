# React

React

React核心库

Redux

状态管理库，用于父子组件通信的情况下完整的更新状态

Redux-thunk

Redux的store触发action时dispatch只能接受一个对象作为参数，并将传递给reducer进行处理，使用thunk可以将触发函数dispatch修改为可以接受一个函数A作为参数，并将dispatch作为函数A的参数传入

React-promise

异步操作时可以使用

React-route

React官方的路由管理模块

antd

蚂蚁金服提供的UI组件

dva 

dva-cli作为脚手架和完备的react SPA构建工具

这东西重新封装了Redux，router,修改了整个SPA的架构模式
先看下router

在最外面src/index.js里面注册总路由,即由router.js输出的路由函数。

app = dva() //object

app.router(require('./router'))//注册总路由

通过src/router.js来控制总路由。

通过src/routes/子路由来控制各个组件=>那我们就可以通过路由=>组件的形式连接起来

通过路由dva知道当前路由下渲染哪个组件

组件通路由知道自己的children有哪些，

然后看redux的内容

我们平时使用redux时会选择将action和reducer分离。

通过view触发action（store.dispath）传递给reducer,得到最新的store

然后通过store.getState获取当前的state传递给react从而触发View更新。

这也是从View中来到View中去。

dva将reducer封装到model，并通过services提供服务支持

model文件包括一下几个选项

	namespace String 模块的名字//dva也是通过此处查找到具体的reducers 

	state Object  所对应初始的state， 也就是initialState

	effects //saga的处理函数（存疑）

	reducers 对应reducers，不同的是，写法上将switch case转为对象的方法。

最后来搞一下数据流向
View=>触发事件 antD组件支持的事件触发函数=>执行dispatch触发action=>根据action.type "namespace/reducer"查找到具体的业务逻辑

=>得到新的state=>传递给react实现View层重新渲染

services提供了对服务器通信的接口

这里面的函数接受要传递的数据，然后请求数据库，返回接受的数据，只负责请求数据，不做任何业务处理

utils提供了各种底层的方法

包括已经封装过的fetch和其他promise函数

	app==>router<==>components=action+services+utils=>model=state=>components  

index.js是入口
router.js是总路由负责声明子路由和子组件，同时负责输出最后的路由函数给index.js绑定APP