import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import MainLayout from '../components/MainLayout/MainLayout';
import UsersComponent from '../components/Users/Users';

function Users({location,children}) {
  //放在公共的mainlayout下面
  console.log(children);
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
          {children}
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Users);
//
