import { COOKIE_NAME } from "@/constants";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = cookies();

    const token = cookieStore.get(COOKIE_NAME)

    if (!token) {
        return NextResponse.json(
            {
                message: "Unauthorised",
            },
            {
                status: 401,
            }
        );
    }

    const { value } = token;
    const secret = process.env.JWT_SCERET || "";
    try {
        const decodedToken = verify(value, secret);
        const { username }: any = decodedToken;

        const response = {
            user: username
        }
        return new Response(JSON.stringify(response), {
            status: 200,   
        })
    } catch (error) {
        return NextResponse.json(
            {
                message: "Something went wrong",
            },
            {
                status: 400,
            }
        );
    }
}