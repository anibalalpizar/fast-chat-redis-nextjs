'use client'

import { MoonIcon, SunIcon, Volume2, VolumeX } from "lucide-react"

import { Button } from "./ui/button"
import { useTheme } from "next-themes"

function PreferenceTab() {
  const { setTheme } = useTheme()
  return (
    <div className="flex flex-wrap gap-2 px-1 md:px-2">
      <Button variant="outline" size="icon" onClick={() => setTheme("light")}>
        <SunIcon className="size-[1.2rem] text-muted-foreground" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => setTheme("dark")}>
        <MoonIcon className="size-[1.2rem] text-muted-foreground" />
      </Button>
      <Button variant="outline" size="icon">
        <VolumeX className="size-[1.2rem] text-muted-foreground" />
      </Button>
    </div>
  )
}

export default PreferenceTab
