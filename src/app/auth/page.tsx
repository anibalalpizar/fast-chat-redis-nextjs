import Image from "next/image"

import AuthButtons from "@/components/ui/auth/AuthButtons"

function page() {
  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 flex overflow-hidden relative justify-center items-center dark:bg-gray-800 bg-gray-100">
        <Image
         src="vercel.svg" alt="logo" width={200} height={200} />
        <div className="flex flex-col gap-2 px-4 xl:ml-40 text-center md:text-start font-semibold">
          <h1 className="text-4xl">Chat App</h1>
          <p className="text-lg">Using nextjs - Redis</p>
          <AuthButtons/>
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden justify-center items-center hidden md:flex bg-noise">
        <Image src="next.svg" alt="logo" width={200} height={200} />
      </div>
    </div>
  )
}

export default page
