"use client";
import { anchorTags } from "@/helpers/anchorTags";
import { useSiteData } from "@/helpers/siteData";
import { useTheme } from "@/helpers/theme";
import cx from "classix";
import { useEffect, useState } from "react";
import { Menu, Navbar } from "react-daisyui";
import { ReactSVG } from "react-svg";

const MenuItems = ({ items, onClick, isDesktop = false }) => (
  <>
    {items?.map((item, index) => (
      <Menu.Item 
        key={index} 
        className={cx("font-medium", isDesktop ? "!text-lg" : "")} 
        onClick={onClick}
      >
        <a 
          href={`#${anchorTags(item).id}`}
          className={isDesktop ? "!text-lg" : ""}
        >
          {item}
        </a>
      </Menu.Item>
    ))}
  </>
);

export const Topbar = ({ logoOverride, children, theme }) => {
  const siteData = useSiteData();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [sectionIds, setSectionIds] = useState([]);
  const colors = useTheme(theme);

  useEffect(() => {
    const onWindowScroll = () => {
      setAtTop(window.pageYOffset < 30);
    };
    window.addEventListener("scroll", onWindowScroll);
    onWindowScroll();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sections = document.querySelectorAll("section");
      const ids = Array.from(sections)
        .map((section) => section.getAttribute("id"))
        .filter((id) => id); // Filter out empty ids
      setSectionIds(ids);
    }
  }, []);

  return (
    <>
      <div
        id="navbar-wrapper"
        style={{ backgroundColor: colors?.primary }}
        className={`bg-transparent inset-x-0 top-0 !z-50 transition-all duration-500 ${
          !atTop ? "py-0" : "py-4"
        }`}
      >
        <div className="container">
          <Navbar className="px-0">
            <Navbar.Start className="gap-2">
              <a
                href="#"
                className={cx(
                  `min-w-0 min-h-0 max-h-[80px] transition-all duration-300 block`,
                  atTop ? "max-h-[50px]" : null
                )}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%"
                }}
              >
                {logoOverride ? (
                  <img
                    src={logoOverride}
                    alt="Logo"
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <ReactSVG
                    src={siteData.logo}
                    beforeInjection={(svg) => {
                      svg.querySelectorAll("[fill]").forEach((element) => {
                        siteData.logoRecolour &&
                          element.removeAttribute("fill");
                      });
                      svg.setAttribute(
                        "style",
                        `width: 100%; height: auto; object-fit: cover; ${siteData.logoRecolour ? `fill: ${siteData.primaryColour}` : null}`
                      );
                    }}
                    className="w-full h-auto"
                  />
                )}
              </a>
            </Navbar.Start>

            <Navbar.End className="w-full">
              <div className="flex items-center w-full justify-end">
                <div className="hidden md:block">
                  <Menu horizontal size="sm" className="gap-2 px-1 items-center">
                    <MenuItems items={sectionIds} isDesktop={true} />
                  </Menu>
                </div>
                <div className="md:hidden">
                  <Menu horizontal size="sm" className="gap-2 px-1 items-center">
                    <MenuItems items={sectionIds} />
                  </Menu>
                </div>
                {children && <div className="ml-2">{children}</div>}
              </div>
            </Navbar.End>
          </Navbar>
        </div>
      </div>
    </>
  );
};
