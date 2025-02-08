"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable"
import Sidebar from "../Sidebar"

interface ChatLayoutProps {
  defaultLayout: number[] | undefined
}

function ChatLayout({ defaultLayout = [320, 480] }: ChatLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const checkScreenWidth = () => setIsMobile(window.innerWidth < 768)

    checkScreenWidth()

    window.addEventListener("resize", checkScreenWidth)

    return () => window.removeEventListener("resize", checkScreenWidth)
  }, [])

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full items-stretch bg-background rounded-lg"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panel:layout=${JSON.stringify(
          sizes
        )}`
      }}
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={8}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true)
          document.cookie = `react-resizable-panel:collapsed=true;`
        }}
        onExpand={() => {
          setIsCollapsed(false)
          document.cookie = `react-resizable-panel:collapsed=false;`
        }}
        className={cn(
          isCollapsed && "min-w-[80px] transition-all duration-300 ease-in-out"
        )}
      >
        <Sidebar isCollapsed={isCollapsed} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <div className="flex justify-center items-center h-full w-full px-10">
          <div className="flex flex-col justify-center items-center gap-4">
            <Image
              src="vercel.svg"
              alt="logo"
              width={200}
              height={200}
              className="w-full md:w-2/3 lg:w-1/2"
            />
            <p className="text-muted-foreground text-center">
              Click on a chat to view the messages
            </p>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default ChatLayout
