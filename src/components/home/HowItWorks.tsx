const HowItWorks = () => {
    const steps = [
      { title: "Browse Listings", desc: "Search for houses based on location, price, and amenities." },
      { title: "Send a Request", desc: "Contact the landlord or submit a rental request easily." },
      { title: "Get Approved", desc: "Communicate directly and get your booking confirmed." },
      { title: "Move In", desc: "Complete the process and start living in your new home." }
    ];
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow text-center">
                <div className="text-orange-500 text-3xl font-bold mb-2">{index + 1}</div>
                <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
  