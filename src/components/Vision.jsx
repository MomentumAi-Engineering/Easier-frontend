import React from "react";

const VisionSection = () => {
  const cards = [
    {
      title: "Citizens",
      text: "Citizens don’t know who to call, reports vanish into voicemail, and fixes seem to never happen.",
    },
    {
      title: "Local Business",
      text: "Local Businesses & Trades never hear about many service needs. Warm jobs slip through the cracks, and neighborhoods miss out on fast, professional help.",
    },
    {
      title: "",
      text: "", // Placeholder card
    },
    {
      title: "Government & Crews",
      text: "Governments field mountains of phone-based 311 calls. Staff re-type the same details into multiple systems while crews wait, using hours that could be spent fixing the issues instead.",
    },
  ];

  return (
    <section className="w-full bg-black text-white py-20 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left Section */}
        <div className="lg:w-1/2 space-y-6">
          <button className="bg-white text-black px-4 py-1 text-xs rounded-full tracking-wide font-medium">
            OUR VISION
          </button>
          <h2 className="text-4xl sm:text-5xl font-semibold leading-snug">
            No hold music, <br />
            No data re-entry, <br />
            No lost opportunities.
          </h2>
          <p className="text-1xl leading-loose text-gray-300 max-w-md pt-4">
            We connect all the three groups into one Swift Flow
          </p>
        </div>

        {/* Right Section - Cards Grid */}
        <div className="lg:w-1/2 grid grid-cols-2 grid-rows-3 gap-6 relative">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`rounded-xl p-4 bg-[#0a0909] relative text-1xl font-extralight text-gray-100 flex flex-col justify-between h-60 border border-white/10 transform transition-all duration-300 hover:bg-[#1f1f1f] hover:translate-x-2 ${
                index === 2 ? "col-span-2" : ""
              }`}
            >
              <p className="mb-3">{card.text}</p>
              <p className="text-white font-medium">{card.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
