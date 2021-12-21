import React, { useEffect, useState } from 'react'
import * as taskService from '../../services/taskService'
import { TaskInterface } from './TaskInterface'
import Task from './Task'

const TaskList = () => {

    const [tasks, setTasks] = useState<TaskInterface[]>([])

    const getTasks = async () => {
        const res = await taskService.getTasks()
        setTasks(res.data)
        console.log(res.data)
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <div className="row">
            {
                tasks.map(task => {
                    return <Task task={task} key={task._id} getTasks={getTasks} />
                })
            }
        </div>
    )
}

export default TaskList