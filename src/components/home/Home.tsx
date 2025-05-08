"use client";
import Testimonials from "../aboutUs/Testimonials";
import Marquee from "../aboutUs/Marquee";
import Banner from "../banner/Banner";
import LatestHouseListing from "../latestHouseListing/LatestHouseListing";
import Faq from "../shared/Faq";
import HowItWorks from "./HowItWorks";
import PlatformStats from "./PlatformStats";
import JoinUsCTA from "./JoinUsCTA";


const Home = () => {

  return (
    <div>
      <Banner/>
      <div className="mb-8 lg:mb-16 "></div>
      <HowItWorks/>
     <LatestHouseListing/>
     <div className="mb-6 lg:mb-12 "></div>
     <PlatformStats/>
    <Faq/>
    <Testimonials/>
    
    <Marquee/>
    <JoinUsCTA/>
    </div>
  );
};

export default Home;
