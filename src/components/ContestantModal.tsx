import React from 'react';
import { Contestant } from '../types';
import { X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface ContestantModalProps {
  contestant: Contestant | null;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

const ContestantModal: React.FC<ContestantModalProps> = ({ contestant, onClose, onNext, onPrevious, hasNext, hasPrevious }) => {
  if (!contestant) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Previous Button */}
      {hasPrevious && (
        <button 
          onClick={(e) => { e.stopPropagation(); onPrevious(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 text-gray-800 transition-all z-50"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      <div 
        className="bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-white/20 backdrop-blur-xl grid md:grid-cols-2"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="relative bg-black/10">
          <img
            src={contestant.photo}
            alt={contestant.name}
            className="w-full h-full max-h-[80vh] object-contain"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/50 rounded-full p-1.5 text-white hover:bg-black/70 transition-all md:hidden"
          >
            <X size={20} />
          </button>
        </div>
        <div className="relative flex flex-col p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white hidden md:block"
          >
            <X size={24} />
          </button>
          <div className="flex-grow">
            <p className="text-lg text-purple-600 dark:text-purple-400 capitalize font-semibold mb-2">{contestant.category}</p>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{contestant.name}</h2>
            
            <div className="flex items-center text-gray-700 dark:text-gray-300 mb-6">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{contestant.age} ans</span>
            </div>

            <div className="border-t border-gray-300/50 dark:border-gray-600/50 my-4"></div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">À propos</h3>
            <p className="text-md text-gray-800 dark:text-gray-200 leading-relaxed">{contestant.description}</p>
          </div>
        </div>
      </div>

      {/* Next Button */}
      {hasNext && (
        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 text-gray-800 transition-all z-50"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
};

export default ContestantModal;
