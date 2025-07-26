import React, { useState } from "react";
import videoFile from "../assets/vid.mp4";

const VisionSection = () => {
  const cards = [
    {
      title: "Citizens",
      text: "Citizens don’t know who to call, reports vanish into voicemail, and fixes seem to never happen.",
      more: "Citizens often get lost in the loop of disconnected services. With no feedback loop, there's little trust or transparency about what’s happening behind the scenes.",
    },
    {
      title: "Local Business",
      text: "Local Businesses & Trades never hear about many service needs. Warm jobs slip through the cracks, and neighborhoods miss out on fast, professional help.",
      more: "Businesses lose valuable leads. Fixing local infrastructure is not only about service—it’s an opportunity for work, growth, and visibility.",
    },
    {
      title: "", // Placeholder for video
      text: "",
    },
    {
      title: "Government & Crews",
      text: "Governments field mountains of phone-based 311 calls. Staff re-type the same details into multiple systems while crews wait.",
      more: "Crews waste time waiting for clear direction. Governments suffer inefficiency and miscommunication. We solve it by streamlining the data flow.",
    },
  ];

  const [activeCard, setActiveCard] = useState(null);

  return (
    <section className="w-full bg-black text-white py-20 px-6 lg:px-16 relative">
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

       
        <div className="lg:w-1/2 grid grid-cols-2 grid-rows-3 gap-6 relative">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`rounded-xl ${index === 2 ? "p-0 overflow-hidden" : "p-4"} bg-[#0a0909] relative text-1xl font-extralight text-gray-100 flex flex-col justify-between h-60 border border-white/10 transform transition-all duration-300 hover:bg-[#1f1f1f] hover:translate-x-2 ${
                index === 2 ? "col-span-2 p-0 overflow-hidden" : ""
              }`}
            >
              {index === 2 ? (
                <video
                  src={videoFile}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <>
                  <p className="mb-3">{card.text}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-white font-medium">{card.title}</p>
                    <button
                      className="text-sm underline text-white-400"
                      onClick={() => setActiveCard(index)}
                    >
                      More
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      
      {activeCard !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-60 border border-white/10 rounded-2xl p-8 w-[90%] md:w-[600px] min-h-[300px] text-white relative shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-300 text-lg"
              onClick={() => setActiveCard(null)}
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold mb-4">
              {cards[activeCard]?.title}
            </h3>
            <p className="text-gray-200 text-md leading-relaxed">
              {cards[activeCard]?.more}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default VisionSection;
