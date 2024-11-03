'use client'

import { useRouter } from "next/navigation"

export default function CreateButton() {

    const router = useRouter()

    const handleOnClick = () => {
        router.push('/todoForm')
    }

    return (
        <div>
            <button onClick={handleOnClick}>Create</button>
        </div>
    )

}