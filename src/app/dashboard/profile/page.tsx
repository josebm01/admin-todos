'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function ProfilePage() {

    // hook para obtener la información de la sesión en el lado del cliente
    const { data: session } = useSession()

    useEffect(() => {
        console.log( session )
    }, [])
    

    return (
        <div>
            <h1>Profile</h1>
            <hr />
            <div className="flex flex-col">
                <span>{ session?.user?.name ?? 'No name' }</span>
                <span>{ session?.user?.email ?? 'No name' }</span>
                <span>{ session?.user?.image ?? 'No name' }</span>
            </div>
        </div>
    )
}