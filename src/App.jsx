import React from 'react'
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import './assests/base.less'
import Header from './components/Header'
import Aside from './components/Aside'
import Bread from './components/BreadCrumb'


export default function App(){

  const { Sider, Content } = Layout;

  return (
    <>
    <Layout className='layout'>
    <Header/>
<Layout>
  <Sider><Aside/></Sider>
  <Content>
    <div className='content-body'>
    <Bread/>
    <div className="content-container">
    <Outlet />
    </div>
    
    </div>
    </Content>
</Layout>
<footer>&copy; copyright | CMS Management</footer>
</Layout>

    </>
    
  )
}

