import { rawPost } from '../data/rawPost';
import { users } from '../data/users';

export const fetchPost = async (): Promise<rawPost> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return rawPost;
};

export const fetchUser = async (userId: number): Promise<User | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return users.find(user => user.id === userId);
};