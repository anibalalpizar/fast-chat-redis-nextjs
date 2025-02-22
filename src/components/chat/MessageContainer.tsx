import { useEffect } from "react"
import { useSelectedUser } from "@/store/useSelectedUser"

import ChatBottonBar from "./ChatBottonBar"
import MessageList from "./MessageList"
import ChatTopBar from "./ChatTopBar"

function MessageContainer() {
  const { setSelectedUser } = useSelectedUser()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedUser(null)
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [setSelectedUser])

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopBar />
      <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
        <MessageList />
        <ChatBottonBar />
      </div>
    </div>
  )
}

export default MessageContainer
