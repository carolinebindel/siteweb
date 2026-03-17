const https = require("https");

module.exports = (req, res) => {
  https
    .get("https://feed.ausha.co/oRW46i5J5XxM", (feedRes) => {
      let data = "";
      feedRes.on("data", (chunk) => (data += chunk));
      feedRes.on("end", () => {
        res.setHeader("Content-Type", "application/xml; charset=utf-8");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Cache-Control", "public, max-age=300");
        res.status(200).send(data);
      });
    })
    .on("error", (err) => {
      res.status(502).send("Error: " + err.message);
    });
};
