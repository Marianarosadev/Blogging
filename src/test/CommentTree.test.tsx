import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentTree from '../components/CommentTree';
import { formatDateTime } from '../utils/formaters';

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

const mockComments: Comment[] = [
  {
    id: 1,
    respondsTo: null,
    author: {
      id: 2,
      username: 'Joana Vasconcellos'
    },
    timestamp: '2019-02-20T17:30Z',
    content: 'Conteúdo do comentário'
  },
];

describe('CommentTree Component', () => {
  const renderComponent = () => render(<CommentTree comments={mockComments} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders comments correctly with appropriate content, author, and formatted date', () => {
    const { getByText } = renderComponent();

    expect(getByText((content, element) => {
      if (!element) return false;
      return content.includes(mockComments[0].author.username) && content.includes(formatDateTime(mockComments[0].timestamp));
    })).toBeInTheDocument();

    expect(getByText(mockComments[0].content)).toBeInTheDocument();
  });

  test('renders reply, report, and share buttons for each comment', () => {
    const { getByAltText } = renderComponent();

    expect(getByAltText('Responder')).toBeInTheDocument();
    expect(getByAltText('Reportar')).toBeInTheDocument();
    expect(getByAltText('Compartilhar')).toBeInTheDocument();
  });

  describe('User Interaction', () => {
    test('should display reply field when reply button is clicked', () => {
      const { getByText, getByPlaceholderText, getByTestId } = renderComponent();

      fireEvent.click(getByTestId('reply-button-1'));

      expect(getByPlaceholderText(/Escreva sua resposta.../i)).toBeInTheDocument();
      expect(getByText(/Enviar resposta/i)).toBeInTheDocument();
      expect(getByText(/Cancelar/i)).toBeInTheDocument();
    });

    test('should add a new comment when reply is submitted', () => {
      const { getByText, getByPlaceholderText, getByTestId } = renderComponent();

      fireEvent.click(getByTestId('reply-button-1'));
      fireEvent.change(getByPlaceholderText(/Escreva sua resposta.../i), { target: { value: 'This is a reply.' } });

      fireEvent.click(getByText(/Enviar resposta/i));
      expect(getByText(/This is a reply./i)).toBeInTheDocument();
    });
  });

  describe('State Logic', () => {
    test('replyTo state updates correctly when reply and cancel buttons are clicked', () => {
      const { getByText, getByPlaceholderText, getByTestId, queryByPlaceholderText } = renderComponent();

      fireEvent.click(getByTestId('reply-button-1'));
      expect(getByPlaceholderText('Escreva sua resposta...')).toBeInTheDocument();

      fireEvent.click(getByText('Cancelar'));
      expect(queryByPlaceholderText('Escreva sua resposta...')).not.toBeInTheDocument();
    });

    test('newCommentContent state updates correctly and is cleared after submission or cancellation', () => {
      const { getByText, getByPlaceholderText, getByTestId, queryByPlaceholderText } = renderComponent();

      fireEvent.click(getByTestId('reply-button-1'));
      const textarea = getByPlaceholderText('Escreva sua resposta...');
      fireEvent.change(textarea, { target: { value: 'Nova resposta' } });
      expect(textarea).toHaveValue('Nova resposta');

      fireEvent.click(getByText('Enviar resposta'));
      expect(queryByPlaceholderText('Escreva sua resposta...')).not.toBeInTheDocument();

      fireEvent.click(getByTestId('reply-button-1'));
      expect(getByPlaceholderText('Escreva sua resposta...')).toHaveValue('');
    });
  });

  test('component renders efficiently with large volumes of comments', () => {
    const largeComments = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      respondsTo: null,
      author: {
        id: i + 1,
        username: `User ${i + 1}`
      },
      timestamp: new Date().toISOString(),
      content: `Comentário ${i + 1}`
    }));

    const { container } = render(<CommentTree comments={largeComments} />);

    expect(container.getElementsByClassName('comment').length).toBe(1000);
  });
});