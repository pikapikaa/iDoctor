export const formatDate = (dateString: string) => {
  const dateObject = new Date(dateString);
  return dateObject.toLocaleDateString();
};

const padToTwoDigits = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const formatFullDate = (date: Date) => {
  const day = padToTwoDigits(date.getDate());
  const month = padToTwoDigits(date.getMonth() + 1);
  const year = date.getFullYear().toString().slice(-2);
  const hours = padToTwoDigits(date.getHours());
  const minutes = padToTwoDigits(date.getMinutes());

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};
