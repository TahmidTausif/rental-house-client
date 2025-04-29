"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import React from "react";
import SecondaryButton from "../shared/SecondaryButton";

const Banner = () => {
  const router = useRouter();
  const slides = [
    "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
  ];

  // State for keyword input
  const [keywords, setKeywords] = React.useState("");

  const handleSearch = () => {
    const queryParams: Record<string, string> = {};

    if (keywords.trim()) {
      queryParams.searchTerm = keywords.trim();
    } else {
      return; // Prevent navigation if keyword is empty
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `/listing?${queryString}`;

    router.push(url);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Swiper for background images only */}
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          type: "progressbar",
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full"
      >
        {slides.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-screen relative">
              <Image
                src={url}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Fixed Overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-black/30 flex flex-col justify-center items-center text-center px-4">
        {/* Title & Description */}
        <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
          Luxury House Renting
        </h1>
        <p className="text-white text-base md:text-lg lg:text-xl font-medium md:w-2/3 mb-8">
          Discover smart, secure, and affordable rental homes tailored to your
          needs. Whether a tenant or a landlord, we connect you with the best
          housing solutions in just a few clicks.
        </p>

        {/* Search Panel */}
        {/* Search Panel */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 w-full max-w-3xl flex flex-col sm:flex-row items-stretch gap-4 mb-6 transition-all duration-300">
          {/* Keywords Input */}
          <input
            type="text"
            placeholder="Search for a property (e.g., Dhaka, Sylhet)"
            className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 text-gray-800"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />

          {/* Search Button */}
          <div>
            <SecondaryButton
              className={`${
                keywords.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSearch}
              disabled={keywords.trim() === ""}
            >
              Search Property
            </SecondaryButton>
          </div>
        </div>
      </div>

      {/* Swiper Navigation Buttons */}
      <div className="swiper-button-prev z-20"></div>
      <div className="swiper-button-next z-20"></div>

      {/* Ensure buttons appear above overlay */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          z-index: 30;
        }
      `}</style>
    </div>
  );
};

export default Banner;
