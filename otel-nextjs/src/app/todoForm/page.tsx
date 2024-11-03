'use client'

import { submitForm } from "@/features/todo/actions/todoFormAction";
import { TodoFormState } from "@/features/todo/schemas/todoSchema";
import { ChangeEvent, useActionState, useEffect, useRef } from "react";

export default function TodoForm() {

    const formRef = useRef<HTMLFormElement>();
    const [formState, formAction, isPending] = useActionState(submitForm, {
        message: '',
        error: undefined,
        fieldValues: {
            seq: 0,
            name: '',
            description: '',
            createDate: new Date(),
            updateDate: new Date(),
        },
    } as TodoFormState)

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
    }

    useEffect(() => {
        if (formState.message === 'success') {
            formRef.current?.reset()
        }
    }, [formState]);

    return (
        <div>
            <form action={formAction}>
                <input type='text' name='name' defaultValue={formState.fieldValues.name} onChange={handleOnChange} placeholder='enter name'></input>
                {formState.error?.name ? <div>{formState.error?.name}</div> : <></>}

                <input type='text' name='description' defaultValue={formState.fieldValues.description} onChange={handleOnChange} placeholder='enter description'></input>
                {formState.error?.description ? <div>{formState.error?.description}</div> : <></>}

                <button disabled={isPending} type='submit'>Submit</button>
            </form>
        </div>
    )
}