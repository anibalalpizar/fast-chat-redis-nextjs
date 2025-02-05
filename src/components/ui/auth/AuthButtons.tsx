import { Button } from "../button"

function AuthButtons() {
  return (
    <div className="flex gap-3 flex-1 md:flex-row flex-col relative z-50">
      <Button className="w-full" variant="outline">
        Sign up
      </Button>
      <Button className="w-full" variant="default">
        Login
      </Button>
    </div>
  )
}

export default AuthButtons
