import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Contestant } from '../types';

export const useContestants = () => {
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const contestantsCollectionRef = collection(db, 'contestants');
    const q = query(contestantsCollectionRef, orderBy('name', 'asc'));

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const contestantsData: Contestant[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Contestant, 'id'>
        }));
        setContestants(contestantsData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching contestants: ", err);
        setError("Failed to load contestants.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { contestants, loading, error };
};