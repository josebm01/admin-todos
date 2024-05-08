import { WidgetItem } from "@/components"
import { auth } from "../../../auth"
import { redirect } from "next/navigation"


export default async function DashboardPage() {

    // información del usuario autenticado  
    const session = await auth()

    if ( !session ){
        redirect('/api/auth/signin')
    }
    

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
         <WidgetItem title="Usuario conectado - server side">
            <div className="flex flex-col">

            </div>
         </WidgetItem>
        </div>
    )
}



