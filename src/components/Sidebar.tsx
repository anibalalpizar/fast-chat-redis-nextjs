import { LogOut } from "lucide-react"
import useSound from "use-sound"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { cn } from "@/lib/utils"
import { usePreferences } from "@/store/usePreferences"
import { useSelectedUser } from "@/store/useSelectedUser"
import type { User } from "@/db/dummy"

import { ScrollArea } from "./ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"

interface SidebarProps {
  isCollapsed: boolean
  users: User[]
}

function Sidebar({ isCollapsed, users }: SidebarProps) {
  const { soundEnabled } = usePreferences()
  const [play] = useSound("/sounds/click.mp3")
  const { setSelectedUser, selectedUser } = useSelectedUser()

  const { user } = useKindeBrowserClient()

  return (
    <div className="group relative flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 max-h-full overflow-auto bg-background">
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
          </div>
        </div>
      )}
      <ScrollArea className="gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {users.map((user) =>
          isCollapsed ? (
            <TooltipProvider key={`tooltip-${user.id}`}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => {
                      if (soundEnabled) play()
                      setSelectedUser(user)
                    }}
                  >
                    <Avatar className="my-1 flex justify-center items-center">
                      <AvatarImage
                        src={user.image}
                        alt={user.name}
                        width={6}
                        height={6}
                        className="border-2 border-white rounded-full w-10 h-10"
                      />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">{user.name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {user.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              key={`button-${user.id}`}
              className={cn(
                "w-full justify-start gap-4 my-1",
                selectedUser?.email === user.email &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hovertext-white shrink"
              )}
              onClick={() => {
                if (soundEnabled) play()
                setSelectedUser(user)
              }}
              variant="gray"
              size="xl"
            >
              <Avatar className="flex justify-center items-center">
                <AvatarImage
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10"
                />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col max-w-28">
                <span>{user.name}</span>
              </div>
            </Button>
          )
        )}
      </ScrollArea>
      <div className="mt-auto">
        <div className="flex justify-between items-center gap-2 md:px-6 py-2">
          {!isCollapsed && (
            <div className="hidden md:flex gap-2 items-center">
              <Avatar className="flex justify-center items-center">
                <AvatarImage
                  src={user?.picture}
                  alt={selectedUser?.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 border-2 border-white rounded-full"
                />
              </Avatar>
              <p className="font-bold">
                {user?.given_name} {user?.family_name}
              </p>
            </div>
          )}
          <div className="flex">
            <LoginLink>
              <LogOut size={22} cursor="pointer" />
            </LoginLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
