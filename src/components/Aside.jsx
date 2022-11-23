import { Menu } from 'antd';
import{BookOutlined, EditOutlined, AuditOutlined} from '@ant-design/icons'
import { useNavigate, useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react'


export default function Aside(){

    const navigate = useNavigate()
    const [key, setKey] = useState('')
    const location = useLocation()
    
    //highlight after mounted
    useEffect(()=>{
        const currentKey = location.pathname.split('/')[1]
        setKey(currentKey)
    },[])

    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }
      const items = [
        getItem('View Articals', 'list',<BookOutlined />),
        getItem('Edit Artical', 'edit',<EditOutlined />),
        getItem('Edit Profile', 'profile', <AuditOutlined />),
      ];


      const onClick = (e) => {

        //highlight after click
        const currentKey = e.key
        setKey(currentKey)
        navigate('/'+currentKey)

      };

    return(
        <Menu
      onClick={onClick}
      theme="dark"
      selectedKeys={[key]}
      mode="inline"
      items={items}
      className="aside"
    />
    )

}