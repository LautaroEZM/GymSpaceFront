const getDateTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses son indexados desde 0
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
const getDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses son indexados desde 0
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
module.exports = { getDateTimestamp, getDate };
