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

	这个router.js将所有子路由进行了汇总后export。

	比如路由是'/'即为空的时候页面跳转'/home','/home'这个路由的首页是'/home/overview'

	类似于路由重定向，

	通过getComponent获得组件，

	通过routes文件夹下面的子路由文件将子路由与组件进行绑定
	import React from 'react'
	import { connect } from 'dva'

	import OverviewComponent from '../../components/Home/Overview'

	function Overview ({ location }) {
	  return (
	    <div>
	      <OverviewComponent />
	    </div>
	  )
	}

	function mapStateToProps() {
	  return {}
	}

	export default connect(mapStateToProps)(Overview)

	如上所示，这是overview的子路由文件，也就是业务组件外层的第一层壳。  

	routes文件就是mainLayout（最外层的组件）+二级公共组件/三级组件等组合后最后输出的总组件

	这就是子路由文件起的作用，组合组件，最后输出一个大的组件。

antd

蚂蚁金服提供的UI组件

dva 

dva-cli作为脚手架和完备的react SPA构建工具

这东西重新封装了Redux，router,修改了整个SPA的架构模式

在最外面src/index.js里面注册总路由,即由router.js输出的路由函数。

app = dva() //object

app.router(require('./router'))//注册总路由

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

React的核心------props,state的数据传递.



2017-8-20
最近做完了项目的路由架构和请求配置
对于React和redux，react-route等有了进一步的理解，
react-route的路由模式是类似配置对象的模式。路由文件输出的就是当前页面的全部组件
即路由一边链接的是window.location.href，一边是页面的所有内容，
但是路由层只做组件汇总处理，不能写入业务和数据，更不可以dispatch action
他不涉及业务，否则分层不清晰，代码结构混乱

2017-8-24
git reset --hard head 取消冲突状态，删除掉冲突文件下的冲突内容和标记，再次git push即可

最近完成了一个列表，大体知道了数据走向
React的组件的动态数据来源有两种。组件内部的state，父组件传递下来的props

当自身组件内部数据进行业务操作的时候是直接操作state最后setState就可以，

但是如果发生了父子组件数据传递就不同了，而请求的数据都是从props上下来的

整个请求流程就是 组件通过自身的state拿到要发送的数据，dispatch一个action到model的effect，

effect获取services里面的接口和请求函数，接收到数据后通过props传递给父组件，最后再一步步的传递到子组件

2017-8-25 

父组件是无法直接访问子组件里面的数据的

可以通过refs直接执行子组件里面的方法，通知子组件将数据传递给父组件，统一打包触发action后发送给服务器

子组件访问父组件里面的数据是通过props直接拿的

数据流通就是这么点问题

Redux（dva）管理的是总的state状态，各个connect的组件可以自由从store上获取最新的state同时管理自己的组件。

react-router的路由模式哈希路由，所以对于"#"是必须的。同时可以取消最后面的？之后的内容 使用浏览器路由即可

2017-8-30

今天又加深了props和state的作用，
props是可以和reducer通信的，对于connect的组件，动态的状态应该由props决定而不是再设置state。
对于组件内部的状态变化，使用state的值，然后进行渲染，最后再通过触发action 的方式发送到reducer
reducer是state和props的通信处，是state传递数据出去的方式，在这里，可以执行发送请求、将返回的数据再通过props传递给组件，这样数据就通了，所以组件的一个状态需要AJAX返回的时候，需要使用props的




2017-9-1
React的双向绑定
需要给input或者switchBtn或者checkbox绑定事件，然后绑定到state上。
state可以在render里拿到props里的值，这样就可以绑定默认值


 


 
angular，Vue，React都是通过数据确定状态的框架，其思想有相通之处