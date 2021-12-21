import axios from 'axios'
import { TaskInterface } from '../components/Task/TaskInterface'

export const getTasks = async () => {
    return await axios.get<TaskInterface[]>('http://localhost:3000/api/tasks')
}

export const getTask = async (id: string) => {
    return await axios.get<TaskInterface>('http://localhost:3000/api/tasks/' + id)
}

export const createTasks = async (data: FormData) => {
    return await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/tasks',
        data: data
    })
}

export const updateTasks = async (id: string, data: FormData) => {
    return await axios.put('http://localhost:3000/api/tasks/' + id, data)
}

export const deleteTasks = async (id: string) => {
    return await axios.delete('http://localhost:3000/api/tasks/' + id)
}