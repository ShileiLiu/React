import React from 'react';
import {IndexRoute ,Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Users from "./routes/Users";
import UserComponent from './routes/UserComponent'
function RouterConfig({ history }) {
  return (

    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/users" component={Users}>
         <IndexRoute component={UserComponent} />
         <Route path="/users/uu" component={UserComponent} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
