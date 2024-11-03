import { TodoFormState } from "../schemas/todoSchema"
import { z, ZodError } from 'zod'
import { insertTodo } from "./todoAction"

const formSchema = z.object({
    name: z.string({
        required_error: 'name is required',
        invalid_type_error: 'name type is string',
    }).min(1, 'Please enter name'),
    description: z.string({
        required_error: 'description is required',
        invalid_type_error: 'description type is string',
    }).min(1, 'Please enter description'),
})

export async function submitForm(prevFormData: TodoFormState, formData: FormData): Promise<TodoFormState> {
    console.log('line 17')
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    try {
        formSchema.parse({
            name: name,
            description: description,
        })
        console.log('line name: ' + name)
        console.log('line description: ' + description)

        insertTodo(
            {
                seq: -1,
                name: name,
                description: description,
                createDate: new Date(),
                updateDate: new Date(),
            }
        )

        return {
            message: 'success',
            error: undefined,
            fieldValues: {
                seq: -1,
                name: '',
                description: '',
                createDate: new Date(),
                updateDate: new Date(),
            }
        }
    } catch (error) {
        const zodError = error as ZodError
        const errorMap = zodError.flatten().fieldErrors
        return {
            message: zodError.message,
            error: {
                seq: errorMap['seq'] ? errorMap['seq'][0] : '',
                name: errorMap['name'] ? errorMap['name'][0] : '',
                description: errorMap['description'] ? errorMap['description'][0] : '',
                createDate: errorMap['createDate'] ? errorMap['createDate'][0] : '',
                updateDate: errorMap['updateDate'] ? errorMap['updateDate'][0] : '',
            },
            fieldValues: {
                seq: -1,
                name: name,
                description: description,
                createDate: new Date(),
                updateDate: new Date(),
            }
        }
    }

}