import { ReactSVG } from "react-svg";
import cx from "classix";
import { FaTiktok, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export const FooterNew = ({
  logo,
  backgroundColor,
  textColor,
  copyright,
  tiktokUrl,
  instagramUrl,
  facebookUrl,
  twitterUrl,
  horizontal,
  overlay,
  children
}) => {
  const logoSrc = logo;

  // Collect social links that have URLs
  const socialLinks = [
    { url: tiktokUrl, icon: FaTiktok, label: "TikTok" },
    { url: instagramUrl, icon: FaInstagram, label: "Instagram" },
    { url: facebookUrl, icon: FaFacebook, label: "Facebook" },
    { url: twitterUrl, icon: FaTwitter, label: "Twitter" }
  ].filter(link => link.url && link.url.trim() !== "");

  return (
    <footer
      className={cx("text-neutral-content",  overlay && "transparent relative lg:absolute bottom-[20px] max-w-[1600px] left-0 right-0 mx-auto")}
      style={{
        backgroundColor: backgroundColor,
        color: textColor || "#ffffff"
      }}
    >
      <div className={cx("container", !overlay && "py-12")}>
        {/* Logo at top left */}
        {logoSrc && (
          <div className="mb-8">
            {logoSrc.endsWith && logoSrc.endsWith('.svg') ? (
              <ReactSVG
                src={logoSrc}
                beforeInjection={(svg) => {
                  // Set all fills to text color
                  svg.querySelectorAll("*").forEach((element) => {
                    if (element.hasAttribute("fill") && element.getAttribute("fill") !== "none") {
                      element.setAttribute("fill", textColor || "#ffffff");
                    }
                    if (element.hasAttribute("stroke") && element.getAttribute("stroke") !== "none") {
                      element.setAttribute("stroke", textColor || "#ffffff");
                    }
                  });
                  svg.setAttribute(
                    "style",
                    `width: 100px; height: auto;`
                  );
                }}
              />
            ) : (
              <img
                src={logoSrc}
                alt="Logo"
                style={{ width: "100px", height: "auto" }}
              />
            )}
          </div>
        )}

        {/* Children content area */}
        <div className={cx(horizontal && "flex flex-row w-full gap-10", !overlay && "mt-8")}>
          {children}
        </div>

        {/* Footer bottom - Copyright and Social Icons */}
        {(copyright || socialLinks.length > 0) && (
          <div
            className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t pt-6"
            style={{ borderColor: `${textColor || "#ffffff"}20` }}
          >
            {/* Copyright - bottom left */}
            <div className="text-sm opacity-70">
              © {copyright || "All rights reserved"} {new Date().getFullYear()}
            </div>

            {/* Social Icons - bottom right */}
            {socialLinks.length > 0 && (
              <div className="inline-flex gap-3">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="cursor-pointer rounded-full p-2 transition-all hover:opacity-80"
                      style={{
                        backgroundColor: textColor || "#ffffff"
                      }}
                    >
                      <Icon
                        size={18}
                        style={{ color: backgroundColor || "#000000" }}
                      />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  );
};
