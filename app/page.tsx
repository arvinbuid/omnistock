import Image from "next/image"
import Picture from '../public/images/business-woman.jpg';

import localFont from 'next/font/local'
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const roobertBold = localFont({
  src: '../public/fonts/roobert-bold.otf'
})

const roobertRegular = localFont({
  src: '../public/fonts/roobert-regular.otf'
})

export default function Home() {
  return (
    <div className="h-screen w-screen bg-gray-50 relative flex items-center justify-center">
      <div className="w-[65%] max-w-[65%] h-[85%] bg-[#4642f0] rounded-2xl flex justify-between">
        <div className="max-w-xl p-10 md:p-16">
          <div className="flex-1">
            <div className="mb-4">
              <h1 className={`text-4xl md:text-6xl text-[#FBD0FF] font-bold leading-snug tracking-tight ${roobertBold.className}`}>Smarter inventory for business & teams</h1>
            </div>
            <p className={`pl-1 text-[#FBD0FF] ${roobertRegular.className} mb-5`}>
              Focused on simplifying and empowering efficient, real-time inventory control.
            </p>
            <Link href='/dashboard'>
              <button className={`px-4 py-3 text-sm text-black ${roobertBold.className} bg-[#FBD0FF] hover:bg-[#eba6f1] transition-colors rounded-xl cursor-pointer flex items-center gap-2 rounded-l-[18px] rounded-r-[20px]`}>
                Start Now
                <span><ChevronRight /></span>
              </button>
            </Link>
          </div>
        </div>
        {/* Image */}
        <div>
          <Image
            src={Picture}
            alt='Business Woman'
            className="rounded-r-2xl w-full h-full object-cover hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
}
