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

其运行原理是在路由注册文件router.js里对组件进行预先的规定

可以通过两种模式

1：根据路由按照依赖加载组件
	const routes = [ {
	      path: '/',
	      indexRoute: {
	        onEnter: (nextState, replace) => replace('/home')
	      }
	    },
	    {
	      path: '/home',
	      indexRoute: {
	        onEnter: (nextState, replace) => replace('/home/overview')
	      },
	      //webpack内置函数
	      getComponent (nextState, cb) {
	        require.ensure([], require => {
	          cb(null, require('./routes/Home'))//路由回调
	        })
	      },
	      childRoutes: [{
	        path: 'overview',
	        getComponent (nextState, cb) {
	          require.ensure([], require => {
	            cb(null, require('./routes/Home/Overview'))
	          })
	        }
	      }]
	    }
	]
	return <Router history={createBrowserHistory()} routes={routes} />

	如以上代码所示

	定义路由函数，并export给index.js，通过app.router（）进行注册

	这个router.js将所有子路由进行了注册。

	比如路由是'/'即为空的时候页面跳转'/home','/home'这个路由的首页是'/home/overview'

	类似于路由重定向，通过getComponent获得组件，
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

services提供了对服务器通信的接口

这里面的函数接受要传递的数据，然后请求数据库，返回接受的数据，只负责请求数据，不做任何业务处理

utils提供了各种底层的方法

包括已经封装过的fetch和其他promise函数


最后来搞一下数据流向

View=>触发事件 antD组件支持的事件触发函数=>执行dispatch触发action=>根据action.type "namespace/reducer"

查找到具体的业务逻辑=>得到新的state=>传递给react实现View层重新渲染

app==>router<==>components=action+services+utils=>model=state=>components  

index.js是入口
router.js是总路由负责声明子路由和子组件，同时负责输出最后的路由函数给index.js绑定APP


API记录
router -- connect
调用方法 connect(mapStateToProps，mapDispatchToProps)(Users)
其中mapStateToProps可以传入数据给组件的props，同时，他的第一个参数是Redux的store，第二个参数ownProps是组件自己的props  
返回一个纯对象，里面是要加入组件的props的值
	const mapStateToProps = (state, ownProps) => {
	// state 是 {userList: [{id: 0, name: '王二'}]}
		return {
			user: _.find(state.userList, {id: ownProps.userId})//获取到state.userList里面ID是ownProps.userId
		}
	}

	class MyComp extends Component {
	//这儿就是传入mapStateToProps的ownProps
	static PropTypes = {
		userId: PropTypes.string.isRequired,
		user: PropTypes.object
	};
	
	render(){
		return <div>用户名：{this.props.user.name}</div>
	}
	}

	const Comp = connect(mapStateToProps)(MyComp);
	当state，ownProps变化时，mapStateToProps都会被调用，计算出一个新的stateProps.更新给MyComp
mapDispatchToProps是connect的第二个参数，他将action作为props绑定到组建上
	const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		increase: (...args) => dispatch(actions.increase(...args)),
		decrease: (...args) => dispatch(actions.decrease(...args))
	}
	}

	class MyComp extends Component {
	render(){
		const {count, increase, decrease} = this.props;
		return (<div>
		<div>计数：{this.props.count}次</div>
		<button onClick={increase}>增加</button>
		<button onClick={decrease}>减少</button>
		</div>)
	}
	}

	const Comp = connect(mapStateToProps， mapDispatchToProps)(MyComp)
mapDispatchToProps的第一个参数是dispatch，第二个是组件自己的props类似上面的函数

上面的例子中increase和decrease也会成为组件的props，
