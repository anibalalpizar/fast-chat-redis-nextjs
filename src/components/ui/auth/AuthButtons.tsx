"use client"

import { useState } from "react"
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components"

import { Button } from "../button"

function AuthButtons() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <div className="flex gap-3 flex-1 md:flex-row flex-col relative z-50">
      <RegisterLink className="flex-1" onClick={() => setIsLogin(true)}>
        <Button className="w-full" variant="outline" disabled={!isLogin}>
          Sign up
        </Button>
      </RegisterLink>
      <LoginLink className="flex-1" onClick={() => setIsLogin(true)}>
        <Button className="w-full" variant="default" disabled={isLogin}>
          Login
        </Button>
      </LoginLink>
    </div>
  )
}

export default AuthButtons
