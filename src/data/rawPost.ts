export const rawPost = {
  id: 1,
  timestamp: '2019-02-20T13:22Z',
  author: {
    id: 1,
    username: 'João Figueiredo'
  },
  title: 'Estratégias em um novo paradigma globalizado',
  subtitle: 'Sobre o cuidado em identificar pontos críticos na complexidade',
  content: '<p>Caros amigos, a mobilidade dos capitais internacionais desafia a capacidade de equalização das diversas correntes de pensamento. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a necessidade de renovação processual ainda não demonstrou convincentemente que vai participar na mudança das diretrizes de desenvolvimento para o futuro. O cuidado em identificar pontos críticos na complexidade dos estudos efetuados é uma das consequências das direções preferenciais no sentido do progresso. Do mesmo modo, a adoção de políticas descentralizadoras não pode mais se dissociar dos modos de operação convencionais.</p>',
  comments: [
    {
      id: 1,
      respondsTo: null,
      author: {
        id: 2,
        username: 'Joana Vasconcellos'
      },
      timestamp: '2019-02-20:30Z',
      content: 'O empenho em analisar a consolidação das estruturas oferece uma interessante oportunidade para verificação do retorno esperado a longo prazo. Por outro lado, o julgamento imparcial das eventualidades facilita a criação dos modos de operação convencionais. O que temos que ter sempre em mente é que a revolução dos costumes estimula a padronização das novas proposições.'
    },
    {
      id: 2,
      respondsTo: null,
      author: {
        id: 3,
        username: 'Arthur Silveira'
      },
      timestamp: '2019-02-17T11:23Z',
      content: 'É importante questionar o quanto o consenso sobre a necessidade de qualificação possibilita uma melhor visão global dos índices pretendidos.'
    },
    {
      id: 3,
      respondsTo: {
        id: 2
      },
      author: {
        id: 4,
        username: 'Clara Passos'
      },
      timestamp: '2019-02-23T07:48Z',
      content: 'Ainda assim, existem dúvidas a respeito de como a execução dos pontos do programa representa uma abertura para a melhoria da gestão inovadora da qual fazemos parte.'
    },
    {
      id: 4,
      respondsTo: {
        id: 3
      },
      author: {
        id: 5,
        username: 'Mauro Andrade'
      },
      timestamp: '2019-02-28T07:08Z',
      content: 'Concordo plenamente, Clara!'
    },
    {
      id: 5,
      respondsTo: {
        id: 3
      },
      author: {
        id: 6,
        username: 'Rafaela Moreira'
      },
      timestamp: '2019-02-28T08:21Z',
      content: 'Discordo veementemente, Clara!'
    }
  ]
};
