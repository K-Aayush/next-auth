'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface userResponse {
    user: string | null;
    error: any | null;
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        (async () => {
           const { user, error } = await getUser();
   
           if(error) {
               router.push("/login");
               return;
           }
   
           setIsSuccessful(true);
        })();
       
         
       }, [router])

       if(!isSuccessful) {
        return <p>Loading...</p>
       }
    return (
        <main>
            <header>Nav</header>
            {children}
        </main>
    )
}

async function getUser(): Promise<userResponse> {
    try {
        const { data } = await axios.get('/api/users/me');

        return {
            user: data,
            error: null,
        }
    } catch (error) {
        console.log(error);
        return {
            user: null,
            error
        }
    }
}