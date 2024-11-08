"use client";
import { Button, Drawer, Menu, Navbar } from "react-daisyui";
import { Menu as MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { anchorTags } from "@/helpers/anchorTags";
import { useSiteData } from "@/helpers/siteData";
import { useTheme } from "@/helpers/theme";

const MenuItems = ({ items, onClick, childItems }) => <>{childItems}</>;

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
        style={{ backgroundColor: "red" }}
        className={`container fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          !atTop
            ? "border top-0 xl:mt-4 mt-0 xl:rounded-full z-20 lg:bg-opacity-95 border-base-content/10 "
            : "border-base-content/10"
        }`}
      >
        <div className="">
          <Navbar className="px-0">
            <Navbar.Start className="gap-2">
              <Button
                shape="square"
                color="ghost"
                className="lg:hidden"
                onClick={() => setDrawerOpened(true)}
              >
                <MenuIcon className="inline-block text-xl" />
              </Button>
              <a
                href="#"
                className="text-brand-gradient text-2xl font-bold tracking-tighter"
              >
                <ReactSVG
                  src={siteData.logo}
                  beforeInjection={(svg) => {
                    svg.querySelectorAll("[fill]").forEach((element) => {
                      element.removeAttribute("fill");
                    });
                    svg.setAttribute(
                      "style",
                      `width: auto; height: 50px; fill: ${siteData.primaryColour} !important;`
                    );
                  }}
                />
              </a>
            </Navbar.Start>

            <Navbar.End className="hidden lg:flex w-full">
              <Menu horizontal size="sm" className="gap-2 px-1 items-center">
                <MenuItems items={sectionIds} childItems={children} />
              </Menu>
            </Navbar.End>
          </Navbar>
        </div>
      </div>

      {/* <div className="lg:hidden">
        <Drawer
          open={drawerOpened}
          onClickOverlay={() => setDrawerOpened(false)}
          side={
            <Menu className="min-h-full w-80 gap-2 bg-base-100 p-4 text-base-content">
              <Menu.Item className="font-medium">
                <a
                  href="index.html"
                  className="text-brand-gradient text-2xl font-bold tracking-tighter"
                >
                  <ReactSVG
                    src={siteData.logo}
                    beforeInjection={(svg) => {
                      svg.querySelectorAll("[fill]").forEach((element) => {
                        element.removeAttribute("fill");
                      });
                      svg.setAttribute(
                        "style",
                        `width: 300px; height: 300px; fill: ${siteData.primaryColour} !important;`
                      );
                    }}
                  />
                </a>
              </Menu.Item>
              <MenuItems
                items={sectionIds}
                onClick={() => setDrawerOpened(false)}
                // childItems={children}
              />
            </Menu>
          }
        />
      </div> */}
    </>
  );
};
