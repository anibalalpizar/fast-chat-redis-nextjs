import { MoonIcon, SunIcon, Volume2, VolumeX } from "lucide-react"

import { Button } from "./ui/button"

function PreferenceTab() {
  return (
    <div className="flex flex-wrap gap-2 px-1 md:px-2">
      <Button variant="outline" size="icon">
        <SunIcon className="size-[1.2rem] text-muted-foreground" />
      </Button>
      <Button variant="outline" size="icon">
        <MoonIcon className="size-[1.2rem] text-muted-foreground" />
      </Button>
      <Button variant="outline" size="icon">
        <VolumeX className="size-[1.2rem] text-muted-foreground" />
      </Button>
    </div>
  )
}

export default PreferenceTab
