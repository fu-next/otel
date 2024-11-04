'use server'

import { deleteTodo } from "../actions/todoAction";
import { Todo } from "../schemas/todoSchema";
import DeleteButton from "./button/DeleteButton";

export default async function TodoItem({ params }: { params: { todo: Todo } }) {
    return (
        <>
            <div>{params.todo.uuid}</div>
            <div>{params.todo.name}</div>
            <div>{params.todo.description}</div>
            <div>{params.todo.createDate as unknown as string}</div>
            <div>{params.todo.updateDate as unknown as string}</div>
            <div><DeleteButton params={{ todo: params.todo, deleteTodo: deleteTodo }}></DeleteButton></div>
        </>
    )
}