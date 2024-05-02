import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";

//! instrucciones para las acciones de los todos
// actualizar tarea
export const updateTodo = async( id: string, complete: boolean ): Promise<Todo> => {
    const body = { complete }
    // como se llamará de lado del cliente no es necesario especificar el servidor
    const todo = await fetch(`/api/todos/${ id }`, {
        method: 'PUT',
        body: JSON.stringify( body ),
        headers: {
            'Content-type': 'application/json',
        }
    }).then( res => res.json() )

    console.log( todo )

    return todo
} 

// crear tarea
export const createTodo = async( description: string ): Promise<Todo> => {
    const body = { description }
    // como se llamará de lado del cliente no es necesario especificar el servidor
    const todo = await fetch("/api/todos", {
        method: 'POST',
        body: JSON.stringify( body ),
        headers: {
            'Content-type': 'application/json',
        }
    }).then( res => res.json() )

    console.log( todo )

    return todo
} 


// eliminar tareas completadas
export const deleteCompletedTodos = async(): Promise<boolean> => {
    
    const todo = await fetch("/api/todos", {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        }
    }).then( res => res.json() )

    console.log( todo )

    return true
} 


