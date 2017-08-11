import React from 'react';
import styles from './Users.css';
import {connect} from 'dva';
import {Table,Pagination,Popconfirm} from 'antd';
import {routerRedux} from 'dva/router';
import {PAGE_SIZE} from '../../constants';
function Users({dispatch,list:dataSource,loading,total,page:current}) {
	function deleteHandler(id){
		 dispatch({
       type:'users/remove',
       payload:id
     })
  }
  function pageChangeHandler(page){
    dispatch(routerRedux.push({
      pathname:'/users',
      query:{page}
    }))
  }
	const columns = [
		{
			title:"Name",
			dataIndex:"name",
			key:"name",
			render:text=><a href="">{text}</a>
		},
		{
			title:"Email",
			dataIndex:'email',
			key:"email"
		},
		{
			title:'website',
			dataIndex:'website',
			key:'website',
		},
		{
			title:'Operation',
			key:'Operation',
			render:(text,{id})=>
				<span className={styles.operation}>
					<a>Edit</a>
					<Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, id)}>
              <a>Delete</a>
          </Popconfirm>
				</span>	
		}
	]
	  return (
	        <div className={styles.normal}>
		        <div>
			        <Table
			            columns={columns}
                  dataSource={dataSource}
                  loading={loading}
			            rowKey={record => record.id}
			            pagination={false}
			         />
			         <Pagination
			            className="ant-table-pagination"
			            total={total}
			            current={current}
                  pageSize={PAGE_SIZE}
                  onChange={pageChangeHandler}
			        />
		        </div>
		    </div>
	  );
}
function mapStateToProps(state){
	const{list,total,page} = state.users;
	return {
    loading:state.loading.models.users,
		list,total,page
	}
}
export default connect(mapStateToProps)(Users);
