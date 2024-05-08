
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function GET( request: Request ){ 

    //? eliminando todo lo que tenga la tabla
    await prisma.todo.deleteMany() // eliminando todos
    await prisma.user.deleteMany() // eliminando usuarios

    const user = await prisma.user.create({
        data: {
            email: 'test@gmail.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin', 'client', 'super-user'],
            todos: {
                create: [                    
                    { description: 'Tarea 1', complete: true },
                    { description: 'Tarea 2' },
                    { description: 'Tarea 3' },
                    { description: 'Tarea 4' },
                    { description: 'Tarea 5' },
                ]
            }
        }
    })

    //? insertando un solo dato
    // const todo = await prisma.todo.create({
    //     data: {
    //         description: 'Algo'
    //     }
    // })

    //? insertando varios datos
    // await prisma.todo.createMany({
    //     data: [
    //         { description: 'Tarea 1', complete: true },
    //         { description: 'Tarea 2' },
    //         { description: 'Tarea 3' },
    //         { description: 'Tarea 4' },
    //         { description: 'Tarea 5' },
    //     ]
    // })

    return NextResponse.json({ msg: 'seed executed' })
}