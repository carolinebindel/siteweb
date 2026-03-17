const RSS_URL = "https://feed.ausha.co/oRW46i5J5XxM";

exports.handler = async function (event, context) {
  try {
    const response = await fetch(RSS_URL, {
      headers: {
        "User-Agent": "carolinebindel.fr/rss-proxy (Netlify Function)",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: `RSS fetch failed: ${response.statusText}`,
      };
    }

    const xml = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Access-Control-Allow-Origin": "https://carolinebindel.fr",
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
