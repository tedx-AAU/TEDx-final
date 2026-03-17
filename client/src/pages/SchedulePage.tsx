
import React from 'react';
import { SCHEDULE } from '../../constants';

const SchedulePage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-20 pb-32 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
        <h2 className="text-red-600 font-oswald text-xl font-bold tracking-[0.5em] uppercase mb-4">The Journey</h2>
        <h1 className="text-6xl md:text-8xl font-oswald font-extrabold tracking-tight">EVENT <span className="text-red-600">PATHWAY</span></h1>
        <p className="mt-8 text-gray-400 max-w-2xl mx-auto text-xl font-light">
          Follow the wavy path of innovation. Each milestone represents a crossing into new territory.
        </p>
      </div>

      <div className="relative timeline-container wavy-line-bg max-w-[1000px] mx-auto py-20">
        <div className="space-y-0">
          {SCHEDULE.map((item, index) => {
            // Distribution pattern logic from the provided design
            const patternIndex = index % 4;
            let bubblePosition = "";
            
            if (patternIndex === 0) bubblePosition = "left-[10%] md:left-[15%]";
            if (patternIndex === 1) bubblePosition = "right-[10%] md:right-[15%]";
            if (patternIndex === 2) bubblePosition = "left-[20%] md:left-[25%]";
            if (patternIndex === 3) bubblePosition = "right-[20%] md:right-[25%]";

            return (
              <div key={index} className="relative w-full h-[280px] flex items-center justify-center z-10">
                <div 
                  className={`absolute w-[180px] h-[180px] md:w-[220px] md:h-[220px] bg-red-600 rounded-full flex flex-col items-center justify-center text-center p-6 shadow-[0_0_40px_rgba(235,0,40,0.4)] border-2 border-white/10 transition-all duration-500 hover:scale-110 hover:shadow-[0_0_60px_rgba(235,0,40,0.8)] hover:border-white animate-bubble cursor-default group ${bubblePosition}`}
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <span className="text-[10px] font-bold text-white/60 tracking-[0.3em] uppercase mb-2">
                    {item.time}
                  </span>
                  <h3 className="text-base md:text-xl font-oswald font-bold leading-tight uppercase group-hover:scale-105 transition-transform">
                    {item.title}
                  </h3>
                  <p className="text-[10px] md:text-xs mt-3 leading-relaxed text-white/80 font-medium px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                  
                  {/* Speaker Hint Icon if speaker exists */}
                  {item.speakerId && (
                    <div className="absolute -bottom-2 -right-2 bg-white text-black p-2 rounded-full shadow-lg">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Visual Endcap */}
      <div className="max-w-7xl mx-auto px-4 text-center mt-20 relative z-20">
         <div className="w-12 h-12 bg-red-600 rounded-full mx-auto animate-ping opacity-20" />
         <p className="text-gray-600 text-xs font-bold tracking-widest mt-8 uppercase">End of Journey</p>
      </div>
    </div>
  );
};

export default SchedulePage;
