import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="space-y-5 max-w-[700px] text-center">
        <h1 className="text-4xl mb-6">Inventory Management System</h1>
        <p>
          Tired of stockouts, surplus inventory, and confusing spreadsheets? It&apos;s time to take complete control. Our Inventory Management System is the powerful, intuitive solution designed to revolutionize how you track, manage, and optimize your entire stock lifecycle.
        </p>
        <div className="flex gap-4 mt-10 justify-center">

          <button className="px-10 py-2 bg-blue-600 rounded-lg text-white cursor-pointer text-md">
            <Link href={'/sign-in'}>Sign In</Link></button>
          <button className="px-6 py-4 border-3 text-blue-700 border-blue-600 cursor-pointer rounded-xl">Learn More</button>
        </div>
      </div>
    </div>
  );
}
