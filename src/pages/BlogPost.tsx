import React, { useState, useEffect } from 'react'
import { fetchPost } from '../services/api.ts'
import { formatDate } from '../utils/formaters.ts'
import Loader from '../components/Loader.tsx'
import CommentTree from '../components/CommentTree.tsx'
import Banner from '../assets/banner.png'
import Avatar1 from '../assets/avatars/avatar1.jpg'
import '../styles/pages/BlogPost.css'

const BlogPost: React.FC = () => {
  const [post, setPost] = useState<rawPost | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await fetchPost();

        setPost(postData);
      } catch (error) {
        console.error('Erro ao carregar o post:', error);
      }
    };
    loadPost();
  }, []);

  if (!post) return <Loader/>;

  return (
    <div className="post">
      <img src={Banner} alt="Banner do post" className='post__banner'/>
      <div className='post__container'>
        <h1 className='post__title'>{post.title}</h1>
        <h2 className='post__sub-title'>{post.subtitle}</h2>
        <div className='post__author'>
          <img src={Avatar1} alt="Foto do autor do post" className='post__avatar-img'/>
          <div className='post__author-info'>
            <div className='post__author-name'>{post.author.username}</div>
            <div className='post__timestamp'>{formatDate(post.timestamp)}</div>
          </div>
        </div>
        <div className="post__content" dangerouslySetInnerHTML={{ __html: post.content }}/>
        <div className="post__comments">
          <div className="post__comments-title">Comentários</div>
          <CommentTree comments={post.comments} />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;