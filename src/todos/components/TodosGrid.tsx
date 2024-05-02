'use client'

import { Todo } from '@prisma/client'
import React from 'react'
import { TodoItem } from './TodoItem'

// import * as todoApi from '@/todos/helpers/todos'
// import { useRouter } from 'next/navigation'

//? importando server action
import { toggleTodo } from '../actions/todo-actions'

interface Props {
    todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {

  // const router = useRouter()

  // para poder recargar la ruta actual
  // const toggleTodo = async (id: string, complete: boolean) => {
  //   const updatedTodo = await todoApi.updateTodo( id, complete )
    
  //   // recarga la ruta
  //   router.refresh()
  //   return updatedTodo
  // }
  

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
        {
            todos.map( ( todo ) => (
                <TodoItem key={ todo.id } todo={ todo } toggleTodo={ toggleTodo } />
            ) )
        }
    </div>
  )
}
