'use client'

import { Todo } from "../../schemas/todoSchema";

export default function DeleteButton({ params }: { params: { todo: Todo, deleteTodo: (todo: Todo) => Promise<Boolean> } }) {

    const handleOnClick = () => {
        params.deleteTodo(params.todo)
    }

    return (
        <div>
            <button onClick={handleOnClick}>Delete</button>
        </div>
    )


}