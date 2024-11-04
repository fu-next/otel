'use client'

import styles from "./todoFormModal.module.css"
import TodoForm from '@/app/todoForm/page'
import Modal from '@mui/material/Modal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { context, trace } from "@opentelemetry/api";

export default function TodoFormModal() {

    const router = useRouter()
    const [open, setOpen] = useState(true)
    const handleClose = () => {
        setOpen(false)
        router.back()
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <div className={styles.modal}>
                    <TodoForm params={{ handleClose: handleClose }}></TodoForm>
                </div>
            </Modal>
        </div>
    )
} 