
export type Todo = {
    uuid: string,
    name: string,
    description: string,
    createDate: Date,
    updateDate: Date,
}

export type TodoFormState = {
    message: string,
    error: Record<keyof Todo, string> | undefined,
    fieldValues: Todo,
}
