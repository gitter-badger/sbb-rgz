const moment = require('moment-timezone');

export function handler(event, context, callback) {
  callback(null, {
    statusCode: 200,
    headers: {
      'Cache-Control': 'no-cache no-store max-age=0 must-revalidate',
    },
    body: JSON.stringify({
      isOpen: moment().tz("Europe/Zurich").toDate()
    }),
  });
}
