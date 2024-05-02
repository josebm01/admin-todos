'use server'

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const toggleTodo = async ( id: string, complete: boolean ): Promise<Todo> => {
    const todo = await prisma.todo.findFirst({ where: { id }})

    if (!todo) {
        throw `Todo con ID ${id} no encontrado`
    }

    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { complete }
    })

    // recarga la ruta para que se visualicen los cambios
    revalidatePath('/dashboard/server-todos')

    return updatedTodo
}



export const addTodo = async ( description: string) => {
    try {
    
        const todo = await prisma.todo.create({ data: { description } })
        // recarga la ruta para que se visualicen los cambios
        revalidatePath('/dashboard/server-todos')
        return todo 

    } catch (error) {
        return {
            message: 'Error creando todo'
        }
    }
}


export const deleteTodo = async () => {
    try {
        await prisma.todo.deleteMany({ where: { complete: true }})
        // recarga la ruta para que se visualicen los cambios
        revalidatePath('/dashboard/server-todos')
        return {
            message: 'Eliminados'
        }
    } catch (error) {
         return {
            message: 'Error al eliminar todo'
         }
    }
}