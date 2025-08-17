"use client";
import { useEffect, useState } from "react";

export const useScrollDirection = (threshold = 10) => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      
      setIsAtTop(scrollY < 30);
      
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      
      setScrollDirection(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { scrollDirection, isAtTop };
};