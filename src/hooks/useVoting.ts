import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, collection, onSnapshot, writeBatch, increment, DocumentData } from 'firebase/firestore';
import { VoteData } from '../types';

// Helper to get votes from localStorage
const getLocalVotes = (): { [key: string]: 'up' | 'down' } => {
  try {
    const localData = localStorage.getItem('userVotes');
    return localData ? JSON.parse(localData) : {};
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return {};
  }
};

// Helper to set votes in localStorage
const setLocalVotes = (votes: { [key: string]: 'up' | 'down' }) => {
  try {
    localStorage.setItem('userVotes', JSON.stringify(votes));
  } catch (error) {
    console.error("Error writing to localStorage", error);
  }
};

export const useVoting = () => {
  const [voteData, setVoteData] = useState<{ [key: string]: VoteData }>({});
  const [userVotes, setUserVotes] = useState<{ [key: string]: 'up' | 'down' }>(() => getLocalVotes());

  // This effect sets up the Firestore listener once and syncs data
  useEffect(() => {
    const votesCollectionRef = collection(db, 'votes');
    const unsubscribe = onSnapshot(votesCollectionRef, (snapshot) => {
      const newVoteData: { [key: string]: VoteData } = {};
      snapshot.docs.forEach((doc) => {
        const data = doc.data() as DocumentData;
        newVoteData[doc.id] = {
          upvotes: data.upvotes || 0,
          downvotes: data.downvotes || 0,
          userVote: userVotes[doc.id] || null // Combine with local user votes
        };
      });
      setVoteData(newVoteData);
    });

    return () => unsubscribe();
  }, [userVotes]); // Rerun if userVotes changes to update the UI correctly

  const vote = async (contestantId: string, voteType: 'up' | 'down') => {
    const voteRef = doc(db, 'votes', contestantId);
    const localUserVote = userVotes[contestantId];
    const batch = writeBatch(db);

    const newLocalVotes = { ...userVotes };

    if (localUserVote === voteType) {
      // --- UNDO VOTE ---
      batch.set(voteRef, { [voteType === 'up' ? 'upvotes' : 'downvotes']: increment(-1) }, { merge: true });
      delete newLocalVotes[contestantId];
    } else if (localUserVote) {
      // --- CHANGE VOTE ---
      batch.set(voteRef, { [localUserVote === 'up' ? 'upvotes' : 'downvotes']: increment(-1) }, { merge: true });
      batch.set(voteRef, { [voteType === 'up' ? 'upvotes' : 'downvotes']: increment(1) }, { merge: true });
      newLocalVotes[contestantId] = voteType;
    } else {
      // --- NEW VOTE ---
      batch.set(voteRef, { [voteType === 'up' ? 'upvotes' : 'downvotes']: increment(1) }, { merge: true });
      newLocalVotes[contestantId] = voteType;
    }

    try {
      await batch.commit();
      // Update local state and localStorage only after successful commit
      setUserVotes(newLocalVotes);
      setLocalVotes(newLocalVotes);
    } catch (e) {
      console.error("Error committing vote batch: ", e);
    }
  };

  return { voteData, vote };
};