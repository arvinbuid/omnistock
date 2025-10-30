import Image from "next/image";

import Picture from '../public/images/landing-image.svg';
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen bg-gray-50 relative flex items-center">
      {/* Top Rectangle */}
      <div className="h-24 md:h-36 bg-[#6C63FF] w-full rectangle-top absolute top-0"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center">
          <div className=" max-w-md pl-12 pr-6 space-y-5">
            <h1 className="text-violet-800 text-4xl md:text-5xl font-mono pl-2 font-semibold">Omnistock</h1>
            <p className="text-lg: md:text-xl">A powerful modern solution designed to improve how you track, manage, and optimize your entire stock lifecycle.</p>
            <Link href='/dashboard'>
              <button
                className="px-10 py-3 text-white bg-[#6C63FF] rounded-lg uppercase font-mono cursor-pointer text-sm md:text-md lg:text-lg hover:bg-[#524dc2] transition-colors ease-in"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
        {/* Right Section */}
        <div className="hidden md:flex justify-center">
          <Image
            src={Picture}
            alt="picture"
            width={0}
            height={0}
            className="w-[550px] h-auto"

          />
        </div>
      </div>

      {/* Bottom Rectangle */}
      <div className="h-24 md:h-36 bg-[#6C63FF] w-full rectangle-bottom absolute bottom-0"></div>
    </div>
  );
}
