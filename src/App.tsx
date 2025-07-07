import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

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
      </div>
    </Router>
  );
}

export default App;