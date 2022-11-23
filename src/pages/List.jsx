import React, {useState, useEffect}from "react";
import { Space, Table, Button} from 'antd';
import { ListApi } from "../request/api";
import moment from "moment";

export default function List(){

    //data
    const [data, setData] = useState("")

      useEffect(()=>{
        ListApi().then(res=>{
            if(res.errCode === 0){
                const copyData = JSON.parse(JSON.stringify(res.data.arr))
                const newData = copyData.map((value)=>{
                   return {
                    key: value.id,
                    title: {title:value.title,  subtitle: value.subTitle, id:value.id},
                    date: moment(value.date).format('YYYY MM DD hh:mm:ss')
                   }
                })
                setData(newData)
            }         
        })

      },[])

    const columns = [
        {
          dataIndex: 'title',
          key: 'title',
          width:'70%',
          render: (value) => (
            <>
            <h4><a href={"http://47.93.114.103:6688/manage/article/"+value.id} className="table-link">{value.title}</a></h4>
            <h5>{value.subtitle}</h5>
            </>
          ),
        },
        {
          dataIndex: 'date',
          key: 'date',
          width:'20%',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <Button type="primary" onClick={()=>console.log(record.key)}>EDIT</Button>
              <Button type="danger" onClick={()=>console.log(record.key)}>DELETE</Button>
            </Space>
          ),
        },
      ];

    return(
        <Table showHeader={false}columns={columns} dataSource={data}/>
    )
}