import React from 'react';
import { Link } from 'dva/router';
import {Menu,Icon} from 'antd';
//header提供了一个组件，但是！only component 不涉及路由跳转，所以在路由里没有此组件的注册记录
function Header({location}){
    return(
        <Menu
            selectedKeys={[location.pathname]}
            mode="horizontal"
            theme="dark"
        >
            <Menu.Item key="/users">
                <Link to="/users"><Icon type="bars" />Users</Link>
            </Menu.Item>
            <Menu.Item key="/">
                <Link to="/"><Icon type="home" />Home</Link>
            </Menu.Item>
            <Menu.Item key="/404">
                <Link to="/page-you-dont-know"><Icon type="frown-circle" />404</Link>
            </Menu.Item>
            <Menu.Item key="/antd">
                <a href="https://github.com/Shileiliu/React" target="_blank">dva</a>
            </Menu.Item>
        </Menu>
    )
}
export default Header;