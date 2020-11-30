export function handler(event, context, callback) {
  const day = event.queryStringParameters.day;
  const now = new Date();
  let isOpen;
  if (now.getFullYear() !== 2020) isOpen = false;
  else if (now.getMonth() !== 11) isOpen = false;
  else if (day > now.getDate()) isOpen = false;
  else isOpen = true;
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      isOpen: isOpen,
    }),
  });
}
