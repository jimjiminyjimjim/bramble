"use client";
import { Button, Drawer, Menu, Navbar } from "react-daisyui";
import { Menu as MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { anchorTags } from "@/helpers/anchorTags";
import { useSiteData } from "@/helpers/siteData";
import { useTheme } from "@/helpers/theme";
import cx from "classix";
const MenuItems = ({ items, onClick }) => (
  <>
    {items?.map((item, index) => (
      <Menu.Item key={index} className="font-medium" onClick={onClick}>
        <a href={`#${anchorTags(item).id}`}>{item}</a>
      </Menu.Item>
    ))}
  </>
);

export const Topbar = ({ children, theme }) => {
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
        className={`bg-transparent fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
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
                  height: "100%",
                }}
              >
                <ReactSVG
                  src={siteData.logo}
                  beforeInjection={(svg) => {
                    svg.querySelectorAll("[fill]").forEach((element) => {
                      element.removeAttribute("fill");
                    });
                    svg.setAttribute(
                      "style",
                      `width: 100%; height: auto; object-fit: cover; fill: ${siteData.primaryColour};`
                    );
                  }}
                  className="w-full h-auto"
                />
              </a>
            </Navbar.Start>

            <Navbar.End className="w-full">
              <Menu horizontal size="sm" className="gap-2 px-1 items-center">
                <MenuItems items={sectionIds} />
              </Menu>
              <div className="ml-auto">{children}</div>
            </Navbar.End>
          </Navbar>
        </div>
      </div>
    </>
  );
};
