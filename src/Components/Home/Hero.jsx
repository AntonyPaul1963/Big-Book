import { useNavigate } from 'react-router-dom';
import { ReactTyped } from "react-typed";
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-120px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
          <div className="Head">
            GROWING WITH BIG BOOK
          </div>
        </p>
        <br />
        <br />
        <br />
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Learn From BigBook.
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            Fast, flexible learning for
          </p>
          <ReactTyped
            className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
            strings={['Students', 'Teachers', 'Research']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'></p>
        <button
          className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'
          onClick={handleGetStartedClick}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
