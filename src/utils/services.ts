import { rawPost } from '../data/rawPost';

export const fetchPost = async (): Promise<Post> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return rawPost;
};