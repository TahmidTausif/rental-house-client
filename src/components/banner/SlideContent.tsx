import Image from "next/image";  // Import Image from Next.js

interface SlideContentProps {
  imageUrl: string;
}

const SlideContent = ({ imageUrl }: SlideContentProps) => {
  return (
    <div
      className="relative w-full h-[700px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 flex flex-col justify-center items-center text-center px-4">
        {/* Title & Description */}
        <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
          Luxury House Renting
        </h1>
        <p className="text-white text-base md:text-lg lg:text-xl font-medium md:w-2/3 mb-8">
          Discover smart, secure, and affordable rental homes tailored to your
          needs. Whether a tenant or a landlord, we connect you with the
          best housing solutions in just a few clicks.
        </p>

        {/* Search Panel */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 w-full max-w-5xl flex flex-col lg:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Location"
            className="w-full lg:w-1/3 p-3 border border-gray-300 rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <select
            defaultValue=""
            className="w-full lg:w-1/3 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="" disabled className="text-black">
              Price Range
            </option>
            <option value="$500-$1000" className="text-black">
              $500 - $1000
            </option>
            <option value="$1000-$2000" className="text-black">
              $1000 - $2000
            </option>
          </select>

          <select
            defaultValue=""
            className="w-full lg:w-1/3 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="" disabled className="text-black">
              Bed & Baths
            </option>
            <option value="2-1" className="text-black">
              2 Bed / 1 Bath
            </option>
            <option value="3-2" className="text-black">
              3 Bed / 2 Bath
            </option>
          </select>

          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-md hover:shadow-lg hover:from-red-700 hover:to-red-600 transition duration-300">
            Search Property
          </button>
        </div>

        {/* Avatars & Reviews */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <Image
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="avatar1"
              width={40}
              height={40}
            />
            <Image
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/women/2.jpg"
              alt="avatar2"
              width={40}
              height={40}
            />
            <Image
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/men/3.jpg"
              alt="avatar3"
              width={40}
              height={40}
            />
            <Image
              className="w-10 h-10 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/women/4.jpg"
              alt="avatar4"
              width={40}
              height={40}
            />
          </div>
          <span className="text-white font-medium text-lg">
            29k+ Positive Reviews
          </span>
        </div>
      </div>
    </div>
  );
};

export default SlideContent;
