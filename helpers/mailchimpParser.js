import { DOMParser } from 'xmldom';

export function parseMailchimpEmbed(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Get forms and find the one with the matching action
  const forms = doc.getElementsByTagName('form');
  let form = null;
  for (let i = 0; i < forms.length; i++) {
    const action = forms[i].getAttribute('action');
    if (action && action.includes('list-manage.com/subscribe/post')) {
      form = forms[i];
      break;
    }
  }
  if (!form) return null;

  const action = form.getAttribute('action')?.replace(/&amp;/g, '&');
  const url = new URL(action);

  const dc   = url.hostname.split('.').slice(-3, -2)[0];
  const u    = url.searchParams.get('u');
  const id   = url.searchParams.get('id');
  
  // You can search for inputs similarly
  const inputs = doc.getElementsByTagName('input');
  let tags, honeypot;
  for (let i = 0; i < inputs.length; i++) {
    const nameAttr = inputs[i].getAttribute('name');
    if (nameAttr === 'tags') {
      tags = inputs[i].getAttribute('value');
    }
    if (nameAttr && nameAttr.startsWith('b_')) {
      honeypot = nameAttr;
    }
  }

  return { host: url.hostname, dc, u, id, tags, honeypot };
}