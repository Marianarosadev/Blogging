import { rawPost } from '../data/rawPost';

export const fetchPost = async (): Promise<rawPost> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return rawPost;
};