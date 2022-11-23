import React from "react";
import './less/Login.less'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import logoImg from "../assests/logo.png"
import {Link, useNavigate} from "react-router-dom";
import { LoginApi } from "../request/api";

export default function Login(){

    const navigate = useNavigate()

    const onFinish = (values) => {
        console.log('Success:', values);
        //sending request
        LoginApi({
            username:values.username, 
            password:values.password
        }).then(res=>{
            console.log(res)
            if(res.errCode ===0 ){
            //promt
            success()
            //localStorage
            localStorage.setItem('avatar',res.data.avatar)
            localStorage.setItem('cms-token',res.data['cms-token'])
            localStorage.setItem('editable',res.data.editable)
            localStorage.setItem('role',res.data.player)
            localStorage.setItem('username',res.data.username)
            //to home
            setTimeout(()=>navigate('/'),1200)

            }else{
                error()
            }
        }   
        )
      };

      const [messageApi, contextHolder] = message.useMessage();
      const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Login succeed!',
        });
      };

      const error = () => {
        messageApi.open({
          type: 'error',
          content: 'Wrong username or password.',
        });
      };


    return(
        <div className="login">
            {contextHolder}
            <div className="login-block">
                <img src={logoImg} alt="logo" />
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                    >
                        <Input size="large" placeholder="Username" prefix={<UserOutlined />}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password size="large" placeholder="Password" prefix={<LockOutlined />}/>
                    </Form.Item>

                    <Form.Item>
                        <Link to="/register">Register Now!</Link>
                    </Form.Item>

                    <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" block>
                            Login
                            </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}