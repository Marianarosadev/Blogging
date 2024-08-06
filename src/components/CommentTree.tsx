import React, { useState } from 'react'
import { formatDateTime } from '../utils/formaters.ts'
import IconComment from '../assets/icons/comment.svg'
import IconReport from '../assets/icons/report.svg'
import IconSend from '../assets/icons/send.svg'
import UserModal from './UserModal'
import '../styles/components/CommentTree.css'

interface Comment {
  id: number;
  respondsTo: { id: number } | null;
  author: {
    id: number;
    username: string;
  };
  timestamp: string;
  content: string;
}

interface CommentTreeProps {
  comments: Comment[];
}

const CommentTree: React.FC<CommentTreeProps> = ({ comments }) => {
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [newCommentContent, setNewCommentContent] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleReplyClick = (commentId: number) => {
    setReplyTo(commentId);
    setNewCommentContent('');
  };

  const handleCancelReply = () => {
    setReplyTo(null);
    setNewCommentContent('');
  };

  const handleSubmitReply = (commentId: number) => {
    if (newCommentContent.trim() === '') return;

    const newComment: Comment = {
      id: comments.length + 1,
      respondsTo: { id: commentId },
      author: {
        id: 1,
        username: 'João Figueiredo',
      },
      timestamp: new Date().toISOString(),
      content: newCommentContent,
    };

    comments.push(newComment);
    setNewCommentContent('');
    setReplyTo(null);
  };

  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId);
  };

  const renderComments = (comments: Comment[], parentId: number | null = null) => {
    return comments
      .filter(comment => (comment.respondsTo ? comment.respondsTo.id : null) === parentId)
      .map(comment => (
        <div key={comment.id} className="comment">
          <a
            className='comment__user'
            onClick={() => handleUserClick(comment.author.id)}
          >
            {comment.author.username} - {formatDateTime(comment.timestamp)}
          </a>
          <div className='comment__content'>{comment.content}</div>
          {replyTo !== comment.id && (
            <div className="comment-actions">
              <button data-testid={`reply-button-${comment.id}`} className='comment__btn-icon' onClick={() => handleReplyClick(comment.id)}>
                <img src={IconComment} alt="Responder" />
              </button>
              <button className='comment__btn-icon'>
                <img src={IconSend} alt="Compartilhar" />
              </button>
              <button className='comment__btn-icon'>
                <img src={IconReport} alt="Reportar" />
              </button>
            </div>
          )}
          {replyTo === comment.id && (
            <div className="comment-reply">
              <textarea
                value={newCommentContent}
                onChange={(e) => setNewCommentContent(e.target.value)}
                placeholder="Escreva sua resposta..."
                className="comment-reply__textarea"
              />
              <div className="comment-reply__actions">
                <button
                  className="button button--default comment-reply__submit"
                  onClick={() => handleSubmitReply(comment.id)}
                >
                  Enviar resposta
                </button>
                <button
                  className="button button--danger"
                  onClick={handleCancelReply}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
          {renderComments(comments, comment.id)}
        </div>
      ));
  };

  return (
    <div className="comment-tree">
      {renderComments(comments)}
      {selectedUserId !== null && (
        <UserModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
};

export default CommentTree;