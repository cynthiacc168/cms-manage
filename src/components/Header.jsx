import React from "react";
import {Dropdown, message} from "antd"
import { CaretDownOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import logoImg from "../assests/logo.png"
import default_avatar from "../assests/default_avatar.png"
import "../assests/base.less"
import { useNavigate } from "react-router-dom";


export default function Header(){

    const [avatar, setAvatar] = useState(default_avatar)
    const [username, setUsername] = useState("Visitor")
    //Didmount
    useEffect(()=>{
        const avatar1 = localStorage.getItem('avatar')
        const username1 = localStorage.getItem('username')
        if(avatar1)setAvatar('http://47.93.114.103:6688/'+avatar1)
        if(username1)setUsername(username1)

    },[])

    

    //logout function
    const navigate = useNavigate()
    const logout = () =>{
       success()
       localStorage.removeItem('cms-token')
       setTimeout(()=>navigate('/login'),1200) 

    }

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Logouted.',
        });
      };


    //dropdown items
    const items = [
        {
          label: (
            <span >
              Edit Profile
            </span>
          ),
          key: '0',
        },
        {
            type: 'divider',
          },
        {
          label: (
            <span  onClick={logout}>
             Logout
            </span>
          ),
          key: '1',
        },
    
      ];
    return(
        <>
        {contextHolder}
        <header>
            <img src={logoImg} alt="" className="logo"/>
            <div className="right">
                <Dropdown
    menu={{
      items,
    }}>
    <a onClick={(e) => e.preventDefault()} className="dropDown">
    <img src={avatar} alt="" className="avatar" />
        <span>
        {username}
        </span>
        
        <CaretDownOutlined />
    </a>
  </Dropdown>
            </div>
            
 
        </header>
        </>
    )

}