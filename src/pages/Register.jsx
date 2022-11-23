import React from "react";
import './less/Login.less'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import logoImg from "../assests/logo.png"
import {Link, useNavigate} from "react-router-dom";
import { RegisterApi } from "../request/api";


export default function Register(){

    const navigate = useNavigate()

    const onFinish = (values) => {
        RegisterApi({
            username:values.username,
            password:values.password
        }).then(res=>{
            console.log(res);
            if(res.errCode === 0){
                //promt
                success()
                //to login page
                setTimeout(()=>navigate('/login'),1200)
            }
            else{
                error()
            }
        })
      };

      const [messageApi, contextHolder] = message.useMessage();
      const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Register succeed!',
        });
      };

      const error = () => {
        messageApi.open({
          type: 'error',
          content: 'User already exist.',
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

                    <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password size="large" placeholder="Comfirm Password" prefix={<LockOutlined />}/>
      </Form.Item>

                    <Form.Item>
                        <Link to="/login">Already have an account? Login</Link>
                    </Form.Item>

                    <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" block>
                            Register
                            </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}