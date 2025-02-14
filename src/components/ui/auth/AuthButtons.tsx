import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components"
import { Button } from "../button"

function AuthButtons() {
  return (
    <div className="flex gap-3 flex-1 md:flex-row flex-col relative z-50">
      <RegisterLink className="flex-1">
        <Button className="w-full" variant="outline">
          Sign up
        </Button>
      </RegisterLink>
      <LoginLink className="flex-1">
        <Button className="w-full" variant="default">
          Login
        </Button>
      </LoginLink>
    </div>
  )
}

export default AuthButtons
