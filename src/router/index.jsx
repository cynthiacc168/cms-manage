import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App"
import List from "../pages/List"
import Edit from "../pages/Edit"
import Profile from "../pages/Profile"
import Login from "../pages/Login"
import Register from "../pages/Register"

const baseRoute = () => (
    <Router>
        <Routes>
            <Route path="/" element={<App/>}>
            <Route path="/edit" element={<Edit/>}></Route>
            <Route path="/list" element={<List/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            </Route>
            <Route path="/Login" element={<Login/>}></Route>
            <Route path="/Register" element={<Register/>}></Route>
        </Routes>
    </Router>
)

export default baseRoute;
