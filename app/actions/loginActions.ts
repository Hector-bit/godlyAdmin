"use server"
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";

const testUser = {
  id: "1",
  username: "rahdeshwithlove",
  password: "Crabbyapple1"
}

const loginSchema = z.object({
  username: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters "}).trim()
})

export type LoginState = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  // message?: string | null;
};

export async function login(prevState: LoginState, formData: FormData){
  const result = loginSchema.safeParse(Object.fromEntries(formData))

  if(!result.success){
    return {
      errors: result.error.flatten().fieldErrors
    } 
  }

  const { username, password } = result.data;

  // password and email error message
  if(username !== testUser.username || password !== testUser.password){
    return {
      errors: {
        username: ["Invalid username or password"]
      }
    }
  }

  await createSession(testUser.id);

  redirect("/")

}

export async function logout() {
  await deleteSession();
  redirect("/login")
}