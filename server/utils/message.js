const time =
  new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();

export function formatMessage(userName, message) {
  return {
    userName,
    message,
    time,
  };
}
