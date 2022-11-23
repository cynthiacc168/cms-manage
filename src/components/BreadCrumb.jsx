import { Breadcrumb } from "antd";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';


export default function BreadCrumb(){

    const [key, setKey] = useState('')
    const {pathname} = useLocation()

    //listen to pathname's change
    useEffect(()=>{
        switch (pathname){
            case "/list":
                setKey('Articles')
                break;
            case "/edit":
                setKey('Edit Article')
                break;
            case "/profile":
                setKey('Edit Profile')
                break;
            default:
                break;
        }
        
         
    },[pathname])

    return(
        <Breadcrumb  className="breadCrumb">
    <Breadcrumb.Item href="/">
      <HomeOutlined />
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <span>{key}</span>
    </Breadcrumb.Item>
  </Breadcrumb>
    )
}