import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const GeminiIdeaGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const generateIdea = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setSuggestion(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am an attendee at TEDxJabal Tareq. The event theme is "The Crossing", focused on connection, bridge-building, and new beginnings. Generate a compelling TED Talk title and a 3-sentence summary based on this specific topic: "${topic}". Make it sound inspiring, like a real TED Talk.`,
        config: {
          temperature: 0.8,
          maxOutputTokens: 300,
        },
      });

      setSuggestion(
        response.text || 'Sorry, I could not generate an idea at this time.'
      );
    } catch (error) {
      console.error('Gemini error:', error);
      setSuggestion('Error generating content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-oswald font-bold mb-4">
              Explore the <span className="text-red-600">Future</span> of Ideas
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Have a vague interest? Let our AI-powered{' '}
              <strong>Idea Bridge</strong> (powered by Gemini) help you discover
              a talk that could exist at TEDxJabal Tareq.
            </p>

            <div className="flex flex-col space-y-4">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic (e.g., Space Travel, Kindness, Biohacking...)"
                className="bg-gray-800 border border-gray-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
              />
              <button
                onClick={generateIdea}
                disabled={loading}
                className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Synthesizing...
                  </>
                ) : (
                  'Cross the Idea Bridge'
                )}
              </button>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="bg-black/50 border border-white/10 rounded-2xl p-6 min-h-[250px] flex flex-col items-center justify-center relative overflow-hidden">
              {!suggestion && !loading && (
                <div className="text-center text-gray-600 italic">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 opacity-20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                  Your generated idea will appear here...
                </div>
              )}
              {loading && (
                <div className="space-y-4 w-full">
                  <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-800 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-800 rounded animate-pulse w-5/6 mx-auto"></div>
                </div>
              )}
              {suggestion && (
                <div className="animate-fadeIn">
                  <div className="inline-block bg-red-600/20 text-red-500 text-[10px] font-bold uppercase px-2 py-1 rounded mb-4">
                    AI Generated Prototype
                  </div>
                  <div className="text-white text-lg leading-relaxed whitespace-pre-wrap font-serif italic text-center">
                    "{suggestion}"
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiIdeaGenerator;
