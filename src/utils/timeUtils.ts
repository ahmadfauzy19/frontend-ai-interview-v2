export const formattedTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);

  const formattedDate =
    date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }) +
    ' ' +
    date
      .toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace('.', ':');

  return formattedDate.replace(/\//g, '-');
};
