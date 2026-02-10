import MailchimpSingup from "@/components/MailchimpSignup";
import cx from "classix";

export const Footer = ({ social, horizontal, overlay, logo, backgroundColor = "#000000", children }) => {
  return (
    <footer
      className={cx("text-neutral-content",  overlay && "transparent relative lg:absolute bottom-[20px] max-w-[1600px] left-0 right-0 mx-auto")}
      style={{ backgroundColor: !overlay ? backgroundColor : undefined }}
    >
      <div className={cx("container", !overlay && "py-12")}>
        {!overlay && logo && (
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100px", height: "auto" }}
          />
        )}
        <div
          className={cx(
            !overlay && "mt-8 ",
            "flex flex-wrap items-center justify-between gap-6"
          )}
        >
          {social && (
            <div className="inline-flex gap-3">
              {social?.map((item, index) => (
                <div className="cursor-pointer rounded border border-base-content/10 p-2 transition-all hover:bg-base-content/10">
                  <FacebookIcon size={16} />
                </div>
              ))}
            </div>
          )}

          {/* <MailchimpSingup /> */}
        </div>

        {/* <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-medium">Features</h2>
            <div className="space-y-2">
              <div>
                <a
                  className="text-base transition-all duration-500 hover:text-primary"
                  href="#"
                >
                  Overview
                </a>
              </div>
              <div>
                <a
                  className="text-base transition-all duration-500 hover:text-primary"
                  href="#"
                >
                  Automation
                </a>
              </div>
              <div>
                <a
                  className="text-base transition-all duration-500 hover:text-primary"
                  href="#"
                >
                  Intelligent Personalization
                </a>
              </div>
              <div>
                <a
                  className="text-base transition-all duration-500 hover:text-primary"
                  href="#"
                >
                  Predictive Analytics
                </a>
              </div>
            </div>
          </div>
        </div> */}
        <div className={cx(horizontal && "flex flex-row w-full gap-10")}>
          {children}
        </div>
      </div>
    </footer>
  );
};
