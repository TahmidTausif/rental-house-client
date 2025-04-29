"use client";

import Testimonials from "@/components/aboutUs/Testimonials";
import Marquee from "@/components/aboutUs/Marquee";
import React, { useEffect } from "react";
import Hero from "@/components/shared/Hero";
import Image from "next/image";


const AboutPage = () => {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const themeToSet = storedTheme || (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", themeToSet === "dark");
  }, []);

  return (
    <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">

    {/* Hero Section */}

    <Hero img='https://i.ibb.co.com/TDbMJ1Jz/house1.jpg' title="About US"/>
    
      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-black dark:text-white mb-6">BasaFinder&apos;s Journey</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            BasaFinder was established with the vision to streamline the rental process for both landlords and tenants.
            We saw how complicated renting could be and wanted to make a better experience for everyone.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            With a dedicated team and innovative technology, we aim to redefine the rental landscape.
            From listings to transactions, every step is designed to be easy, safe, and efficient.
          </p>
        </div>
      </section>

      {/* Horizontal Images */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Modern rental apartment"
            className="w-full h-64 object-cover rounded-lg shadow dark:border dark:border-gray-700"
          />
          <Image
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be"
            alt="Happy couple in rented home"
            className="w-full h-64 object-cover rounded-lg shadow dark:border dark:border-gray-700"
          />
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
            alt="Landlord meeting with tenant"
            className="w-full h-64 object-cover rounded-lg shadow dark:border dark:border-gray-700"
          />
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-gray-100 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-black dark:text-white text-center mb-12">Our Advantages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Listings",
                desc: "Easily list and manage your properties with our intuitive interface."
              },
              {
                title: "Secure Transactions",
                desc: "Experience safe and reliable payment processes for all your rentals."
              },
              {
                title: "24/7 Support",
                desc: "Our team is always ready to assist you with any queries or issues."
              },
            ].map((adv, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{adv.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials/>

      {/* Logo Marquee */}
      <Marquee/>

      {/* Call-to-Action Section */}
      <section className="bg-blue-600 py-20 text-white dark:bg-blue-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6">
            Whether a tenant or a landlord, BasaFinder is here to simplify your journey.
          </p>
          <a
            href="/signup"
            className="inline-block bg-white text-black font-semibold py-3 px-6 rounded-lg shadow hover:bg-gray-100 transition dark:bg-white dark:text-black dark:hover:bg-gray-300"
          >
            Join BasaFinder Today
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
