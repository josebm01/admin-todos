
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET( request: Request ){ 

    //? eliminando todo lo que tenga la tabla
    await prisma.todo.deleteMany()

    //? insertando un solo dato
    // const todo = await prisma.todo.create({
    //     data: {
    //         description: 'Algo'
    //     }
    // })

    //? insertando varios datos
    await prisma.todo.createMany({
        data: [
            { description: 'Tarea 1', complete: true },
            { description: 'Tarea 2' },
            { description: 'Tarea 3' },
            { description: 'Tarea 4' },
            { description: 'Tarea 5' },
        ]
    })

    return NextResponse.json({ msg: 'seed executed' })
}