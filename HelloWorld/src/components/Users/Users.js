import React from 'react';
import styles from './Users.css';

function Users() {
	function deleteHandler(id){
		console.warn(`TODO:${id}`)
	}
  return (
    <div className={styles.normal}>
      Component: Users
    </div>
  );
}

export default Users;
