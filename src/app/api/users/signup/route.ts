import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
interface RequestBody {
    username: string;
    email: string;
    password: string;
  }

Connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody: RequestBody = await request.json()
        const {username, email, password} = reqBody

        //check if user already exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "user already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const newUser = new user({
            username,
            email,
            password: hashPassword
        })

        const savedUser = await newUser.save()
        return NextResponse.json({
            message: "User Created Sucessfully",
            success: true,
            savedUser,
         })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}