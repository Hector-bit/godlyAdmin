"use server"
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession } from "../lib/session";

const testUser = {
  id: "1",
  email: "contact@code.com",
  password: "12345678"
}

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters "}).trim()
})

export async function login(prevState: any, formData: FormData){
  const result = loginSchema.safeParse(Object.fromEntries(formData))

  if(!result.success){
    return {
      errors: result.error.flatten().fieldErrors
    } 
  }

  const { email, password } = result.data;

  // password and email error message
  if(email !== testUser.email || password !== testUser.password){
    return {
      erros: {
        email: ["Invalid email or password"]
      }
    }
  }

  await createSession(testUser.id);

  redirect("/")

}

export async function logout() {

}