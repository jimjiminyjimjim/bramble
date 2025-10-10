"use client";
import { useTheme } from "@/helpers/theme";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import cx from "classix";
import { useEffect, useState } from "react";
import { Navbar } from "react-daisyui";
import { Blocks } from "@builder.io/sdk-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const MenuItems = ({ items, onClick, isMobile = false, pathname }) => {
  const handleAnchorClick = (e, url) => {
    e.preventDefault();
    const targetId = url.startsWith('#') ? url.slice(1) : url;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (onClick) onClick();
    }
  };

  return (
    <>
      {items?.map((item, index) => {
        console.log("Menu Item:", item);
        const isActive = pathname === item.url || (pathname === '/' && item.url === '/');
        const isExternal = item.linkType === "external";

        // Check if it's an anchor link (doesn't start with / or http)
        const isAnchor = !isExternal && item.url && !item.url.startsWith('/') && !item.url.startsWith('http');

        return (
          <li
            key={index}
            className={cx(
              "font-medium bg-transparent",
              "hover:font-bold",
              "active:font-bold",
              isMobile
                ? "text-lg py-2 border-b border-gray-200 last:border-b-0"
                : "!text-lg"
            )}
            onClick={!isAnchor ? onClick : undefined}
          >
            {isExternal ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cx(
                  isMobile ? "w-full text-center text-lg" : "!text-lg",
                  isActive && "font-bold"
                )}
              >
                {item.name}
              </a>
            ) : isAnchor ? (
              <a
                href={`#${item.url.startsWith('#') ? item.url.slice(1) : item.url}`}
                onClick={(e) => handleAnchorClick(e, item.url)}
                className={cx(
                  isMobile ? "w-full text-center text-lg" : "!text-lg",
                  isActive && "font-bold"
                )}
              >
                {item.name}
              </a>
            ) : (
              <Link
                href={item.url || "/"}
                className={cx(
                  isMobile ? "w-full text-center text-lg" : "!text-lg",
                  isActive && "font-bold"
                )}
              >
                {item.name}
              </Link>
            )}
          </li>
        );
      })}
    </>
  );
};

export const TopbarNew = ({
  logo,
  logoUrl = "/",
  navItems,
  children,
  theme,
  backgroundColor,
  builderBlock,
  builderComponents,
  builderContext,
  builderLinkComponent,
  maxWidth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollDirection, isAtTop } = useScrollDirection();
  const colors = useTheme(theme);
  const pathname = usePathname();

  console.log("navItems", navItems);


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isVisible = isAtTop || scrollDirection === "up";

    const builderAttributes = builderBlock ? {
    'builder-id': builderBlock.id,
    'builder-model': builderBlock.model,
    'data-builder-component': 'v2: Topbar New'
  } : {};

  // Set CSS custom property for topbar height to push content down
  useEffect(() => {
    document.documentElement.style.setProperty('--topbar-height', '60px');
    document.documentElement.style.setProperty('--topbar-height-md', '80px');
    document.documentElement.style.setProperty('--topbar-height-lg', '100px');
    
    return () => {
      document.documentElement.style.removeProperty('--topbar-height');
      document.documentElement.style.removeProperty('--topbar-height-md');
      document.documentElement.style.removeProperty('--topbar-height-lg');
    };
  }, []);

  return (
    <>
      {/* Spacer to push content below fixed topbar */}
      <div className="h-[80px] lg:h-[100px]" />
      
      <div
        {...builderAttributes}
        style={{
          backgroundColor: backgroundColor || colors?.primary,
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease-in-out"
        }}
        className="inset-x-0 top-0 !z-50 fixed w-full h-[80px] lg:h-[100px]"
      >
        <div className="flex items-center  py-4">
          <Navbar
            className="w-full flex items-center mx-auto !px-6"
            style={{ maxWidth: maxWidth }}
          >
            <Navbar.Start className="gap-2 flex items-center">
              <Link href={logoUrl} className="min-w-0 flex items-center">
                <div
                  style={{
                    height: "36px",
                    minHeight: "36px",
                    width: "auto",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Blocks
                    parent={builderBlock.id}
                    path="component.options.logo"
                    registeredComponents={builderComponents}
                    context={builderContext}
                    linkComponent={builderLinkComponent}
                    blocks={logo}
                  />
                </div>
              </Link>
            </Navbar.Start>

            <Navbar.End className="w-full">
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center w-full justify-end">
                <ul className="gap-6 px-1 items-center flex flex-row">
                  <MenuItems items={navItems} pathname={pathname} />
                </ul>
                {children && <div className="ml-10">{children}</div>}
              </div>

              {/* Mobile Menu Button */}
              {navItems && navItems.length > 0 && (
                <div className="md:hidden flex items-center w-full justify-end relative z-50">
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 w-10 h-10 flex flex-col justify-center items-center"
                    aria-label="Toggle mobile menu"
                  >
                  <div className="w-6 h-5 relative flex flex-col justify-center items-center">
                    {/* Top line */}
                    <span
                      className={`block h-0.5 w-full bg-current transition-all duration-300 absolute ${
                        mobileMenuOpen
                          ? "rotate-45 translate-y-0"
                          : "rotate-0 -translate-y-2"
                      }`}
                    />
                    {/* Middle line */}
                    <span
                      className={`block h-0.5 w-full bg-current transition-all duration-300 absolute ${
                        mobileMenuOpen ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    {/* Bottom line */}
                    <span
                      className={`block h-0.5 w-full bg-current transition-all duration-300 absolute ${
                        mobileMenuOpen
                          ? "-rotate-45 translate-y-0"
                          : "rotate-0 translate-y-2"
                      }`}
                    />
                  </div>
                </button>
              </div>
              )}
            </Navbar.End>
          </Navbar>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" style={{ top: "50px" }}>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeMobileMenu}
          />

          {/* Menu Content */}
          <div
            className="relative bg-white w-full h-full shadow-lg flex flex-col"
            style={{ backgroundColor: backgroundColor || colors?.primary || "white" }}
          >
            <div className="container pt-4 pb-4 flex-1 flex flex-col">
              <ul className="space-y-0 flex-1">
                <MenuItems
                  items={navItems}
                  onClick={closeMobileMenu}
                  isMobile={true}
                  pathname={pathname}
                />
              </ul>

              {/* Children in mobile menu */}
              {children && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
