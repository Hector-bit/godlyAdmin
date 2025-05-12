"use server"
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";

const loginList = [
  {
    id: "1",
    username: "rahdeshwithlove",
    password: "Crabbyapple1"
  },
    {
    id: "2",
    username: "Hector",
    password: "reddog2001"
  },
  {
    id: "3",
    username: "Mac",
    password: "CookieBoy420"
  }

]

const loginSchema = z.object({
  username: z.string({ message: "Invalid username" }).trim(),
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

  let findUserId = "mismatch"
  let findUsername = undefined
  let findPassword = undefined

  for(let i = 0; i < loginList.length; i++){
    if(username == loginList[i].username){
      findUsername = loginList[i].username
      findPassword = loginList[i].password
      findUserId = loginList[i].id
    }
  }
  // password and email error message
  if(findUsername && password !== findPassword){
    return {
      errors: {
        username: ["Invalid username or password"]
      }
    }
  }

  await createSession(findUserId);

  redirect("/")

}

export async function logout() {
  await deleteSession();
  redirect("/login")
}