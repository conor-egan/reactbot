export const fetchResponse = (message: string) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({ message: message }),
    headers: { "Content-Type": "application/json" },
  };

  return fetch("http://localhost:8080/chat", requestOptions);
};
