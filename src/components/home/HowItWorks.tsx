import { Search, MessageCircle, CheckCircle, Home } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";

const HowItWorks = () => {
  const steps = [
    {
      title: "Browse Listings",
      desc: "Search for houses based on location, price, and amenities.",
      icon: <Search className="w-12 h-12 mx-auto text-secondary" />,
    },
    {
      title: "Send a Request",
      desc: "Contact the landlord or submit a rental request easily.",
      icon: <MessageCircle className="w-12 h-12 mx-auto text-secondary" />,
    },
    {
      title: "Get Approved",
      desc: "Communicate directly and get your booking confirmed.",
      icon: <CheckCircle className="w-12 h-12 mx-auto text-secondary" />,
    },
    {
      title: "Move In",
      desc: "Complete the process and start living in your new home.",
      icon: <Home className="w-12 h-12 mx-auto text-secondary" />,
    },
  ];

  return (
    <section className="py-10 pb-20 px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
      <div className="space-y-4 text-center mb-8">
        <SectionHeader
          title="How It Works"
          subtitle="OUR PROCEDURE"
        />
      </div>

        <div className="grid md:grid-cols-2 lg:col-end-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:scale-110 transition-all duration-300 text-center">
              
              <div className="mb-4">
                {step.icon}
              </div>
              <h4 className="text-2xl text-primary font-semibold mb-2">{step.title}</h4>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
