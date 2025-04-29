/* eslint-disable @typescript-eslint/no-explicit-any */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

import "../sliderStyles.css";
import SectionHeader from "../shared/SectionHeader";
import ProjectCard from "./ProjectCard";
import useListing from "../hooks/listing/useLIsting";
import { Loader } from "lucide-react";

const LatestHouseListing = () => {
  const [listings, isPending] = useListing();

  const properties = listings?.data?.data || [];

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4 text-center mb-8">
        <SectionHeader
          title="Latest House Listings"
          subtitle="OUR PROPERTIES"
        />
      </div>

      <Swiper
        spaceBetween={30}
        grabCursor={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1,
            centeredSlides: false,
          },
          768: {
            slidesPerView: 2,
            centeredSlides: false,
          },
          1200: {
            slidesPerView: 4,
            centeredSlides: true,
            loop: true,
          },
        }}
        onSwiper={(swiper) => {
          swiper.el.addEventListener("mouseenter", () =>
            swiper.autoplay?.stop()
          );
          swiper.el.addEventListener("mouseleave", () =>
            swiper.autoplay?.start()
          );
        }}
      >
        {properties.map((property: any) => (
          <SwiperSlide key={property._id}>
            <ProjectCard
              _id={property._id}
              images={Object.values(property.images || {})}
              status={property.forRent && "For Rent" }
              price={parseInt(property.price)}
              title={property.title}
              location={property.address}
              beds={property.beds}
              baths={property.baths}
              sqft={property.sqft}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LatestHouseListing;
