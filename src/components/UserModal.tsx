import React, { useEffect, useState } from 'react';
import { users } from '../data/users';
import { fetchUser } from '../services/api.ts'
import Loader from '../components/Loader.tsx'
import CloseIcon from '../assets/icons/close.svg'
import IconPersonAdd from '../assets/icons/person-add.svg'
import IconPersonRemove from '../assets/icons/person-remove.svg'
import IconChat from '../assets/icons/forward.svg'
import IconReport from '../assets/icons/report.svg'
import '../styles/components/UserModal.css'

import Avatar1 from '../assets/avatars/avatar1.jpg';
import avatarMap from '../utils/AvatarMap.ts';

interface UserModalProps {
  userId: number;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ userId, onClose }) => {
  const [user, setUser] = useState<typeof users[0] | null>(null);
  const [activePosts, setActivePosts] = useState<number[]>([]);

  useEffect(() => {
    const loadUser = async () => {
      const postUser = await fetchUser(userId);
      setUser(postUser || null);
    };
    loadUser();
  }, [userId]);

  const toggleAccordion = (postId: number) => {
    setActivePosts(prevActivePosts =>
      prevActivePosts.includes(postId)
        ? prevActivePosts.filter(id => id !== postId)
        : [...prevActivePosts, postId]
    );
  };

  if (!user) return <div className="modal"><Loader /></div>;

  const loggedInUserId = 1;
  const loggedInUser = users.find(user => user.id === loggedInUserId);
  const isFriend = loggedInUser ? loggedInUser.friendIds.includes(userId) : false;
  
  const commonFriends = loggedInUser
    ? loggedInUser.friendIds.filter(friendId => user.friendIds.includes(friendId))
    : [];

  const commonFriendsDetails = users.filter(user => commonFriends.includes(user.id));

  return (
    <div className="modal">
      <div className="modal__dialog">
        <div className="modal__content">
          <button className="modal__close" onClick={onClose}>
            <img src={CloseIcon} alt="Fechar modal" />
          </button>
          <div className="user-card__info">
            <div className='user-card__info-container'>
              <img className="user-card__avatar" src={avatarMap[user.id] || Avatar1} alt="Foto do usuário" />
              <div className="user-card__details">
                <div className="user-card__name">{user.username}</div>
                <div className="user-card__member-since">Membro desde: {new Date(user.memberSince).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="user-card__actions">
              <div className='user-card__actions-container'>
                <button className={`button ${isFriend ? 'button--danger' : 'button--default'} user-card__btn-actions`}>
                  <img src={isFriend ? IconPersonRemove : IconPersonAdd} alt={isFriend ? "Remover amigo" : "Adicionar amigo"} />
                  {isFriend ? "Remover amigo" : "Adicionar amigo"}
                </button>
                <button className='button button--outline user-card__btn-actions'>
                  <img src={IconChat} alt="Enviar mensagem" />
                  Menssagem
                </button>
              </div>
              <div className='user-card__action-report'>
                <img src={IconReport} alt="Reportar" />
                <a href="">Reportar usuário</a>
              </div>
            </div>
          </div>
          <div className="user-card__common-friends">
            <h3 className="user-card__posts-title">Amigos em comum:</h3>
            <ul className="user-card__common-friends-list">
              {commonFriendsDetails.length > 0 ? (
                commonFriendsDetails.map(friend => (
                  <li key={friend.id} className="user-card__common-friend-item">
                    <img className="user-card__common-friend-avatar" src={avatarMap[friend.id] || Avatar1} alt={`Avatar de ${friend.username}`} />
                    <span>{friend.username}</span>
                  </li>
                ))
              ) : (
                <p>Nenhum amigo em comum.</p>
              )}
            </ul>
          </div>
          <div className="user-card__posts">
            <h3 className="user-card__posts-title">Posts publicados:</h3>
            <div className='user-card__posts-container'>
              {user.posts.map(post => (
                <div key={post.id} className="user-card__post-item">
                  <div className="user-card__post-header" onClick={() => toggleAccordion(post.id)}>
                    <div className="user-modal__post-title">{post.title}</div>
                    <p className="user-modal__post-subtitle">{post.subtitle}</p>
                  </div>
                  <div className={`user-card__post-content ${activePosts.includes(post.id) ? 'user-card__post-content--visible' : ''}`}>
                    <div className="user-card__post-body" dangerouslySetInnerHTML={{ __html: post.content.slice(0, 200) + '...' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
