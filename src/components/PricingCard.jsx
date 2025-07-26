const PricingCard = () => {
  return (
    <div className="relative z-10 flex flex-wrap justify-center gap-8 mt-16 px-4">
      
      {/* Daily Users Card */}
      <div className="w-full max-w-sm p-6 rounded-2xl bg-[#1c1c1c]/70 border border-white/10 backdrop-blur-md shadow-lg text-white transition duration-300 hover:scale-105">
        <h2 className="text-2xl font-semibold mb-2 text-center">Daily Users</h2>
        <p className="text-4xl font-bold text-center mb-4">$9<span className="text-base font-light">/mo</span></p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span>Basic analytics</li>
          <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span>Email support</li>
          <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span>Up to 3 projects</li>
        </ul>
        <button className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-medium">
          Choose Plan
        </button>
      </div>

      {/* Governments Card */}
      <div className="w-full max-w-sm p-6 rounded-2xl bg-[#1c1c1c]/70 border border-white/10 backdrop-blur-md shadow-lg text-white transition duration-300 hover:scale-105">
        <h2 className="text-2xl font-semibold mb-2 text-center">Governments</h2>
        <p className="text-4xl font-bold text-center mb-4">$2000<span className="text-base font-light">/mo</span></p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span>Advanced analytics</li>
          <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span>Priority support</li>
          <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span>Up to 10 projects</li>
        </ul>
        <button className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-medium">
          Choose Plan
        </button>
      </div>

      {/* Local Businesses Card */}
      <div className="w-full max-w-sm p-6 rounded-2xl bg-[#1c1c1c]/70 border border-white/10 backdrop-blur-md shadow-lg text-white transition duration-300 hover:scale-105">
        <h2 className="text-2xl font-semibold mb-2 text-center">Local Businesses.</h2>
        <p className="text-4xl font-bold text-center mb-4">$79<span className="text-base font-light">/mo</span></p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span>Unlimited leads</li>
          <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span>Dashboard</li>
          <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span>Unlimited projects</li>
        </ul>
        <button className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-medium">
          Choose Plan
        </button>
      </div>

    </div>
  );
};

export default PricingCard;
