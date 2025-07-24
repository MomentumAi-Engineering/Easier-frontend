export default function AboutComponent() {
  return (
    <div className="bg-black text-white px-4 py-40 flex flex-col items-center text-center">
      {/* Heading */}
      <h2 className="text-5xl  font-mono mb-2">One plans, constant updates</h2>
      <p className="text-gray-300 text-1xl font-medium text-gray-400 w-90 mt-5 mb-10">
        From snap to submitted report. AI tags and auto-routes issues. Zero cost to report or track.
      </p>

      {/* Card */}
      <div className="bg-[#090909] rounded-2xl w-140 h-120  border border-white/10 hover:opacity-70">
        {/* First Item */}
        <div className="py-16 px-6">
          <p className="text-5xl font-stretch-50% mb-1 ">&lt;30 sec</p>

           <div className="flex items-center gap-4 pt-3">
             <div className="flex-1 h-px bg-gray-600 opacity-60"></div>
               <p className="text-xs font-semibold text-gray-200 whitespace-nowrap">FROM SNAP TO SUBMITTED REPORT.</p>
             <div className="flex-1 h-px bg-gray-600 opacity-60"></div>
            </div>
        </div>

        {/* Second Item */}
        <div className="py-0 px-8">
          <p className="text-5xl font-stretch-50% mb-1"> &gt;95% Accuracy</p>

           <div className="flex items-center gap-4 pt-3">
               <div className="flex-1 h-px bg-gray-600 opacity-60"></div>
                  <p className="text-xs font-semibold text-gray-200 whitespace-nowrap">AI TAGS AND AUTO ROUTES ISSUES.</p>
               <div className="flex-1 h-px bg-gray-600 opacity-60"></div>
           </div>
        </div>

        {/* Third Item */}
        <div className="py-16 px-6">
        <p className="text-4xl font-stretch-50% mb-1">Free For Citizens</p>
        
        <div className="flex items-center gap-4 pt-3">
          <div className="flex-1 h-px bg-gray-600 opacity-60"></div>
          <p className="text-xs font-semibold text-gray-200 whitespace-nowrap">ZERO COST TO REPORT OR TRACK.</p>
          <div className="flex-1 h-px bg-gray-600 opacity-60"></div>
        </div>
       </div>

      </div>

       <h2 className="text-3xl  font-light mb-2 mt-20 w-70">Free Service because we've been there</h2>
      <p className="text-gray-300 text-1xl font-medium text-gray-400 w-130 mt-3 mb-10">
       Its fast, 0.5-minute photo reports streamline issue reporting with efficiency and clarity.
       Residents stay informed with live updates.
      </p>


      <div className="w-full h-[2px] bg-gradient-to-r from-transparent mt-30 via-gray-400 to-transparent"></div>

    </div>
  );
}
