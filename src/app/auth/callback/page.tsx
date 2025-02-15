import { Loader } from "lucide-react"
import React from "react"

function page() {
  return (
    <div className="mt-20 w-full flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader className="w-10 h-10 animate-spin text-muted-foreground" />
        <h3 className="text-lg font-bold">Loading...</h3>
        <p>Redirecting you back to the app</p>
      </div>
    </div>
  )
}

export default page
