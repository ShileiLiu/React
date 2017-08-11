import * as usersService from '../services/users';

export default {
	namespace: 'users',
	state: {
	  	list: [],
	    total: null,
	},
	reducers: {
	  	// add(state,action){
	  	// 	console.log(123);
	  	// 	return state;
	  	// },
	  	save(state, { payload: { data: list, total,page } }) {
	      return { ...state,list,total,page};
	    }
	},
	effects: {
		*fetch({ payload: { page = 1 } }, { call, put }) {
	      const { data, headers } = yield call(usersService.fetch, { page });
	      yield put({ type: 'save', payload: { data,total: parseInt(headers['x-total-count'], 10),page: parseInt(page, 10)} });
		},
		*remove({payload:id},{call,put,select}){
			yield call(usersService.remove,id);
			const page  = yield select(state=>state.users.page);
			yield put({ type: 'fetch', payload: { page } });	
		},
		*patch({ payload: { id, values } }, { call, put, select }) {
			yield call(usersService.patch, id, values);
			const page = yield select(state => state.users.page);
			yield put({ type: 'fetch', payload: { page } });
		}
	},
	subscriptions: {
		setup({ dispatch, history }) {
	      	return history.listen(({ pathname, query }) => {
	        	if (pathname === '/users') {
	                dispatch({ type: 'fetch', payload: query });
	        	}
	        });
	    },
	},
};

//model DVA最重要的部分
// export default {
// 	namespace: 'users',//model的名字。component里面action用dispatch触发reducer时，查找reducer就是根据namespace/reducer来查找具体reducer的
// 	state:{ //初始化state
// 		list:[],
// 		total:null
// 	},
// 	reducers:{
// 		//reducer的save方法
// 		save(state,{payload:{data:list,total,page}}){
// 			return {...state,list,total,page}
// 		}

// 	},
// 	effects:{
// 		*fetch({payload:{page = 1}},{call,put}){
// 			const {data,headers} = yield call(usersService.fetch,{page})//异步操作
// 			yield put({type:'save',payload:{data,total: parseInt(headers['x-total-count'], 10),page: parseInt(page, 10),}})
// 		}
// 	},
// 	subscriptions: {
// 		setup({ dispatch, history }) {//监听数据
// 	      	return history.listen(({ pathname, query }) => {
// 	        	if (pathname === '/users') {
// 	                dispatch({ type: 'fetch', payload: query });
// 	        	}
// 	        });
// 	    },
// 	},
// }//输出一个对象
