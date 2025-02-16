import ChatLayout from "@/components/chat/ChatLayout"
import PreferenceTab from "@/components/PreferenceTab"
import { redis } from "@/lib/db"
import { cookies } from "next/headers"

async function page() {
  const cookieData = await cookies()
  const layout = cookieData.get("react-resizable-panel:layout")
  const defaultLayout = layout?.value ? JSON.parse(layout.value) : undefined

  await redis.set("foo", "bar")

  const data = await redis.get("foo")
  console.log(data)

  return (
    <main className="flex h-screen flex-col items-center justify-center p-4 md:px-24 py-32 gap-4">
      <PreferenceTab />
      <div
        className="absolute top-0 z-[-2] h-screen w-screen dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#000000_1px)] 
				dark:bg-[size:20px_20px] bg-[#ffffff] bg-[radial-gradient(#00000033_1px,#ffffff_1px)] bg-[size:20px_20px]"
        aria-hidden="true"
      />
      <div className="z-10 border rounded-lg max-w-5xl w-full min-h-[85vh] text-sm lg:flex">
        <ChatLayout defaultLayout={defaultLayout} />
      </div>
    </main>
  )
}

export default page
