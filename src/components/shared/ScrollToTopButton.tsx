"use client";
import { useState, useEffect } from "react";

import { FaAngleDoubleUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed z-50 bottom-20 right-4 bg-white/40 hover:bg-white rounded-full border-2 border-primary w-[50px] h-[50px] transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex items-center justify-center text-2xl text-primary"
      >
        <FaAngleDoubleUp/>
      </button>
    )
  );
};

export default ScrollToTopButton;
