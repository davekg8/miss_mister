import React from 'react';
import { ChevronUp, ChevronDown, User, Calendar } from 'lucide-react';
import { Contestant } from '../types';

interface ContestantCardProps {
  contestant: Contestant;
  upvotes: number;
  downvotes: number;
  userVote: 'up' | 'down' | null;
  onVote: (contestantId: string, voteType: 'up' | 'down') => void;
  onOpenModal: (contestant: Contestant) => void;
}

const ContestantCard: React.FC<ContestantCardProps> = ({
  contestant,
  upvotes,
  downvotes,
  userVote,
  onVote,
  onOpenModal
}) => {
  const totalVotes = upvotes - downvotes;

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={() => onOpenModal(contestant)}
    >
      <div className="relative">
        <img
          src={contestant.photo}
          alt={contestant.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            contestant.category === 'miss'
              ? 'bg-pink-100 text-pink-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {contestant.category === 'miss' ? 'Miss' : 'Mister'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{contestant.name}</h3>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{contestant.age} ans</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{contestant.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={(e) => { e.stopPropagation(); onVote(contestant.id, 'up'); }}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                userVote === 'up'
                  ? 'bg-green-100 text-green-700 ring-2 ring-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
              }`}
            >
              <ChevronUp className="h-4 w-4" />
              <span className="text-sm font-medium">{upvotes}</span>
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); onVote(contestant.id, 'down'); }}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                userVote === 'down'
                  ? 'bg-red-100 text-red-700 ring-2 ring-red-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <ChevronDown className="h-4 w-4" />
              <span className="text-sm font-medium">{downvotes}</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4 text-gray-400" />
            <span className={`text-sm font-medium ${
              totalVotes >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {totalVotes >= 0 ? '+' : ''}{totalVotes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestantCard;