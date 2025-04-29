import Image from "next/image"

function Testimonials() {
  return (
    <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-black dark:text-white text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "BasaFinder made finding my new apartment a breeze. Highly recommended!",
                name: "Alex Johnson",
                role: "Tenant",
                img: "https://randomuser.me/api/portraits/men/11.jpg"
              },
              {
                quote: "Listing my property was straightforward, and I found a tenant in no time.",
                name: "Maria Gomez",
                role: "Landlord",
                img: "https://randomuser.me/api/portraits/women/65.jpg"
              },
              {
                quote: "The support team was incredibly helpful throughout the process.",
                name: "Liam Smith",
                role: "Tenant",
                img: "https://randomuser.me/api/portraits/men/33.jpg"
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-6 shadow rounded text-center">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 mx-auto rounded-full mb-4 object-cover"
                />
                <p className="text-gray-700 dark:text-gray-300 mb-4">{item.quote}</p>
                <h4 className="font-bold text-black dark:text-white">{item.name}</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">{item.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Testimonials