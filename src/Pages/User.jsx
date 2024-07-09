import { Scroll, BookOpen } from 'phosphor-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from "../Components/Search/Search";
import logo from '../Assets/small-logo.png';
import botIcon from '../Assets/bot-svgrepo-com.svg';
import Summary from '../Components/Summary/Summary';
import ChatBot from '../Components/ChatBot/ChatBot';

const Sidebar = () => {

  const [visible, setVisible] = useState(0);

  return (
    <div className='w-screen h-screen flex'>
      <div className="h-screen w-1/20 bg-black text-white flex flex-col items-center">
        <div className="mt-3 mr-4">
          <Link to="/" className="mt-10">
            <img src={logo} alt="Logo" className="p-4 m-2 rounded-xl hover:bg-gray-700" />
          </Link>
        </div>
        <button className="p-4 m-2 rounded-xl hover:bg-gray-700" onClick={() => setVisible(2)}>
          <Scroll size={32} />
        </button>
        <button className="p-4 m-2 rounded-xl hover:bg-gray-700" onClick={() => setVisible(3)}>
          <BookOpen size={32} />
        </button>
        <button className="p-4 m-2 rounded-xl hover:bg-gray-700" onClick={() => setVisible(4)}>
          <img src={botIcon} alt="Bot" className="w-8 h-8" />
        </button>
      </div>
      <div className="h-screen w-19/20 bg-gray-100">
        {visible === 2 && <Search />}
        {visible === 3 && <Summary />}
        {visible === 4 && <ChatBot />}
      </div>
    </div>
  );
}

export default Sidebar;
