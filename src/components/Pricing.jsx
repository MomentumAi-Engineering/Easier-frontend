import PricingCard from './PricingCard';

const Pricing = () => {
  return (
   <div className="relative min-h-screen bg-black overflow-hidden">
  {/* Centered glow effect */}
  <div className="absolute w-130 h-130 mt-30 bg-gray-400/20 rounded-full blur-[140px] z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

  <div className="relative z-10 flex flex-col items-center justify-start pt-20">
    <h1 className="text-5xl text-center text-amber-50 font-sans leading-tight">
      Simple Pricing
    </h1>
    <p className="text-white text-m pt-10 font-light max-w-md text-center mt-4">
      Collaborate, automate, and innovate with plans designed to meet every need.
    </p>
  </div>

  <PricingCard />
</div>

  );
};

export default Pricing;
