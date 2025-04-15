"use client"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { login, LoginState } from "@/app/actions/loginActions"

export default function LoginForm() {
  const initialState: LoginState = { errors: {} };
  const [loginState, loginAction] = useActionState(login, initialState)

  return (
    <form action={loginAction} className="flex max-w-[300px] flex-col gap-4">
      <div className="flex flex-col gap-2">
        <input className="border rounded-xl p-2" id="username" name="username" placeholder="Username" />
      </div>
      {loginState?.errors?.username && (
        <p className="text-red-500">{loginState.errors.username}</p>
      )}

      <div className="flex flex-col gap-2">
        <input
          className="border rounded-xl p-2"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
      </div>
      {loginState?.errors?.password && (
        <p className="text-red-500">{loginState.errors.password}</p>
      )}
      <SubmitButton />
    </form>
  )
}


function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="border-2 border-black rounded-xl py-2" disabled={pending} type="submit">
      Login
    </button>
  );
}
