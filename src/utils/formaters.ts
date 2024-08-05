export const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date).replace(/(de\s.*)de/, '$1').replace(/\./g, ',');  ;
};

export const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp);

  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date).replace(/ de |\. /g, ' ');

  const formattedTime = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  return `${formattedDate}, às ${formattedTime}`;
};