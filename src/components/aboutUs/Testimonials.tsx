import Image from "next/image";
import SectionHeader from "../shared/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

function Testimonials() {
  const testimonials = [
    {
      quote: "BasaFinder made finding my new apartment a breeze. Highly recommended!",
      name: "Alex Johnson",
      role: "Tenant",
      img: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      quote: "Listing my property was straightforward, and I found a tenant in no time.",
      name: "Maria Gomez",
      role: "Landlord",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      quote: "The support team was incredibly helpful throughout the process.",
      name: "Liam Smith",
      role: "Tenant",
      img: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    {
      quote: "Thanks to BasaFinder, I rented out my flat within a week!",
      name: "Sophia Lee",
      role: "Landlord",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      quote: "Great experience! Very user-friendly and efficient.",
      name: "Daniel Kim",
      role: "Tenant",
      img: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      quote: "I appreciate the constant updates and communication. Fantastic service.",
      name: "Emily Davis",
      role: "Landlord",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <section className="py-20 lg:w-11/12 mx-auto">
      <div className="mx-auto px-4">
        <div className="space-y-4 text-center mb-12">
          <SectionHeader title="What our Users say" subtitle="OUR REVIEWS" />
        </div>

        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          
          autoplay={{ delay: 3000 }}
          modules={[Pagination, Autoplay]}
          className="mySwiper relative z-40 mb-36 py-20"  
          style={{
            paddingTop: "20px",   // Add padding directly here
            paddingBottom: "20px", // Add padding directly here
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="backdrop-blur-md bg-primary/5 rounded-xl shadow-md border border-white/20 p-6  text-center max-w-md mx-auto flex flex-col h-[250px]">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 mx-auto border border-black/10 rounded-full mb-4 object-cover"
                />
                <p className="text-gray-700 mb-4 italic flex-grow">&quot;{item.quote}&quot;</p>
                <h4 className="font-bold text-black">{item.name}</h4>
                <span className="text-sm text-gray-500">{item.role}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

export default Testimonials;
