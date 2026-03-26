import React from 'react';
import { SPEAKERS } from '../../constants';

interface SpeakersProps {
  onSeeAll: () => void;
}

const Speakers: React.FC<SpeakersProps> = ({ onSeeAll }) => {
  const preview = SPEAKERS.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h2 className="text-red-600 font-oswald text-lg font-bold tracking-widest uppercase mb-4">
          Lineup
        </h2>
        <h3 className="text-5xl font-oswald font-bold">
          Featured <span className="text-red-600">Speakers</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {preview.map((speaker) => (
          <div
            key={speaker.id}
            className="group p-8 bg-zinc-900/50 border border-white/5 rounded-3xl hover:border-red-600/50 transition-all"
          >
           <p className="text-red-500 font-bold uppercase tracking-widest text-[10px] mb-2">
              {speaker.category}
            </p>
            <h4 className="text-3xl font-oswald font-bold text-white mb-2">
              {speaker.name}
            </h4>
            <p className="text-xl text-gray-400 font-light italic leading-snug">
              "{speaker.speechTitle}"
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button
          onClick={onSeeAll}
          className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-full font-bold text-lg transition-all"
        >
          View All Speakers & Profiles
        </button>
      </div>
    </div>
  );
};

export default Speakers;
