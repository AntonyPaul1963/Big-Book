import { User, Chats, Scroll } from 'phosphor-react';
import { useState } from 'react';
import ChatWindow from "../Components/Chatting/ChatWindow";
import Dashboard from "../Components/Dashboard/Dashboard";
import Search from "../Components/Search/Search";

const Sidebar = () => {

  const [visible, setVisible] = useState(0);

  return (
    <div className='w-screen h-screen flex'>
      <div className="h-screen w-1/20 bg-black text-white flex flex-col items-center">
        <button className="p-4 m-2 mt-10 rounded hover:bg-gray-700" onClick={() => setVisible(0)}>
          <User size={32} />
        </button>
        <button className="p-4 m-2 rounded-xl hover:bg-gray-700" onClick={() => setVisible(1)}>
          <Chats size={32} />
        </button>
        <button className="p-4 m-2 rounded hover:bg-gray-700" onClick={() => setVisible(2)}>
          <Scroll size={32} />
        </button>
      </div>
      <div className="h-screen w-19/20 bg-gray-100">
        {visible === 0 && <Dashboard />}
        {visible === 1 && <ChatWindow />}
        {visible === 2 && <Search />}
      </div>
    </div>
  );
}

export default Sidebar;
