'use server'

import { Todo } from "../schemas/todoSchema";
import { trace, context } from "@opentelemetry/api";

export async function getTodoList() {
    let todos: Todo[] = [];
    await trace.getTracer('todoTracer').startActiveSpan('todoAction getTodoList', async (span) => {
        try {
            const activeSpan = trace.getSpan(context.active())
            const traceParent = activeSpan ? `00-${activeSpan.spanContext().traceId}-${activeSpan.spanContext().spanId}-01` : ''
            const tracestate = activeSpan?.spanContext().traceState?.serialize();
            const headers: HeadersInit = {
                'traceparent': traceParent,
                'tracestate': tracestate ? tracestate : '',
            }

            const resp = await fetch('http://localhost:8080/demo/todo', { headers })
            todos = await resp.json()
        } finally {
            span.end()
        }
    })

    return todos;
}

export async function insertTodo(todo: Todo): Promise<Boolean> {
    await trace.getTracer('todoTracer').startActiveSpan('todoAction insertTodo', async (span) => {
        try {
            const activeSpan = trace.getSpan(context.active())
            const traceParent = activeSpan ? `00-${activeSpan.spanContext().traceId}-${activeSpan.spanContext().spanId}-01` : ''
            const tracestate = activeSpan?.spanContext().traceState?.serialize();
            const headers: HeadersInit = {
                'Content-Type': 'application/json',
                'traceparent': traceParent,
                'tracestate': tracestate ? tracestate : '',
            }

            await fetch('http://localhost:8080/demo/todo', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(todo),
            })
        } finally {
            span.end()
        }
    })

    return true;
}

export async function deleteTodo(todo: Todo): Promise<Boolean> {
    await trace.getTracer('todoTracer').startActiveSpan('todoAction deleteTodo', async (span) => {
        try {
            const activeSpan = trace.getSpan(context.active())
            const traceParent = activeSpan ? `00-${activeSpan.spanContext().traceId}-${activeSpan.spanContext().spanId}-01` : ''
            const tracestate = activeSpan?.spanContext().traceState?.serialize();
            const headers: HeadersInit = {
                'Content-Type': 'application/json',
                'traceparent': traceParent,
                'tracestate': tracestate ? tracestate : '',
            }

            await fetch(`http://localhost:8080/demo/todo/${todo.uuid}`, {
                method: 'DELETE',
                headers: headers,
            })
        } finally {
            span.end()
        }
    })
   

    return true;
}