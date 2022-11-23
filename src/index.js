import ReactDOM from 'react-dom';
import Router from './router';
import './assests/base.less'


ReactDOM.render( <
    Router / > ,
    document.getElementById('root')
)

//react 18
// import { createRoot } from 'react-dom/client'
// const root = createRoot(document.getElementById('root'));
// root.render( < App /> );