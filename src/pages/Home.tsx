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
              Le LSL nous en a fait douter, mais maintenant qu’il est derrière nous, on va enfin savoir qui brille vraiment ! Place aux Miss et Mister de la vraie vie 😍
            </p>
            <Link
              to="/vote"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Users className="h-5 w-5" />
              <span>Commencer à voter</span>
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">Découvrez les Candidats</h3>
            <p className="text-gray-600">
              Faites connaissance avec nos incroyables candidats en lice pour les titres de Miss et Mister.
            </p>
          </div>

          <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="flex justify-center mb-4">
              <Star className="h-12 w-12 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Votez pour vos Favoris</h3>
            <p className="text-gray-600">
              Exprimez vos votes et aidez à décider qui mérite de remporter les titres tant convoités.
            </p>
          </div>

          <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="flex justify-center mb-4">
              <Trophy className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Couronnez les Gagnants</h3>
            <p className="text-gray-600">
              Rejoignez-nous pour célébrer les gagnants et leur incroyable parcours vers le sommet.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à voter ?</h2>
            <p className="text-xl mb-8 text-purple-100">
              Votre vote compte ! Aidez-nous à choisir les prochains champions Miss et Mister.
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