"use client";
import Testimonials from "../aboutUs/Testimonials";
import Marquee from "../aboutUs/Marquee";
import Banner from "../banner/Banner";
import LatestHouseListing from "../latestHouseListing/LatestHouseListing";
import Faq from "../shared/Faq";


const Home = () => {

  return (
    <div>
      <Banner/>
      <div className="mb-8 lg:mb-16 "></div>
     <LatestHouseListing/>
     <div className="mb-6 lg:mb-12 "></div>
    <Faq/>
    <Testimonials/>
    <Marquee/>
    </div>
  );
};

export default Home;
