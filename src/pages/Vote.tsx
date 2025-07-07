import React, { useState } from 'react';
import { Filter, Trophy, Users } from 'lucide-react';
import { useVoting } from '../hooks/useVoting';
import { useContestants } from '../hooks/useContestants';
import ContestantCard from '../components/ContestantCard';
import ContestantModal from '../components/ContestantModal';
import { Contestant } from '../types';

const Vote: React.FC = () => {
  const { voteData, vote } = useVoting();
  const { contestants, loading, error } = useContestants();
  const [filter, setFilter] = useState<'all' | 'miss' | 'mister'>('all');
  const [selectedContestant, setSelectedContestant] = useState<Contestant | null>(null);

  const handleOpenModal = (contestant: Contestant) => {
    setSelectedContestant(contestant);
  };

  const handleCloseModal = () => {
    setSelectedContestant(null);
  };

  const filteredContestants = contestants.filter(contestant => 
    filter === 'all' || contestant.category === filter
  );

  const handleNextContestant = () => {
    if (!selectedContestant) return;
    const currentIndex = filteredContestants.findIndex(c => c.id === selectedContestant.id);
    const nextIndex = (currentIndex + 1) % filteredContestants.length;
    setSelectedContestant(filteredContestants[nextIndex]);
  };

  const handlePreviousContestant = () => {
    if (!selectedContestant) return;
    const currentIndex = filteredContestants.findIndex(c => c.id === selectedContestant.id);
    const previousIndex = (currentIndex - 1 + filteredContestants.length) % filteredContestants.length;
    setSelectedContestant(filteredContestants[previousIndex]);
  };

  const currentIndex = selectedContestant ? filteredContestants.findIndex(c => c.id === selectedContestant.id) : -1;

  const getLeaderboard = () => {
    return contestants
      .map(contestant => ({
        ...contestant,
        totalVotes: voteData[contestant.id] 
          ? voteData[contestant.id].upvotes - voteData[contestant.id].downvotes
          : 0
      }))
      .sort((a, b) => b.totalVotes - a.totalVotes)
      .slice(0, 3);
  };

  const leaderboard = getLeaderboard();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <p className="text-lg text-gray-600">Chargement des candidats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <p className="text-lg text-red-600">Erreur: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Users className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Votez pour vos favoris
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Exprimez vos votes pour les candidats que vous pensez mériter de gagner. Votre voix compte !
          </p>
        </div>

        {/* Leaderboard */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Classement actuel</h2>
          </div>
          {contestants.length === 0 ? (
            <p className="text-center text-lg text-gray-600">Aucun candidat pour le classement.</p>
          ) : (
            <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {leaderboard.map((contestant, index) => (
                  <div key={contestant.id} className="text-center">
                    <div className="relative inline-block">
                      <img
                        src={contestant.photo}
                        alt={contestant.name}
                        className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
                      />
                      <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900">{contestant.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{contestant.category}</p>
                    <p className="text-sm font-medium text-purple-600">
                      {contestant.totalVotes >= 0 ? '+' : ''}{contestant.totalVotes} votes
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Filter */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 p-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtrer:</span>
            <div className="flex space-x-1">
              {[
                { value: 'all', label: 'Tous' },
                { value: 'miss', label: 'Miss' },
                { value: 'mister', label: 'Mister' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value as 'all' | 'miss' | 'mister')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === option.value
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contestants Grid */}
        {contestants.length === 0 ? (
          <p className="text-center text-lg text-gray-600">Aucun candidat trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContestants.map(contestant => (
              <ContestantCard
                key={contestant.id}
                contestant={contestant}
                upvotes={voteData[contestant.id]?.upvotes || 0}
                downvotes={voteData[contestant.id]?.downvotes || 0}
                userVote={voteData[contestant.id]?.userVote || null}
                onVote={vote}
                onOpenModal={handleOpenModal}
              />
            ))}
          </div>
        )}
      </div>
      <ContestantModal 
        contestant={selectedContestant} 
        onClose={handleCloseModal} 
        onNext={handleNextContestant}
        onPrevious={handlePreviousContestant}
        hasNext={filteredContestants.length > 1}
        hasPrevious={filteredContestants.length > 1}
      />
    </div>
  );
};

export default Vote;