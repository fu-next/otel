import { getTodoList } from "../actions/todoAction"
import { Todo } from "../schemas/todoSchema"
import TodoItem from "./TodoItem"

export default function TodoList() {

    const todos: Todo[] = getTodoList()

    return (
        <div>
            <div>
                <div>seq</div>
                <div>name</div>
                <div>description</div>
                <div>createDate</div>
                <div>update</div>
                <div>delete</div>
            </div>
            {todos.map(e => <TodoItem params={{ todo: e }}></TodoItem>)}
        </div>
    )

}