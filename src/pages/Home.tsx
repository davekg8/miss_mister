import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Users, Trophy, Star } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Crown className="h-24 w-24 text-purple-600" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Miss Mister 2025
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join us in celebrating beauty, talent, and personality. Vote for your favorite contestants 
              and help crown the next Miss and Mister champions!
            </p>
            <Link
              to="/vote"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Users className="h-5 w-5" />
              <span>Start Voting</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="flex justify-center mb-4">
              <Crown className="h-12 w-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Meet the Contestants</h3>
            <p className="text-gray-600">
              Get to know our amazing contestants competing for the Miss and Mister titles.
            </p>
          </div>

          <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="flex justify-center mb-4">
              <Star className="h-12 w-12 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Vote for Your Favorites</h3>
            <p className="text-gray-600">
              Cast your votes and help decide who deserves to win the coveted titles.
            </p>
          </div>

          <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="flex justify-center mb-4">
              <Trophy className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Crown the Winners</h3>
            <p className="text-gray-600">
              Join us in celebrating the winners and their incredible journey to the top.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Vote?</h2>
            <p className="text-xl mb-8 text-purple-100">
              Your vote matters! Help us choose the next Miss and Mister champions.
            </p>
            <Link
              to="/vote"
              className="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Users className="h-5 w-5" />
              <span>Votez maintenant</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;