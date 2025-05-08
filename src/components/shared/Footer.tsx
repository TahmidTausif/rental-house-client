import Link from "next/link";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

import Image from "next/image";

function Footer() {
  return (
    <div className="bg-gradient-to-l from-primary/80 to-primary">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-14 mx-auto lg:w-5/6 text-gray-300">
        
        {/* Services */}
        <div data-aos="fade-down" data-aos-easing="ease-in-sine" data-aos-duration="500" className="text-center">
          <h2 className="text-xl font-bold mb-4 text-white">Services</h2>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-gray-100 transition">Property Selling</Link></li>
            <li><Link href="/" className="hover:text-gray-100 transition">Property Buying</Link></li>
            <li><Link href="/" className="hover:text-gray-100 transition">Architectural</Link></li>
            <li><Link href="/" className="hover:text-gray-100 transition">Advising</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div data-aos="fade-down" data-aos-easing="ease-in-sine" data-aos-delay="300" className="text-center">
          <h2 className="text-xl font-bold mb-4 text-white">Company</h2>
          <ul className="space-y-2">
            <li><a href="tel:01911309454" className="hover:text-gray-100 transition">Contact: 01911309454</a></li>
            <li><Link href="/about-us" className="hover:text-gray-100 transition">About us: Rental House Ltd.</Link></li>
            <li><a href="/" className="hover:text-gray-100 transition" target="_blank">Jobs: www.RentalHouse.com</a></li>
            <li><Link href="/" className="hover:text-gray-100 transition">Press Kit</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div data-aos="fade-down" data-aos-easing="ease-in-sine" data-aos-delay="600" className="text-center">
          <h2 className="text-xl font-bold mb-4 text-white">Legal</h2>
          <ul className="space-y-2">
            <li><Link href="/terms" className="hover:text-gray-100 transition">Terms of Use</Link></li>
            <li><Link href="/terms" className="hover:text-gray-100 transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-gray-100 transition">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/30 px-6  text-gray-800 lg:w-11/12 mx-auto py-6">
        <Link href="/" className="flex flex-col md:flex-row items-center gap-2">
          <Image src="/rental.png" alt="logo" width={60} height={40} className=" rounded-full bg-white/80" />
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white bg-clip-text">
              Rental <span className="text-white">House</span> Ltd.
            </h3>
            <p className="text-sm text-gray-300">Providing reliable source since 2025</p>
          </div>
        </Link>

        <div className="flex gap-4 text-2xl">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-3xl text-white transition"><FaTwitter /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-3xl text-white transition"><FaLinkedin /></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-3xl text-white transition"><FaFacebook /></a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
