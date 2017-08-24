import React from 'react';
import { connect } from 'dva';
import UsersComponent from '../components/Users/Users';

function UserComponent({location,children}) {
  //放在公共的mainlayout下面
  return (
      <div>
          <UsersComponent />
      </div>
      //子组件可以通过路由的模式在
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(UserComponent);