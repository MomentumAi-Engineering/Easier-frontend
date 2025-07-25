 import HeroComponent from '../components/Hero';
 import AboutComponent from '../components/About';
 import VisionSection from '../components/Vision';
 import AdvanceValue from '../components/AdvanceValue';
 const Home = () => {
    return (
       <div className='bg-black '>
          <HeroComponent />
          <AboutComponent />
          <VisionSection />
         <AdvanceValue />
       </div>
    )
}

export default Home;
