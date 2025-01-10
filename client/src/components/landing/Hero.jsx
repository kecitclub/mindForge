import heroImg from "../../assets/heroImg.png";

export function Hero() {
  return (
    <section className="relative bg-black min-h-screen px-4 py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Get immediate help with our{" "}
              <span className="text-red-600">advanced emergency</span> response
              system.
            </h1>

            <h2 className="text-xl md:text-2xl text-white">
              We&apos;re here <span className="text-red-600">24/7</span> to
              ensure your safety
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed">
              Our advanced emergency response system ensures rapid assistance
              anytime, anywhere. Operating 24/7, it prioritizes your safety by
              connecting you to professional help instantly, offering peace of
              mind during critical moments.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Get Started Now
              </button>
              <button className="px-8 py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-red-900/40 to-black rounded-xl h-[450px]">
              <img
                src={heroImg}
                alt="heroImg"
                className="w-full h-full object-cover rounded-xl"
              />
              <button className="absolute bottom-6 text-white right-6 bg-red-600  px-6 py-3 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Live Response Active
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <span className="text-2xl font-bold text-red-600">24/7</span>
            <span className="text-white ml-2">Support</span>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold text-red-600">&lt; 5min</span>
            <span className="text-white ml-2">Response</span>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold text-red-600">100%</span>
            <span className="text-white ml-2">Coverage</span>
          </div>
        </div>
      </div>

      {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[50px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div> */}
    </section>
  );
}
