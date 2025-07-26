const PricingCard = () => {
  const plans = [
    {
      title: 'Daily Users',
      price: '$9',
      features: ['Basic analytics', 'Email support', 'Up to 3 projects'],
    },
    {
      title: 'Governments',
      price: '$29',
      features: ['Advanced analytics', 'Priority support', 'Up to 10 projects'],
    },
    {
      title: 'Local Businesses.',
      price: '$99',
      features: ['Custom analytics', '24/7 support', 'Unlimited projects'],
    },
  ];

  return (
    <div className="relative z-10 flex flex-wrap justify-center gap-8 mt-16 px-4">
      {plans.map((plan, index) => (
        <div
          key={index}
          className="w-full max-w-sm p-6 rounded-2xl bg-[#1c1c1c]/70 border border-white/10 backdrop-blur-md shadow-lg text-white transition duration-300 hover:scale-105"
        >
          <h2 className="text-2xl font-semibold mb-2 text-center">{plan.title}</h2>
          <p className="text-4xl font-bold text-center mb-4">{plan.price}<span className="text-base font-light">/mo</span></p>
          <ul className="space-y-2 text-sm">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                {feature}
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-medium">
            Choose Plan
          </button>
        </div>
      ))}
    </div>
  );
};

export default PricingCard;
