"use client"

import { useTheme } from "next-themes"
import { MoonIcon, SunIcon, Volume2, VolumeX } from "lucide-react"
import { useSound } from "use-sound"

import { usePreferences } from "@/store/usePreferences"
import { Button } from "./ui/button"

function PreferenceTab() {
  const { setTheme } = useTheme()
  const { soundEnabled, setSoundEnabled } = usePreferences()

  const [playMouseClick] = useSound("/sounds/mouse-click.mp3", { volume: 0.5 })
  const [playSoundEnabled] = useSound("/sounds/sound-on.mp3", { volume: 0.5 })
  const [playSoundDisabled] = useSound("/sounds/sound-off.mp3", { volume: 0.5 })

  return (
    <div className="flex flex-wrap gap-2 px-1 md:px-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          setTheme("light")
          if (soundEnabled) playMouseClick()
        }}
      >
        <SunIcon className="size-[1.2rem] text-muted-foreground" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          setTheme("dark")
          if (soundEnabled) playMouseClick()
        }}
      >
        <MoonIcon className="size-[1.2rem] text-muted-foreground" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          setSoundEnabled(!soundEnabled)
          if (soundEnabled) playSoundDisabled()
          else playSoundEnabled()
        }}
      >
        {soundEnabled ? (
          <Volume2 className="size-[1.2rem] text-muted-foreground" />
        ) : (
          <VolumeX className="size-[1.2rem] text-muted-foreground" />
        )}
      </Button>
    </div>
  )
}

export default PreferenceTab
