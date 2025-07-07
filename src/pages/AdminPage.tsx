import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContestants } from '../hooks/useContestants';
import { useContestantManagement } from '../hooks/useContestantManagement';
import { useVoting } from '../hooks/useVoting';
import { Contestant } from '../types';
import { Trash2, Edit, PlusCircle } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { contestants, loading, error } = useContestants();
  const { addContestant, updateContestant, deleteContestant, loading: managementLoading, error: managementError } = useContestantManagement();
  const { voteData } = useVoting();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContestant, setEditingContestant] = useState<Contestant | null>(null);
  const [formData, setFormData] = useState<Omit<Contestant, 'id'>>({
    name: '',
    age: 0,
    photo: '',
    description: '',
    category: 'miss',
    votes: 0, // Default value, will be managed by Firestore votes collection
  });

  useEffect(() => {
    if (editingContestant) {
      setFormData({
        name: editingContestant.name,
        age: editingContestant.age,
        photo: editingContestant.photo,
        description: editingContestant.description,
        category: editingContestant.category,
        votes: editingContestant.votes,
      });
      setShowAddForm(true);
    } else {
      setFormData({
        name: '',
        age: 0,
        photo: '',
        description: '',
        category: 'miss',
        votes: 0,
      });
    }
  }, [editingContestant]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) : value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const contestantDataToSave = {
      name: formData.name,
      age: formData.age,
      photo: formData.photo,
      description: formData.description,
      category: formData.category,
      votes: formData.votes, // This will be ignored by Firestore if not explicitly set in rules
    };

    if (editingContestant) {
      await updateContestant(editingContestant.id, contestantDataToSave);
      setEditingContestant(null);
    } else {
      await addContestant(contestantDataToSave);
    }
    setShowAddForm(false);
    setFormData({
      name: '',
      age: 0,
      photo: '',
      description: '',
      category: 'miss',
      votes: 0,
    });
  };

  const handleEditClick = (contestant: Contestant) => {
    setEditingContestant(contestant);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce candidat ?")) {
      await deleteContestant(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Page Administrateur</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Déconnexion
          </button>
        </div>

        {managementLoading && <p className="text-blue-600">Opération en cours...</p>}
        {managementError && <p className="text-red-600">Erreur: {managementError}</p>}

        {/* Contestant Management Section */}
        <div className="mt-8 p-6 border rounded-lg bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Gestion des candidats</h2>
          
          <button
            onClick={() => { setShowAddForm(!showAddForm); setEditingContestant(null); }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2 mb-6"
          >
            <PlusCircle className="h-5 w-5" />
            <span>{showAddForm ? 'Annuler' : 'Ajouter un nouveau candidat'}</span>
          </button>

          {showAddForm && (
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 border rounded-lg bg-white shadow-inner">
              <div className="col-span-2">
                <h3 className="text-xl font-bold mb-4">{editingContestant ? 'Modifier le candidat' : 'Ajouter un candidat'}</h3>
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nom:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Âge:</label>
                <input type="number" id="age" name="age" value={formData.age} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label htmlFor="photo" className="block text-gray-700 text-sm font-bold mb-2">URL Photo:</label>
                <input type="text" id="photo" name="photo" value={formData.photo} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Catégorie:</label>
                <select id="category" name="category" value={formData.category} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                  <option value="miss">Miss</option>
                  <option value="mister">Mister</option>
                </select>
              </div>
              <div className="col-span-2">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleFormChange} rows={3} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
              </div>
              <div className="col-span-2 flex justify-end">
                <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  {editingContestant ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          )}

          {loading && <p className="text-center text-lg text-gray-600">Chargement des candidats...</p>}
          {error && <p className="text-center text-lg text-red-600">Erreur: {error}</p>}
          {!loading && !error && contestants.length === 0 && (
            <p className="text-center text-lg text-gray-600">Aucun candidat trouvé. Ajoutez-en un ci-dessus !</p>
          )}
          {!loading && !error && contestants.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Nom</th>
                    <th className="py-3 px-6 text-left">Âge</th>
                    <th className="py-3 px-6 text-left">Catégorie</th>
                    <th className="py-3 px-6 text-left">Description</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {contestants.map((contestant) => (
                    <tr key={contestant.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2">
                            <img className="w-8 h-8 rounded-full object-cover" src={contestant.photo} alt={contestant.name} />
                          </div>
                          <span>{contestant.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">{contestant.age}</td>
                      <td className="py-3 px-6 text-left capitalize">{contestant.category}</td>
                      <td className="py-3 px-6 text-left max-w-xs overflow-hidden text-ellipsis">{contestant.description}</td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center space-x-4">
                          <button onClick={() => handleEditClick(contestant)} className="w-6 h-6 transform hover:text-purple-500 hover:scale-110">
                            <Edit className="w-full h-full" />
                          </button>
                          <button onClick={() => handleDeleteClick(contestant.id)} className="w-6 h-6 transform hover:text-red-500 hover:scale-110">
                            <Trash2 className="w-full h-full" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Voting Statistics Section */}
        <div className="mt-8 p-6 border rounded-lg bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Statistiques de vote</h2>
          {loading && <p className="text-center text-lg text-gray-600">Chargement des statistiques...</p>}
          {error && <p className="text-center text-lg text-red-600">Erreur: {error}</p>}
          {!loading && !error && contestants.length === 0 && (
            <p className="text-center text-lg text-gray-600">Aucun candidat pour afficher les statistiques.</p>
          )}
          {!loading && !error && contestants.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Nom</th>
                    <th className="py-3 px-6 text-center">Votes positifs</th>
                    <th className="py-3 px-6 text-center">Votes négatifs</th>
                    <th className="py-3 px-6 text-center">Total des votes</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {contestants.map((contestant) => {
                    const votes = voteData[contestant.id] || { upvotes: 0, downvotes: 0 };
                    const totalVotes = votes.upvotes - votes.downvotes;
                    return (
                      <tr key={contestant.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img className="w-8 h-8 rounded-full object-cover" src={contestant.photo} alt={contestant.name} />
                            </div>
                            <span>{contestant.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center text-green-600 font-medium">{votes.upvotes}</td>
                        <td className="py-3 px-6 text-center text-red-600 font-medium">{votes.downvotes}</td>
                        <td className={`py-3 px-6 text-center font-bold ${totalVotes >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
                          {totalVotes >= 0 ? '+' : ''}{totalVotes}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;