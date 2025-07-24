import React from 'react';
import pic1 from '../assets/pic1.avif';
import pic2 from '../assets/pic2.avif';

// Vertical Carousel Component
const VerticalCarousel = () => {
  const cards = [
    {
      id: 1,
      image: pic1,
    },
    {
      id: 2,
      image: pic2,
      
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    }
  ];

  // Duplicate cards for seamless loop
  const allCards = [...cards, ...cards];

  const Card = ({ card }) => (
    <div className="relative h-80 flex-shrink-0 mb-3 mx-2">
      <div className="relative h-full w-64 rounded-2xl overflow-hidden shadow-xl border-2 border-gray-700">
        <img 
          src={card.image} 
          alt="Card image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-hidden py-12">
      <div 
        className="flex flex-col animate-scroll"
        style={{
          height: `${allCards.length * 100}px`
        }}
      >
        {allCards.map((card, index) => (
          <Card key={`${card.id}-${index}`} card={card} />
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

// Main Hero Component
export default function HeroComponent() {
  return (
    <div className="min-h-screen bg-black text-white flex p-8 relative">
      {/* Left side - Main content */}
      <div className="flex-1 flex flex-col justify-between pr-8 pl-12">
        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-4xl">
            <h1 className="text-8xl font-medium leading-tight mb-8">
              <div className="mb-4">See It</div>
              <div className="mb-4">Snap It</div>
              <div>Send It</div>
            </h1>
                     
            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
              A single photo turns any neighborhood problem—pothole, broken street light, water 
              leak—into a routed, trackable work order in under seconds
            </p>
          </div>
        </div>

      {/* Centered Button - Absolute positioning */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <button className="bg-gray-200 text-black px-6 py-3 rounded-full text-md font-medium hover:bg-gray-300 transition-colors pointer-events-auto">
          Report issue ➔
        </button>
      </div>

      {/* Privacy text - Bottom center */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <p className="text-sm text-gray-400">
          Privacy-first: your report is visible only to the crew that fixes it.
        </p>
      </div>
      </div>

      {/* Right side - Vertical Carousel */}
      <div className="w-80 h-screen">
        <VerticalCarousel />
      </div>
    </div>
  );
}