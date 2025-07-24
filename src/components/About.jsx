export default function AboutComponent() {
  return (
    <div className="bg-black text-white px-4 py-16 flex flex-col items-center text-center">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-semibold mb-2">What sets Snapfix Apart?</h2>
      <p className="text-gray-300 max-w-xl mb-10">
        From snap to submitted report. AI tags and auto-routes issues. Zero cost to report or track.
      </p>

      {/* Card */}
      <div className="bg-[#1C1C1C] rounded-2xl w-full max-w-md divide-y divide-white/30">
        {/* First Item */}
        <div className="py-6 px-8">
          <p className="text-xl font-medium mb-1">&lt;30sec</p>
          <p className="text-sm text-gray-200">From snap to submitted report.</p>
        </div>

        {/* Second Item */}
        <div className="py-6 px-8">
          <p className="text-xl font-medium mb-1">&gt;95% Accuracy</p>
          <p className="text-sm text-gray-200">AI tags & auto-routes issues.</p>
        </div>

        {/* Third Item */}
        <div className="py-6 px-8">
          <p className="text-xl font-medium mb-1">🐝 Free for Citizens</p>
          <p className="text-sm text-gray-200">Zero cost to report or track.</p>
        </div>
      </div>
    </div>
  );
}
