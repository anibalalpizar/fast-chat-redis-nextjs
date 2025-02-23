import { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Image as ImageIcon,
  Loader,
  SendHorizonal,
  ThumbsUp,
} from "lucide-react"
import useSound from "use-sound"
import { useMutation } from "@tanstack/react-query"

import { Textarea } from "../ui/textarea"
import EmojiPicker from "./EmojiPicker"
import { Button } from "../ui/button"
import { usePreferences } from "@/store/usePreferences"
import { sendMessageAction } from "@/actions/message.action"
import { useSelectedUser } from "@/store/useSelectedUser"

function ChatBottonBar() {
  const [message, setMessage] = useState("")
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { soundEnabled } = usePreferences()
  const { selectedUser } = useSelectedUser()

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
      receiverId: selectedUser?.id,
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

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      {!message.trim() && (
        <ImageIcon size={20} className="cursor-pointer text-muted-foreground" />
      )}
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
                    receiverId: selectedUser?.id,
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
