import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, collection, onSnapshot, setDoc } from 'firebase/firestore';
import { VoteData } from '../types';

export const useVoting = () => {
  const [voteData, setVoteData] = useState<{ [key: string]: VoteData }>({});

  useEffect(() => {
    const votesCollectionRef = collection(db, 'votes');

    const unsubscribe = onSnapshot(votesCollectionRef, (snapshot) => {
      const newVoteData: { [key: string]: VoteData } = {};
      snapshot.forEach((doc) => {
        newVoteData[doc.id] = doc.data() as VoteData;
      });
      setVoteData(newVoteData);
    });

    return () => unsubscribe();
  }, []);

  const vote = async (contestantId: string, voteType: 'up' | 'down') => {
    const voteRef = doc(db, 'votes', contestantId);

    try {
      const docSnap = await getDoc(voteRef);
      let currentUpvotes = 0;
      let currentDownvotes = 0;
      let currentUserVote: 'up' | 'down' | null = null;

      if (docSnap.exists()) {
        const data = docSnap.data() as VoteData;
        currentUpvotes = data.upvotes || 0;
        currentDownvotes = data.downvotes || 0;
        currentUserVote = data.userVote || null;
      }

      let newUpvotes = currentUpvotes;
      let newDownvotes = currentDownvotes;
      let newUserVote: 'up' | 'down' | null = null;

      if (currentUserVote === voteType) {
        // User is unvoting
        if (voteType === 'up') {
          newUpvotes -= 1;
        } else {
          newDownvotes -= 1;
        }
        newUserVote = null;
      } else {
        // User is changing vote or casting a new vote
        if (currentUserVote === 'up') {
          newUpvotes -= 1;
        } else if (currentUserVote === 'down') {
          newDownvotes -= 1;
        }

        if (voteType === 'up') {
          newUpvotes += 1;
        } else {
          newDownvotes += 1;
        }
        newUserVote = voteType;
      }

      await setDoc(voteRef, {
        upvotes: newUpvotes,
        downvotes: newDownvotes,
        userVote: newUserVote,
      }, { merge: true });
    } catch (e) {
      console.error("Error updating vote: ", e);
    }
  };

  return { voteData, vote };
};