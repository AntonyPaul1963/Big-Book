import { User, Chats, Scroll } from 'phosphor-react';
import { useState } from 'react';

const Sidebar = () => {

  const [visible, setVisible] = useState(0);

  
  return (
    <div className="h-screen w-1/10 bg-black text-white flex flex-col items-center">
      <button className="p-4 m-2 mt-10 rounded hover:bg-gray-700">
        <User size={32} />
      </button>
      <button className="p-4 m-2 rounded-xl hover:bg-gray-700">
        <Chats size={32} />
      </button>
      <button className="p-4 m-2 rounded hover:bg-gray-700">
        <Scroll size={32} />
      </button>
    </div>
  );
}

export default Sidebar;
