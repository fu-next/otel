import { Todo } from "../schemas/todoSchema";

export function getTodoList() {

    const todos: Todo[] = [
        {
            seq: 0,
            name: "name1",
            description: "description1",
            createDate: new Date(),
            updateDate: new Date(),
        },
        {
            seq: 1,
            name: "name2",
            description: "description2",
            createDate: new Date(),
            updateDate: new Date(),
        }
    ]

    return todos;
}


export async function insertTodo(todo: Todo): Promise<Boolean> {
    try {
        return true;
    } catch (error) {
        return false;
    }
}

export async function deleteTodo(todo: Todo): Promise<Boolean> {
    try {
        console.log('line 27')
        console.log(todo)
        return true;
    } catch (error) {
        return false;
    }
}