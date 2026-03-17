export default async () => {
  try {
    const res = await fetch("https://feed.ausha.co/oRW46i5J5XxM");
    if (!res.ok) {
      return new Response("RSS fetch failed", { status: 502 });
    }
    const xml = await res.text();
    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
};
