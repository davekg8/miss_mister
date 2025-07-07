export interface Contestant {
  id: string;
  name: string;
  age: number;
  photo: string;
  description: string;
  category: 'miss' | 'mister';
  votes: number;
}

export interface VoteData {
  [contestantId: string]: {
    upvotes: number;
    downvotes: number;
    userVote?: 'up' | 'down' | null;
  };
}