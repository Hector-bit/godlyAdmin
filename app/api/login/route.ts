// import { NextResponse } from "next/server"
// import bcrypt from "bcryptjs"
// import { findUserByEmail } from "@/lib/users"
// import bcrypt from "bcryptjs"


// export async function POST(req: Request) {
//   const { email, password } = await req.json()
//   const user = findUserByEmail(email)

//   if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
//     return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
//   }

//   const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, {
//     expiresIn: "1h",
//   })

//   return NextResponse.json({ token })
// }