 import HeroComponent from '../components/Hero';
 import AboutComponent from '../components/About';
 import VisionSection from '../components/Vision';
 const Home = () => {
    return (
       <div className='bg-black '>
          <HeroComponent />
          <AboutComponent />
          <VisionSection />
       </div>
    )
}

export default Home;
