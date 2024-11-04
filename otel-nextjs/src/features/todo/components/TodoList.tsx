import styles from './todoList.module.css'

import { getTodoList } from "../actions/todoAction"
import { Todo } from "../schemas/todoSchema"
import TodoItem from "./TodoItem"

export default async function TodoList() {

    const todos: Todo[] = await getTodoList()

    return (
        <div className={styles.grid_container}>
                <div>seq</div>
                <div>name</div>
                <div>description</div>
                <div>createDate</div>
                <div>update</div>
                <div>delete</div>
            {todos.map(e => <TodoItem params={{ todo: e }}></TodoItem>)}
        </div>
    )

}