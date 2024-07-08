import Scrollbars from "react-custom-scrollbars-2";
import Analytics from "../Components/Home/Analytics";
import Cards from '../Components/Home/Cards';
import Footer from '../Components/Home/Footer';
import Hero from '../Components/Home/Hero';
import Navbar from '../Components/Home/Navbar';
import Newsletter from '../Components/Home/Newsletter';
import { Box } from '@mui/system';

export default function Home() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        width: '100%', 
        height: '100vh',  // Full viewport height
        flexGrow: 1, 
        backgroundColor: "black" 
      }}
    >
      <Scrollbars style={{ width: '100%', height: '100%' }} autoHide>
        <Navbar />
        <Hero />
        <Analytics />
        <Newsletter />
        <Cards />
        <Footer />
      </Scrollbars>
    </Box>
  );
}