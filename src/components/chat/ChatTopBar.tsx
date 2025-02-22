import { InfoIcon, X } from "lucide-react"
import { useSelectedUser } from "@/store/useSelectedUser"

import { Avatar, AvatarImage } from "../ui/avatar"

function ChatTopBar() {
  const { selectedUser, setSelectedUser } = useSelectedUser()
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={selectedUser?.image}
            alt={selectedUser?.name}
            className="w-10 h-10 object-cover rounded-full"
          />
        </Avatar>
        <span className="font-medium">{selectedUser?.name}</span>
      </div>
      <div className="flex gap-2">
        <InfoIcon className="text-muted-foreground cursor-pointer hover:text-primary" />
        <X
          className="text-muted-foreground cursor-pointer hover:text-primary"
          onClick={() => setSelectedUser(null)}
        />
      </div>
    </div>
  )
}

export default ChatTopBar
