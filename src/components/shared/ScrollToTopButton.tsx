"use client";
import { useState, useEffect } from "react";
import Btn from "../../assets/rental.png";
import Image from "next/image";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
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
        className="fixed bottom-28 right-4 hover:bg-secondary rounded-full border border-secondary w-[50px] h-[50px] transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
      >
        <Image
          className="w-full h-full"
          src={Btn}
          alt="About_Top_button"
          objectFit="cover"
          objectPosition="center"
        />
      </button>
    )
  );
};

export default ScrollToTopButton;
