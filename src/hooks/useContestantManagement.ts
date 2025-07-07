import { useState } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Contestant } from '../types';

export const useContestantManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contestantsCollectionRef = collection(db, 'contestants');

  const addContestant = async (contestant: Omit<Contestant, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      await addDoc(contestantsCollectionRef, contestant);
      setLoading(false);
      return true;
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
      return false;
    }
  };

  const updateContestant = async (id: string, updatedFields: Partial<Omit<Contestant, 'id'>>) => {
    setLoading(true);
    setError(null);
    try {
      const contestantDocRef = doc(db, 'contestants', id);
      await updateDoc(contestantDocRef, updatedFields);
      setLoading(false);
      return true;
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
      return false;
    }
  };

  const deleteContestant = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const contestantDocRef = doc(db, 'contestants', id);
      await deleteDoc(contestantDocRef);
      setLoading(false);
      return true;
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
      return false;
    }
  };

  return { addContestant, updateContestant, deleteContestant, loading, error };
};
