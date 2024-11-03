import CreateButton from "@/features/todo/components/button/CreateButton";
import TodoList from "@/features/todo/components/TodoList";

export default function Page() {

    return (
        <div>
            <CreateButton></CreateButton>
            <TodoList></TodoList>
        </div>
    )

}