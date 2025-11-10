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
          <div className=" max-w-lg pl-12 pr-6 space-y-4">
            <h1 className="text-violet-800 text-[3rem] lg:text-[3.5rem] tracking-wide inline-block font-semibold">Omnistock</h1>
            <p className="text-lg md:text-xl tracking-wide">A powerful modern solution designed to improve how you track, manage, and optimize your entire stock lifecycle.</p>
            <Link href='/dashboard'>
              <button
                className="px-10 py-3 text-white bg-[#6C63FF] rounded-full mt-4"
              >
                <span className="uppercase font-mono cursor-pointer text-lg hover:bg-[#524dc2] transition-colors ease-in leading-5 sm:leading-6">Get Started</span>
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
            className="w-auto px-4"

          />
        </div>
      </div>

      {/* Bottom Rectangle */}
      <div className="h-24 md:h-36 bg-[#6C63FF] w-full rectangle-bottom absolute bottom-0"></div>
    </div>
  );
}
