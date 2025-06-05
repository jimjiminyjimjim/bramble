// components/Mailchimp.js
import { MailchimpLegacy } from "./MailchimpLegacy";
import { MailchimpModern } from "./MailchimpModernAPI";

export function Mailchimp(props) {
  const { mailchimpFormCode } = props;

  if (mailchimpFormCode && mailchimpFormCode.trim() !== "") {
    return <MailchimpLegacy {...props} />;
  }

  return <MailchimpModern {...props} />;
}