const moment = require('moment-timezone');

export function handler(event, context, callback) {
  const days = [];
  const now = moment().tz("Europe/Zurich").toDate();
  for (let i = 1; i <= 24; i++) {
    if (
      now.getFullYear() === 2020 &&
      now.getMonth() === 11 &&
      i <= now.getDate()
    )
      days.push(true);
    else days.push(false);
  }
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      openDays: days,
    }),
  });
}
