import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-5xl font-oswald font-bold mb-10">
            What is <span className="text-red-600">TEDx</span>?
          </h2>
          <div className="space-y-8 text-gray-400 leading-relaxed text-xl font-light">
            <p>
              In the spirit of ideas worth spreading, TED created TEDx — local,
              self-organized events that bring people together to share a
              TED-like experience.
            </p>
            <p>
              At <strong>TEDxAmman Arab University</strong>, live speakers and deep
              discussion combine to spark connection at the intersection of
              history and innovation.
            </p>
            <p>
              Located at the gateway between worlds, our theme{' '}
              <span className="text-white font-semibold">"Maybe You?"</span>{' '}
              represents the birthplace of new perspectives.
            </p>
          </div>
          <div className="mt-14 flex flex-wrap gap-12">
            <div className="text-left">
              <span className="block text-5xl font-bold text-white mb-1">
                10
              </span>
              <span className="text-xs text-red-600 uppercase tracking-widest font-bold">
                Global Speakers
              </span>
            </div>
            <div className="text-left border-l border-white/10 pl-12">
              <span className="block text-5xl font-bold text-white mb-1">
                500+
              </span>
              <span className="text-xs text-red-600 uppercase tracking-widest font-bold">
                Attendees
              </span>
            </div>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="aspect-square rounded-3xl overflow-hidden border-4 border-white/5 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="TEDx Atmosphere"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-red-600 text-white p-10 rounded-2xl shadow-2xl max-w-sm hidden md:block border border-white/10">
            <p className="text-2xl font-bold italic leading-tight mb-2">
              "Ideas that bridge the straits of the mind."
            </p>
            <p className="text-sm opacity-70 uppercase tracking-widest font-bold">
              — Curator’s Note
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
