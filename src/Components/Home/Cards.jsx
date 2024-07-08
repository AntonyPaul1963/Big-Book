import { Carousel } from 'react-responsive-carousel';
import AI from '../../Assets/AI.webp';
import Edu from '../../Assets/edu.jpg';
import Chat from '../../Assets/chat.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import './Cards.css';

const ImageCarousel = () => {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
                <div>
                    <img className="Edu" src={Edu} alt="First slide" />
                    <p className="legend">FREE ACCESS TO TOP JOURNALS,RESEARCH PAPERS ACROSS DIFFERENT UNIVERSITIES ALL OVER THE WORLD</p>
                </div>
                <div>
                    <img className='AI' src={AI} alt="Second slide" />
                    <p className="legend">INTEGRATED AI ASSISTANCE FOR THE GENERATION OF SUMMARY</p>
                </div>
                <div>
                    <img className='Chat' src={Chat} alt="Third slide" />
                    <p className="legend">INTERACTIVE CHAT FEATURE</p>
                </div>
            </Carousel>
        </div>
    );
};

export default ImageCarousel;

