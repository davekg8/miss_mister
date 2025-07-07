import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { Volume2, VolumeX } from 'lucide-react';

const Home = lazy(() => import('./pages/Home'));
const Vote = lazy(() => import('./pages/Vote'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

const LoadingFallback = () => (
  <div className="flex-grow flex items-center justify-center">
    <p className="text-lg text-gray-600">Chargement...</p>
  </div>
);

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = document.getElementById('background-music') as HTMLAudioElement;
    if (audio) {
      setAudioElement(audio);
      // Attempt to play the audio automatically
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log("Autoplay prevented: ", error);
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleMusic = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vote" element={<Vote />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <button
          onClick={toggleMusic}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 z-50"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>
    </Router>
  );
}

export default App;