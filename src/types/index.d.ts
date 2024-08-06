interface rawPost {
  id: number;
  timestamp: string;
  author: { 
    id: number;
    username: string; 
  };
  title: string;
  subtitle: string;
  content: string;
  comments: Array<{
    id: number;
    respondsTo: { id: number } | null;
    author: {
      id: number;
      username: string;
    };
    timestamp: string;
    content: string;
  }>;
}

interface User {
  id: number;
  username: string;
  memberSince: string;
  friendIds: number[];
  posts: {
    id: number;
    title: string;
    subtitle: string;
    content: string;
  }[];
}