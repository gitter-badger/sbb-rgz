const moment = require('moment-timezone');

export function handler(event, context, callback) {
  const day = event.queryStringParameters.day;
  const now = moment().tz("Europe/Zurich").toDate();
  let isOpen;
  if (now.getFullYear() !== 2020) isOpen = false;
  else if (now.getMonth() !== 11) isOpen = false;
  else if (day > now.getDate()) isOpen = false;
  else isOpen = true;
  callback(null, {
    statusCode: 200,
    headers: {
      'Cache-Control': 'no-cache no-store max-age=0 must-revalidate',
    },
    body: JSON.stringify({
      isOpen: isOpen,
    }),
  });
}
