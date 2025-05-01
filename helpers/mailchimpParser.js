export function parseMailchimpEmbed(html) {
    console.log("html", html);
    // Parse the markup
    const parser = new DOMParser();
    const doc    = parser.parseFromString(html, "text/html");
    const form   = doc.querySelector(
      'form[action*="list-manage.com/subscribe/post"]'
    );


    if (!form) return null;
  
    // Decode the action URL
    const action = form.getAttribute("action")?.replace(/&amp;/g, "&");
    const url    = new URL(action);
  
    // Data-centre (usX, euX…) = last sub-label before “list-manage”
    // (`nesta.us10.list-manage.com` → `us10`)
    const dc = url.hostname.split(".").slice(-3, -2)[0];
  
    // Core params
    const u  = url.searchParams.get("u");
    const id = url.searchParams.get("id");
  
    // Optional extras
    const tags      = doc.querySelector('input[name="tags"]')?.value;
    const honeypot  = doc.querySelector('input[name^="b_"]')?.name;
  
    return { host: url.hostname, dc, u, id, tags, honeypot };
  }