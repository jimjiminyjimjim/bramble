"use client";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import cx from "classix";
import { useEffect, useState } from "react";
import { Navbar } from "react-daisyui";
import { usePathname } from "next/navigation";
import Link from "next/link";
import brambleLogo from "@/assets/images/logo/bramble-logo.webp";

const MenuItems = ({ items, onClick, isMobile = false, pathname, textColor }) => {
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
        // Support both 'label' (Builder.io section) and 'name' (legacy)
        const displayText = item.label || item.name;
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
                style={{ color: textColor }}
                className={cx(
                  isMobile ? "w-full text-center text-lg" : "!text-lg",
                  isActive && "font-bold"
                )}
              >
                {displayText}
              </a>
            ) : isAnchor ? (
              <a
                href={`#${item.url.startsWith('#') ? item.url.slice(1) : item.url}`}
                onClick={(e) => handleAnchorClick(e, item.url)}
                style={{ color: textColor }}
                className={cx(
                  isMobile ? "w-full text-center text-lg" : "!text-lg",
                  isActive && "font-bold"
                )}
              >
                {displayText}
              </a>
            ) : (
              <Link
                href={item.url || "/"}
                style={{ color: textColor }}
                className={cx(
                  isMobile ? "w-full text-center text-lg" : "!text-lg",
                  isActive && "font-bold"
                )}
              >
                {displayText}
              </Link>
            )}
          </li>
        );
      })}
    </>
  );
};

export const TopbarNew = ({
  logoUrl = "/",
  navItems,
  children,
  backgroundColor = "#FFFFFF",
  textColor = "#000000",
  builderBlock,
  maxWidth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollDirection, isAtTop } = useScrollDirection();
  const pathname = usePathname();


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
          backgroundColor: backgroundColor,
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease-in-out"
        }}
        className="inset-x-0 top-0 !z-50 fixed w-full min-h-[80px] lg:min-h-[100px]"
      >
        <div className="flex items-center py-4">
          <Navbar
            className="w-full flex items-center mx-auto !px-6"
            style={{ maxWidth: maxWidth }}
          >
            <Navbar.Start className="gap-2 flex items-center">
              <Link href={logoUrl} className="min-w-0 flex items-center">
                <img
                  src={brambleLogo.src}
                  alt="Bramble"
                  className="h-[50px] lg:h-[60px] w-auto"
                />
              </Link>
            </Navbar.Start>

            <Navbar.End className="w-full">
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center w-full justify-end gap-6">
                {navItems && navItems.length > 0 && (
                  <ul className="gap-6 px-1 items-center flex flex-row">
                    <MenuItems items={navItems} pathname={pathname} textColor={textColor} />
                  </ul>
                )}
                {/* Children slot - drag Builder.io components here */}
                {children && (
                  <div className="flex items-center gap-4">
                    {children}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              {(navItems?.length > 0 || children) && (
                <div className="md:hidden flex items-center w-full justify-end relative z-50">
                  <button
                    onClick={toggleMobileMenu}
                    style={{ color: textColor }}
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
            style={{ backgroundColor: backgroundColor }}
          >
            <div className="container pt-4 pb-4 flex-1 flex flex-col">
              <ul className="space-y-0 flex-1">
                <MenuItems
                  items={navItems}
                  onClick={closeMobileMenu}
                  isMobile={true}
                  pathname={pathname}
                  textColor={textColor}
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
