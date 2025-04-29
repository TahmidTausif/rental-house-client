import Image from "next/image";
import SectionHeader from "./SectionHeader";
import faq from "../../assets/images/faq.png";

function Faq() {
  return (
    <>
      <SectionHeader
        title="Frequently Asked Questions"
        subtitle="HAVE QUESTIONS?"
      ></SectionHeader>
      <section className="container mx-auto  mb-36 px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 lg:px-10">
          {/* FAQ Image */}
          <div className="flex items-center justify-center">
            <Image
              className="w-full max-w-md"
              src={faq}
              alt="Frequently Asked Questions"
            />
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-6 ">
            <details open className="shadow-md rounded-lg">
              <summary className="cursor-pointer px-5 py-4 text-lg font-semibold text-gray-800 bg-white hover:bg-gray-100 transition-all duration-300">
                How do I schedule a property viewing?
              </summary>
              <div className="px-6 pb-5 text-gray-600 text-base">
                You can schedule a viewing directly through our website by
                clicking Request Visit on the property page or by calling our
                support line.
              </div>
            </details>

            <details className="shadow-md rounded-lg">
              <summary className="cursor-pointer px-5 py-4 text-lg font-semibold text-gray-800 bg-white hover:bg-gray-100 transition-all duration-300">
                What documents are required to rent a house?
              </summary>
              <div className="px-6 pb-5 text-gray-600 text-base">
                Typically, you’ll need a valid ID, proof of income (like a
                salary slip), and a reference from your previous landlord or
                employer.
              </div>
            </details>

            <details className="shadow-md rounded-lg">
              <summary className="cursor-pointer px-5 py-4 text-lg font-semibold text-gray-800 bg-white hover:bg-gray-100 transition-all duration-300">
                Are utilities included in the rent?
              </summary>
              <div className="px-6 pb-5 text-gray-600 text-base">
                This depends on the property. Most listings will clearly mention
                whether water, gas, or electricity bills are included in the
                monthly rent.
              </div>
            </details>

            <details className="shadow-md rounded-lg">
              <summary className="cursor-pointer px-5 py-4 text-lg font-semibold text-gray-800 bg-white hover:bg-gray-100 transition-all duration-300">
                What is the minimum lease duration?
              </summary>
              <div className="px-6 pb-5 text-gray-600 text-base">
                Minimum lease durations vary per landlord, but most require at
                least a 6-month contract. Some properties offer flexible
                short-term leases.
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}

export default Faq;
