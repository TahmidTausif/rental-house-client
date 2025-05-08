const JoinUsCTA = () => {
    return (
      <section className="py-20 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to find your next home?</h2>
          <p className="mb-8 text-lg">Join BasaFinder today and make renting stress-free, easy, and fast.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-100 transition">
              Sign Up as Tenant
            </button>
            <button className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-100 transition">
              List Your Property
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default JoinUsCTA;
  