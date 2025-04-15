"use client"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { login } from "@/app/actions/loginActions"

export default function LoginForm() {
  const [loginState, loginAction] = useActionState(login, undefined)

  return (
    <form action={loginAction} className="flex max-w-[300px] flex-col gap-2">
      <div className="flex flex-col gap-2">
        <input id="email" name="email" placeholder="Email" />
      </div>
      {loginState?.errors?.email && (
        <p className="text-red-500">{loginState.errors.email}</p>
      )}

      <div className="flex flex-col gap-2">
        <input
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
    <button disabled={pending} type="submit">
      Login
    </button>
  );
}
