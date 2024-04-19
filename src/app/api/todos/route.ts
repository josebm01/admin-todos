import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import * as yup from 'yup'

export async function GET( request: Request ){ 

    const { searchParams } = new URL( request.url )
    
    //? + o usar Number() - convierte string a número
    const take = +(searchParams.get('take') ?? '10')
    const skip = +(searchParams.get('take') ?? '0')
    
    if ( isNaN(take) ) {
        return NextResponse.json({
            message: 'Take must be a number'
        }, {
            status: 400
        })
    }
    
    if ( isNaN(skip) ) {
        return NextResponse.json({
            message: 'Skip must be a number'
        }, {
            status: 400
        })
    }

    // buscando todos los registros
    const todos = await prisma.todo.findMany({
        take,
        skip
    })

    return NextResponse.json( todos )
}


// objeto de validación de lo que recibe el body - si recibe algo más dará error
const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false)
})

export async function POST( request: Request ) {

    try {
        const { complete, description } = await postSchema.validate( await request.json() ) 
        const todo = await prisma.todo.create({ data: { complete, description } })
    
        return NextResponse.json( todo )
    } catch (error) {
        return NextResponse.json( error, { status: 400 })
    }

}