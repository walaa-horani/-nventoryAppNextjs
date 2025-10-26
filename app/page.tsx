import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-purple-50 to-purple-100">

   
    <div className="container mx-auto px-4 py-16">
    
      <div className="text-center  ">

      
     <h1 className="text-purple-700 text-6xl">Inventory Management</h1>
     <p className="mt-4 mb-6 text-gray-600 text-2xl">Make stock tracking effortless: one intuitive tool to monitor products, prevent shortages, and reveal trends you can act on.</p>

      <Link className="bg-purple-700 text-white px-8 py-3 rounded-lg" href="/sign-in">Signin</Link>
        </div>
    </div>
     </div>
  );
}
