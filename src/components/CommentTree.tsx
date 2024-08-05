import React from 'react';
import { formatDateTime } from '../utils/formaters.ts'
import IconComment from '../assets/icons/comment.svg'
import IconReport from '../assets/icons/report.svg'
import IconSend from '../assets/icons/send.svg'
import '../styles/components/CommentTree.css'

export interface Comment {
  id: number;
  respondsTo: { id: number } | null;
  author: {
    id: number;
    username: string;
  };
  timestamp: string;
  content: string;
}

export interface CommentTreeProps {
  comments: Comment[];
}

const CommentTree: React.FC<CommentTreeProps> = ({ comments }) => {
  const renderComments = (comments: Comment[], parentId: number | null = null) => {
    return comments
      .filter(comment => (comment.respondsTo ? comment.respondsTo.id : null) === parentId)
      .map(comment => (
        <div key={comment.id} className="comment">
          <a className='comment__user'>{comment.author.username} - {formatDateTime(comment.timestamp)}</a>
          <div className='comment__content'>{comment.content}</div>
          <div className="comment-actions">
            <button className='comment__btn-icon'>
              <img src={IconComment} alt="Comentar" />
            </button>
            <button className='comment__btn-icon'>
              <img src={IconReport} alt="Comentar" />
            </button>
            <button className='comment__btn-icon'>
              <img src={IconSend} alt="Comentar" />
            </button>
          </div>
          {renderComments(comments, comment.id)}
        </div>
      ));
  };

  return renderComments(comments)
};

export default CommentTree;