'use client'

import { Todo } from "../../schemas/todoSchema";

export default function DeleteButton({ params }: { params: { todo: Todo, gg: (todo: Todo) => Promise<Boolean> } }) {

    const handleOnClick = () => {
        params.gg(params.todo)
    }

    return (
        <div>
            <button onClick={handleOnClick}>Delete</button>
        </div>
    )


}