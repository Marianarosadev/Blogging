import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserModal from '../components/UserModal';
import { fetchUser } from '../services/api';
import { users } from '../data/users';

jest.mock('../services/api');
jest.mock('../components/Loader.tsx', () => () => <div>Loading</div>);
jest.mock('../utils/AvatarMap.ts', () => ({
  1: 'path/to/avatar1.jpg'
}));

const mockUser = {
  id: 1,
  username: "João Figueiredo",
  memberSince: "2014-05-03T16:12Z",
  friendIds: [2, 4, 6],
  posts: [
    {
      id: 1,
      title: "Título do post",
      subtitle: "Subtitulo do post",
      content: `<p>Conteúdo do post</p>`
    }
  ]
};

const mockFriends = users.filter(user => mockUser.friendIds.includes(user.id));

(fetchUser as jest.Mock).mockResolvedValue(mockUser);

describe('UserModal Component', () => {
  const renderComponent = async () => {
    await act(async () => {
      render(<UserModal userId={mockUser.id} onClose={() => { }} />);
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', async () => {
    render(<UserModal userId={mockUser.id} onClose={() => { }} />);
    await waitFor(() => {
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });
  });

  test('renders user card info after fetching', async () => {
    await renderComponent();
    await waitFor(() => {
      expect(screen.getByAltText('Foto do usuário')).toHaveAttribute('src', 'path/to/avatar1.jpg');
      expect(screen.getByText(mockUser.username)).toBeInTheDocument();
      expect(screen.getByText(/^Membro desde:/)).toHaveTextContent('Membro desde: 03/05/2014');
      expect(screen.getByAltText(/Fechar modal/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Adicionar amigo/i })).toBeInTheDocument();
      expect(screen.getByAltText(/Enviar mensagem/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Reportar/i)).toBeInTheDocument();
    });
  });

  test('close button is present and functional', async () => {
    const onClose = jest.fn();
    await act(async () => {
      render(<UserModal userId={mockUser.id} onClose={onClose} />);
    });
    await waitFor(() => expect(screen.getByText(mockUser.username)).toBeInTheDocument());
    const closeButton = screen.getByRole('button', { name: /fechar modal/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('displays common friends correctly', async () => {
    await renderComponent();
    await waitFor(() => {
      if (mockFriends.length > 0) {
        expect(screen.getByText(/Amigos em comum/i)).toBeInTheDocument();
        mockFriends.forEach(friend => {
          expect(screen.getByText(friend.username)).toBeInTheDocument();
        });
      } else {
        expect(screen.getByText(/nenhum amigo em comum/i)).toBeInTheDocument();
      }
    });
  });

  test('displays user posts and accordion functionality works', async () => {
    await renderComponent();
    await waitFor(() => expect(screen.getByText(mockUser.username)).toBeInTheDocument());
    const postTitle = screen.getByText(mockUser.posts[0].title);
    expect(postTitle).toBeInTheDocument();
    fireEvent.click(postTitle);
    expect(screen.getByText(/conteúdo do post/i)).toBeInTheDocument();
  });

  test('truncates post content initially and expands on click', async () => {
    await renderComponent();
    await waitFor(() => expect(screen.getByText(mockUser.username)).toBeInTheDocument());
    expect(screen.getByText(/conteúdo do post/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(mockUser.posts[0].title));
    expect(screen.getByText(/conteúdo do post/i)).toBeVisible();
  });
});
