//? Revalidación de la información
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { TodosGrid, NewTodo } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
    title: 'Listado de todos',
    description: 'descripción'
}

export default async function RestTodosPage() {

    try {
           
        const user = await getUserSessionServer()
        if ( !user ) redirect('/api/auth/signin')

        const todos = await prisma.todo.findMany({ 
            where: { userId: user.id },
            orderBy: { description: 'asc' }
        })

        return (
            <div>
                <div className="w-full px-5 mx-5 mb-5">
                    <NewTodo />
                </div>
                <TodosGrid todos={ todos } />
            </div>  
        )
    } catch (error: any) {

        console.log( error.message )

        return (
            <div>
                <h1>Algo ha pasado con el servidor...</h1>
                <h2>{error.message}</h2>
            </div>  
        )
    }

   
}