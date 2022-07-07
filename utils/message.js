const hours = new Date(Date.now()).getHours();

const minutes = () => {
  const minutes = new Date(Date.now()).getMinutes();
  if (minutes <= 9) {
    let minute = `0 ${minutes}`;
    return minute;
  } else {
    return minutes;
  }
};

const time = `${hours} : ${minutes()}`;

export function formatMessage(userName, message) {
  return {
    userName,
    message,
    time,
  };
}
