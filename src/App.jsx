import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"
import User from "./Pages/User"
import Chats from "./Pages/Chats";
import "../src/App.css"


export default function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/'element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/user' element={<User/>} />
          <Route path='/user/chats' element={<Chats/>} />
        </Routes>
    </div>
  );
}


