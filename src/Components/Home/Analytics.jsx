import laptop from "../../Assets/Books.jpg";
import './Analytics.css';
const Analytics = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={laptop} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold '>RESEARCH ANALYTICS DASHBOARD</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Manage Research Analytics Centrally</h1>
          <p className="Text">
            Bigbook provides an platform for accessing the latest research papers, journals, thesis etc with the aid of an integrated AI for generating an bonafide summary for your selected research papers.
            The users can interact with the most prominant research scholar within each field of interest and share your thoughts and ideas.
          </p>
          <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
