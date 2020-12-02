export function handler(event, context, callback) {
  const zurichTimeStr = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Zurich",
  });
  const zurichTime = new Date(zurichTimeStr);
  callback(null, {
    statusCode: 200,
    headers: {
      "Cache-Control": "no-cache no-store max-age=0 must-revalidate",
    },
    body: JSON.stringify({
      isOpen: zurichTime,
    }),
  });
}
