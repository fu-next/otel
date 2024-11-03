'use server'

import { deleteTodo } from "../actions/todoAction";
import { Todo } from "../schemas/todoSchema";
import DeleteButton from "./button/DeleteButton";

export default async function TodoItem({ params }: { params: { todo: Todo } }) {
    return (
        <div>
            <div>{params.todo.seq}</div>
            <div>{params.todo.name}</div>
            <div>{params.todo.description}</div>
            <div>{params.todo.createDate.toLocaleDateString()}</div>
            <div>{params.todo.updateDate.toLocaleDateString()}</div>
            <div><DeleteButton params={{ todo: params.todo, gg: deleteTodo }}></DeleteButton></div>
        </div>
    )
}