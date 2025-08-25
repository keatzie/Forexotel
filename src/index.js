export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response("It works! Try /hello or /menu", {
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }

    if (url.pathname === "/hello") {
      const xml = `<Response>
  <Say>Namaste! Ye Exotel trial call hai. Dhanyavaad.</Say>
  <Hangup/>
</Response>`;
      return new Response(xml, { headers: { "content-type": "text/xml; charset=utf-8" } });
    }

    if (url.pathname === "/menu") {
      const actionUrl = new URL("/after-gather", url.origin).toString();
      const xml = `<Response>
  <Say>Press 1 for flat steel bars. Press 2 for round steel bars.</Say>
  <Gather timeout="5" numDigits="1" method="GET" action="${actionUrl}"/>
</Response>`;
      return new Response(xml, { headers: { "content-type": "text/xml; charset=utf-8" } });
    }

    if (url.pathname === "/after-gather") {
      const d = new URL(request.url).searchParams.get("Digits") || "";
      let msg = "Invalid input.";
      if (d === "1") msg = "You chose flat steel bars.";
      else if (d === "2") msg = "You chose round steel bars.";
      const xml = `<Response><Say>${msg}</Say><Hangup/></Response>`;
      return new Response(xml, { headers: { "content-type": "text/xml; charset=utf-8" } });
    }

    return new Response("Not Found", { status: 404 });
  }
}
