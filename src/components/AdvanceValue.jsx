import React from 'react';
import { CiMap } from "react-icons/ci";
import { LuBrain } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";
import { FaRegHandshake } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { MapPin, Search, Ticket, Users, Lock } from 'lucide-react';

const AdvanceValue = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      
     
      
      {/* Main Content */}
      <div className="px-8 py-10">
        {/* Title Section */}
        <div className="mb-20">
          <h1 className="text-6xl font-bold mb-8 text-center leading-tight">
            Our Intelligent<br />
            Features Suite
          </h1>
          <p className="text-lg text-white max-w-sm leading-relaxed text-center">
            A unified AI built to streamline workflows,<br />
            reduce manual effort, enhance data accuracy,<br />
            and empower teams to operate at peak
            efficiency.
          </p>
        </div>

        
        <div className="flex max-w-7xl mx-auto">
          {/* Left Vertical Divider */}
          <div className="w-px bg-gray-700 mr-12 h-110"></div>
          
          {/* Left Column */}
          <div className="flex-1 pr-12">
          
            <div className="mb-16">
              <div className="w-10 h-8  rounded mb-4">
                <CiMap size={30} className="m-1" color="white" />
              </div>

              <h3 className="text-xl font-medium mb-4">Auto-Geo Pin</h3>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                GPS tags every report— In most<br />
                cases you won't need to address<br />
                entry
              </p>
            </div>

            
            <div>
              <div className="w-10 h-8  rounded mb-4">
                <FaRegHandshake size={30} className="m-1" color="white" />
              </div>
              <h3 className="text-xl font-medium mb-4">Lead Marketplace</h3>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                Trades receive matching job alerts,<br />
                quote in-app.
              </p>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-px bg-gray-700 mx-12 h-110"></div>

          {/* Middle Column */}
          <div className="flex-1 px-12">
            {/* AI Issue Detection */}
            <div className="mb-16">
              <div className="w-10 h-8  rounded mb-4">
                <LuBrain size={30} className="m-1" color="white" />
              </div>
              <h3 className="text-xl font-medium mb-4">AI Issue Detection</h3>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                Recognizes hundreds of issue<br />
                types and created tailored<br />
                reports.
              </p>
            </div>

            {/* Private Chat */}
            <div>
              <div className="w-10 h-8  rounded mb-4">
                <CiLock size={30} className="m-1" color="white" />
              </div>
              <h3 className="text-xl font-medium mb-4">Private Chat</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                Secure messaging between
                reporter, crew, and (when
                opted-in) contractor.
              </p>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-px bg-gray-700 mx-12 h-110"></div>

          {/* Right Column */}
          <div className="flex-1 pl-12">
            {/* One Tap Ticketing */}
            <div>
              <div className="w-10 h-8  rounded mb-4">
                <IoMdSend size={30} className="m-1" color="white" />
              </div>
              <h3 className="text-xl font-medium mb-4">One Tap Ticketing</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                Structured reports land in the right<br />
                inbox/system.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent mt-20  via-gray-400 to-transparent"></div>
      
    </div>
    
  );
};

export default AdvanceValue;
