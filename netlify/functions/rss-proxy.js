const https = require("https");

exports.handler = async function () {
  return new Promise((resolve) => {
    https
      .get("https://feed.ausha.co/oRW46i5J5XxM", (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({
            statusCode: 200,
            headers: {
              "Content-Type": "application/xml; charset=utf-8",
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "public, max-age=300",
            },
            body: data,
          });
        });
      })
      .on("error", (err) => {
        resolve({
          statusCode: 502,
          body: "Error: " + err.message,
        });
      });
  });
};
