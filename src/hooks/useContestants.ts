import { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Contestant } from '../types';

interface VoteData {
  upvotes: number;
  downvotes: number;
  userVote: 'up' | 'down' | null;
}

export const useContestants = (voteData: Record<string, VoteData>) => {
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const contestantsCollectionRef = collection(db, 'contestants');
    const q = query(contestantsCollectionRef);

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const contestantsData: Contestant[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Contestant, 'id'>
        }));

        const sortedContestants = contestantsData
          .map(contestant => ({
            ...contestant,
            totalVotes: voteData[contestant.id]
              ? voteData[contestant.id].upvotes - voteData[contestant.id].downvotes
              : 0
          }))
          .sort((a, b) => b.totalVotes - a.totalVotes);

        setContestants(sortedContestants);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching contestants: ", err);
        setError("Failed to load contestants.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [voteData]);

  return { contestants, loading, error };
};