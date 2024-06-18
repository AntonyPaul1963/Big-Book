import Analytics from "../Components/Home/Analytics";
import Cards from '../Components/Home/Cards';
import Footer from '../Components/Home/Footer';
import Hero from '../Components/Home/Hero';
import Navbar from '../Components/Home/Navbar';
import Newsletter from '../Components/Home/Newsletter';

function App() {
  return (
    <div className="bg-black">
      <Navbar />
      <Hero />
      <Analytics />
      <Newsletter />
      <Cards />
      <Footer />
    </div>
  );
}

export default App;
