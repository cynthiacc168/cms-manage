import React ,{useEffect, useState}from "react";
import { PageHeader, Button, Modal, Form, Input, message } from 'antd';
import moment from "moment";
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import '@wangeditor/editor/dist/css/style.css'
import {AddArticleApi} from '../request/api'
import { useParams } from "react-router-dom";

export default function Edit(){

    const [editor, setEditor] = useState(null)
    const [html, setHtml] = useState('Please insert your first word.')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const {id} = useParams();

    //ask for article data
    // useEffect(() => {
    //     setTimeout(() => {
    //         setHtml('<p>hello world</p>')
    //     }, 1500)
    // }, [])


    //destory
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])


    const showModal = () => {
        setIsModalOpen(true);
    };

      const handleOk = () => {

        form
        .validateFields()
        .then((values) => {
          form.resetFields();
          //send request
          AddArticleApi({title:values.title,subTitle:values.subtitle, content:html})
          .then(res=>{
            if(res.errCode === 0){
                message.success('Your article has been added.');
                setIsModalOpen(false);
            }else{
                message.error(res.message);
            }
          })

        
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });

      };

      const handleCancel = () => {
        setIsModalOpen(false);
      };

      //form
      const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    

    return(
        <>
        <PageHeader
    className="site-page-header"
    onBack={id?() =>  window.history.back():null}
    title="Edit Your Article"
    subTitle={moment(new Date()).format('YYYY-MM-DD')}
    extra={
        <Button key="1" type="primary" onClick={showModal}>
          Save and Sumbit
        </Button>
      }
  />
  <div style={{padding:'0 20px'}}>
  <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
    </div>

    <div>
    <Modal title="Name your article" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  okText="Submit"
        cancelText="Canel">

<Form
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 24,
      }}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input your title.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Subtitle"
        name="subtitle"
        rules={[
          {
            required: false,
            message: 'Please input your subtitle.',
          },
        ]}
      >
        <Input/>
      </Form.Item>
    </Form>

      </Modal>

    </div>
    
  </div>
  

        </>
    )
}