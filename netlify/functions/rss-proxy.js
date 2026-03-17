const RSS_URL = "https://feed.ausha.co/oRW46i5J5XxM";

function fetchRSS(url) {
  return new Promise((resolve, reject) => {
    const https = require("https");
    https.get(url, { headers: {
      "User-Agent": "carolinebindel.fr/rss-proxy (Netlify Function)",
      "Accept": "application/rss+xml, application/xml, text/xml, */*"
    }}, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchRSS(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => resolve(data));
      res.on("error", reject);
    }).on("error", reject);
  });
}

exports.handler = async function (event, context) {
  try {
    const xml = await fetchRSS(RSS_URL);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
      body: xml,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `RSS proxy error: ${error.message}`,
    };
  }
};
