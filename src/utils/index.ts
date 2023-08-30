export const formatDate = (dateString: string) => {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 porque los meses son indexados desde 0
  const day = (dateObject.getDate() + 1).toString();
  return `${year}-${month}-${day}`;
};
