import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";
import * as yup from 'yup'

interface Segments {
    params: {
        id: String 
    }
}


const getTodo = async( id: string ): Promise<Todo | null> => {
  
  const user = await getUserSessionServer()

  if ( !user ){
    return null
  }

  const todo = await prisma.todo.findFirst({ where: { id }})
  
  // - todo debe pertener al usuario
  if ( todo?.userId !== user.id ){
    return null
  }

  return todo 
}

export async function GET( request: Request, { params }: Segments ) {

    const { id } = params 

    const result = await getTodo( `${id}` )
      
      if ( !result ) {
        return NextResponse.json({ msg: `ID todo ${id} not found` }, { status: 404 })
      }

    return NextResponse.json( result )
}




export async function POST( request: Request ) {

    const body = await request.json()
    const todo = await prisma.todo.create({ data: body })

    return NextResponse.json( todo )

}

  

// esquema de validación para actualizar 
const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional()
})

export async function PUT( request: Request, { params }: Segments ) {

    const { id } = params 

    const result = await getTodo( `${id}` )
      
    if ( !result ) {
      return NextResponse.json({ msg: `ID todo ${id} not found` }, { status: 404 })
    }

    try {
 
        // ...rest - valores adicionales 
        // validando el objeto que se quiere actualizar 
        const { complete, description, ...rest } = await putSchema.validate( await request.json() )

        const updateTodo = await prisma.todo.update({
        where: { id: `${id}` },
        data: { complete, description }
        })
    
        return NextResponse.json( updateTodo )

    } catch (error) {

        return NextResponse.json( error, { status: 400 } )
        
    }
}



