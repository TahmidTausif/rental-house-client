import Image from 'next/image'
import React from 'react'

function Hero({img, title}:{img:string, title:string}) {
  return (
   <div className="relative w-full h-[200px] md:h-[200px] lg:h-[300px]">
   {/* Background Image */}
   <Image
     src={img}
     alt="Terms Hero"
     className="w-full h-full object-cover absolute inset-0 z-0"
   />

   {/* Overlay with gradient for better dark mode support */}
   <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 to-black/20" />

   {/* Title Text */}
   <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
     <h1 className="text-white text-2xl md:text-4xl font-bold text-center drop-shadow-lg">
       {title}
     </h1>
   </div>
 </div>
  )
}

export default Hero