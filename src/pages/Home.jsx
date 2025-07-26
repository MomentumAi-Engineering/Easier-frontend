 import HeroComponent from '../components/Hero';
 import AboutComponent from '../components/About';
 import VisionSection from '../components/Vision';
 import AdvanceValue from '../components/AdvanceValue';
 import Pricing from '../components/Pricing';
 const Home = () => {
    return (
       <div className='bg-black '>
          <HeroComponent />
          <AboutComponent />
          <VisionSection />
         <AdvanceValue />
         <Pricing />
       </div>
    )
}

export default Home;
