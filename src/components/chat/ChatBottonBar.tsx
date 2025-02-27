import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import {
  Image as ImageIcon,
  Loader,
  SendHorizonal,
  ThumbsUp,
} from "lucide-react"
import useSound from "use-sound"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetInfo,
} from "next-cloudinary"
import { DialogContent } from "@radix-ui/react-dialog"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { usePreferences } from "@/store/usePreferences"
import { sendMessageAction } from "@/actions/message.action"
import { useSelectedUser } from "@/store/useSelectedUser"
import { pusherClient } from "@/lib/pusher"
import type { Message } from "@/db/dummy"

import { Textarea } from "../ui/textarea"
import EmojiPicker from "./EmojiPicker"
import { Button } from "../ui/button"
import { Dialog, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"

function ChatBottonBar() {
  const [message, setMessage] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { soundEnabled } = usePreferences()
  const { selectedUser } = useSelectedUser()
  const { user: currentUser } = useKindeBrowserClient()
  const queryClient = useQueryClient()

  const [playSound1] = useSound("/sounds/keystroke1.mp3")
  const [playSound2] = useSound("/sounds/keystroke2.mp3")
  const [playSound3] = useSound("/sounds/keystroke3.mp3")
  const [playSound4] = useSound("/sounds/keystroke4.mp3")

  const playSoundFunctions = [playSound1, playSound2, playSound3, playSound4]

  const playRandomSound = () => {
    const randomIndex = Math.floor(Math.random() * playSoundFunctions.length)
    if (soundEnabled) playSoundFunctions[randomIndex]()
  }

  const { mutate: sendMessageMutate, isPending } = useMutation({
    mutationFn: sendMessageAction,
  })

  const handleMessageSend = () => {
    if (!message.trim()) return

    sendMessageMutate({
      content: message,
      messageType: "text",
      receiverId: selectedUser?.id ?? "",
    })
    setMessage("")
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleMessageSend()
    }

    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault()
      setMessage(message + "\n")
    }
  }

  useEffect(() => {
    const channelName = `${currentUser?.id}__${selectedUser?.id}`
      .split("__")
      .sort()
      .join("__")
    const channel = pusherClient?.subscribe(channelName)

    const handleMessage = (data: { message: Message }) => {
      queryClient.setQueryData(
        ["messages", selectedUser?.id],
        (oldMessages: Message[]) => {
          return [...oldMessages, data.message]
        }
      )
    }

    channel.bind("newMessage", handleMessage)

    return () => {
      channel?.unbind("newMessage", handleMessage)
      pusherClient?.unsubscribe(channelName)
    }
  }, [currentUser?.id, selectedUser?.id, queryClient])

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      {!message.trim() && (
        <CldUploadWidget
          signatureEndpoint="/api/sign-cloudinary-params"
          onSuccess={(result, { widget }) => {
            const url = (result.info as CloudinaryUploadWidgetInfo).secure_url
            if (url) {
              setImageUrl(url)
            }
            widget.close()
          }}
        >
          {({ open }) => {
            return (
              <ImageIcon
                size={20}
                className="cursor-pointer text-muted-foreground"
                onClick={() => open()}
              />
            )
          }}
        </CldUploadWidget>
      )}
      <Dialog
        open={!!imageUrl}
        onOpenChange={(open) => !open && setImageUrl("")}
      >
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md w-[90%] p-6 bg-background rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex justify-center items-center w-full">
            <div className="relative h-64 w-full">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Image Preview"
                  fill
                  className="object-contain"
                />
              )}
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-center">
            <Button
              type="submit"
              onClick={() => {
                if (imageUrl) {
                  sendMessageMutate({
                    content: imageUrl,
                    messageType: "image",
                    receiverId: selectedUser?.id ?? "",
                  })
                }
                setImageUrl("")
              }}
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AnimatePresence>
        <motion.div
          key="message-input"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.5 },
            layout: { type: "spring", bounce: 0.15 },
          }}
          className="w-full relative"
        >
          <Textarea
            ref={inputRef}
            autoComplete="off"
            placeholder="Type a message"
            rows={1}
            className="w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background min-h-0"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              playRandomSound()
            }}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute right-2 bottom-0.5">
            <EmojiPicker
              onChange={(emoji) => {
                setMessage(message + emoji)
                if (inputRef.current) inputRef.current.focus()
              }}
            />
          </div>
        </motion.div>
        {message.trim() ? (
          <Button
            key="send-button"
            className="h-9 w-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted- dark:hover:text-white shrink-0"
            variant="ghost"
            size="icon"
            onClick={handleMessageSend}
          >
            <SendHorizonal size={20} className="text-muted-foreground" />
          </Button>
        ) : (
          <Button
            key="thumbs-up-button"
            className="h-9 w-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted- dark:hover:text-white shrink-0"
            variant="ghost"
            size="icon"
            onClick={handleMessageSend}
          >
            {!isPending && (
              <ThumbsUp
                size={20}
                className="text-muted-foreground"
                onClick={() => {
                  sendMessageMutate({
                    content: "👍",
                    messageType: "text",
                    receiverId: selectedUser?.id ?? "",
                  })
                }}
              />
            )}
            {isPending && <Loader size={20} className="animate-spin" />}
          </Button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ChatBottonBar
