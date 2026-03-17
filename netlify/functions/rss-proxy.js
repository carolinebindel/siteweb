const RSS_URL = "https://feed.ausha.co/oRW46i5J5XxM";

exports.handler = async function () {
  try {
    const response = await fetch(RSS_URL);
    if (!response.ok) {
      return { statusCode: response.status, body: "RSS fetch failed" };
    }
    const xml = await response.text();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600"
      },
      body: xml
    };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
