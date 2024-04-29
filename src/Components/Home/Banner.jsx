import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import research1 from "../../Assets/Banner/research1.png"
import chatting from "../../Assets/Banner/chatting.png"
import books from "../../Assets/Banner/books.png"



export default function Banner() {
    const slides = [
        {
            url: research1,
            heading: "Your Gateway to Scholarly Excellence",
            body: "Access scholarly knowledge effortlessly - just a click away..."
        },
        {
            url: chatting,
            heading: "Engage, Collaborate, Explore: Chat in Real Time!",
            body: "Engage with peers, share insights, and explore new perspectives through real-time chat."
        },
        {
            url: books,
            heading: "Your Gateway to Boundless Information: Access Our Extensive Database!",
            body : "Delve into a rich collection of resources across various subjects and disciplines, fueling your learning journey."
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className='px-[3cm] max-w-screen-2xl h-[12.5cm] mx-auto relative group my-[1.5cm]'>
            <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12 transition-opacity duration-500 ease-in-out opacity-[${currentIndex === 0 ? '100' : '0'}">
                <div>
                    <img className='' src={slides[currentIndex].url} />
                </div>
                <div className='md:w-1/2'>
                    <h1 className='text-5xl font-semibold mb-4 text-violet-800 leading-snug -my-[1cm]'>
                    {slides[currentIndex].heading}
                    </h1>   
                    <p className='text-slate-600 text-lg'>
                        {slides[currentIndex].body}
                    </p>
                </div>
            </div>
            {/* Left Arrow */}
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            {/* Right Arrow */}
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
        </div>
    );
}
