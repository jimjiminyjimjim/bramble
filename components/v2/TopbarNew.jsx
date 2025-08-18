"use client";
import { useTheme } from "@/helpers/theme";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import cx from "classix";
import { useEffect, useState } from "react";
import { Menu, Navbar } from "react-daisyui";
import { Blocks } from "@builder.io/sdk-react";

const MenuItems = ({ items, onClick, isMobile = false }) => (
  <>
    {items?.map((item, index) => {
      console.log("Menu Item:", item);
      return (
      <Menu.Item
        key={index}
        className={cx(
          "font-medium !bg-transparent",
          isMobile
            ? "text-lg py-2 border-b border-gray-200 last:border-b-0"
            : "!text-lg"
        )}
        onClick={onClick}
      >
        <a
          href={item.url}
          target={item.external ? "_blank" : "_self"}
          className={isMobile ? "w-full text-center text-lg" : "!text-lg"}
        >
          {item.name}
        </a>
      </Menu.Item>
    )})}
  </>
);

export const TopbarNew = ({
  logo,
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
              <a href="#" className="min-w-0 flex items-center">
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
              </a>
            </Navbar.Start>

            <Navbar.End className="w-full">
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center w-full justify-end">
                <Menu horizontal size="sm" className="gap-2 px-1 items-center">
                  <MenuItems items={navItems} />
                </Menu>
                {children && <div className="ml-10">{children}</div>}
              </div>

              {/* Mobile Menu Button */}
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
              <Menu className="space-y-0 flex-1">
                <MenuItems
                  items={navItems}
                  onClick={closeMobileMenu}
                  isMobile={true}
                />
              </Menu>

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
