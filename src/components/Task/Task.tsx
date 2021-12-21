import React from 'react'
import { useHistory } from 'react-router-dom'
import { TaskInterface } from './TaskInterface'
import { deleteTasks } from '../../services/taskService'
import { toast } from 'react-toastify'

interface Props {
    task: TaskInterface,
    getTasks: () => void
}

const Task = ({ task, getTasks }: Props) => {

    const history = useHistory()

    const clickEventHandler = async (id: string) => {
        const res = await deleteTasks(id)
        if (res.data.message) {
            toast.success(res.data.message)
            await getTasks()
        }
        else {
            toast.success(res.data.errors)
        }
    }

    return (
        <div className="card m-3" style={{ width: '18rem' }}>
            <img src={task.image} className="card-img-top" alt="" />
            <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.content}</p>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-secondary" onClick={() => history.push(`/update-task/${task._id}`) }>Actualizar</button>
                    <button className="btn btn-danger" onClick={() => clickEventHandler(task._id!)}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}

export default Task
