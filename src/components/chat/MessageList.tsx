import Image from "next/image"
import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useQuery } from "@tanstack/react-query"
import { useSelectedUser } from "@/store/useSelectedUser"
import { getMessages } from "@/actions/message.action"
import { cn } from "@/lib/utils"

import { Avatar, AvatarImage } from "../ui/avatar"
import { Message } from "@/db/dummy"

function MessageList() {
  const { selectedUser } = useSelectedUser()
  const { user: currentUser } = useKindeBrowserClient()

  const messageContainerRef = useRef<HTMLDivElement>(null)

  const { data: messages } = useQuery<Message[]>({
    queryKey: ["messages", selectedUser?.id],
    queryFn: async () => {
      if (!selectedUser || !currentUser) return []
      return await getMessages(selectedUser?.id, currentUser?.id)
    },
    enabled: !!selectedUser && !!currentUser,
  })

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div
      ref={messageContainerRef}
      className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
    >
      <AnimatePresence>
        {messages?.map((message, index) => (
          <motion.div
            key={`message-${message.id ?? index}`}
            layout
            initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
            transition={{
              opacity: { duration: 0.1 },
              layout: {
                type: "spring",
                bounce: 0.3,
                duration: messages.indexOf(message) * 0.5 + 0.2,
              },
            }}
            style={{ originX: 0.5, originY: 0.5 }}
            className={cn(
              "flex flex-col gap-2 p-4 whitespace-pre-wrap",
              message.senderId === currentUser.id ? "items-end" : "items-start"
            )}
          >
            <div className="flex gap-3 items-center">
              {message.senderId === selectedUser?.id && (
                <Avatar className="flex justify-center items-center">
                  <AvatarImage
                    src={selectedUser?.image}
                    alt={selectedUser?.name}
                    className="border-2 border-white rounded-full"
                  />
                </Avatar>
              )}
              {message.messageType === "text" ? (
                <span className="bg-accent p-3 rounded-md max-w-sm">
                  {message.content}
                </span>
              ) : (
                <Image
                  src={message.content}
                  alt="Message Image"
                  width={200}
                  height={200}
                  className="border p-2 rounded h-40 md:h-52 object-cover"
                />
              )}
              {message.senderId === currentUser.id && (
                <Avatar className="flex justify-center items-center">
                  <AvatarImage
                    src={currentUser.image}
                    alt={currentUser.name}
                    className="border-2 border-white rounded-full"
                  />
                </Avatar>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default MessageList
