"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { checkAuthStatus } from "@/actions/auth.actions"

function Page() {
  const router = useRouter()
  const { data } = useQuery({
    queryKey: ["authCheck"],
    queryFn: async () => await checkAuthStatus(),
  })

  useEffect(() => {
    if (data?.success) {
      router.push("/")
    }
  }, [data?.success, router])

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

export default Page
