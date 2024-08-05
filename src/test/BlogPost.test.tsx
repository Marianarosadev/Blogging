import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogPost from '../pages/BlogPost';
import { fetchPost } from '../services/api';
import { formatDate } from '../utils/formaters.ts';

jest.mock('../services/api.ts', () => ({
  fetchPost: jest.fn() as jest.MockedFunction<typeof fetchPost>
}));

jest.mock('../utils/formaters.ts', () => ({
  formatDate: jest.fn() as jest.MockedFunction<typeof formatDate>
}));

jest.mock('../components/Loader.tsx', () => () => <div>Loading...</div>);
jest.mock('../components/CommentTree.tsx', () => () => <div>Comment Tree</div>);

const mockPost: rawPost = {
  id: 1,
  timestamp: '2024-08-05T10:00:00Z',
  author: {
    id: 1,
    username: 'author_username',
  },
  title: 'Post Title',
  subtitle: 'Post Subtitle',
  content: 'Post content',
  comments: [
    {
      id: 1,
      respondsTo: null,
      author: {
        id: 2,
        username: 'commenter_username',
      },
      timestamp: '2024-08-05T10:01:00Z',
      content: 'Comment content',
    },
  ],
};

(fetchPost as jest.Mock).mockResolvedValue(mockPost);
(formatDate as jest.Mock).mockReturnValue('20 de fev, 2019');

describe('BlogPost Component', () => {
  const renderComponent = async () => {
    await act(async () => {
      render(<BlogPost />);
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', async () => {
    render(<BlogPost />); 

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('renders post content after fetching data', () => {
    beforeEach(async () => {
      await renderComponent();
    });

    test('renders post title, subtitle, author, and content', async () => {
      await waitFor(() => {
        expect(screen.getByText(mockPost.title)).toBeInTheDocument();
        expect(screen.getByText(mockPost.subtitle)).toBeInTheDocument();
        expect(screen.getByText(mockPost.author.username)).toBeInTheDocument();
        expect(screen.getByText(mockPost.content)).toBeInTheDocument();
      });
    });

    test('renders comments and CommentTree with correct data', async () => {
      await waitFor(() => {
        expect(screen.getByText('Comment Tree')).toBeInTheDocument();
      });
    });

    test('renders banner and avatar image', async () => {
      await waitFor(() => {
        expect(screen.getByAltText('Banner do post')).toBeInTheDocument();
        expect(screen.getByAltText('Foto do autor do post')).toBeInTheDocument();
      });
    });

    test('calls formatDate with correct arguments', async () => {
      await waitFor(() => {
        expect(formatDate).toHaveBeenCalledWith(mockPost.timestamp);
        expect(screen.getByText('20 de fev, 2019')).toBeInTheDocument();
      });
    });
  });
});
