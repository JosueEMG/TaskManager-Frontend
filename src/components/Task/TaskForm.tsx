import { ChangeEvent, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { createTasks, updateTasks } from '../../services/taskService'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getTask } from '../../services/taskService'

interface IFormInputs {
    title: string,
    content: string,
    image: FileList
}

interface Params {
    id: string
}

const TaskForm = () => {

    let initValues = {
        title: '',
        content: '',
        image: ''
    }

    const params = useParams<Params>()

    const history = useHistory()

    const { register, handleSubmit } = useForm() 

    const [task, setTask] = useState(initValues)

    const getATask = async (id: string) => {
        const res = await getTask(id)
        const { content, title, image } = res.data
        setTask({
            content,
            title,
            image
        })
    }

    useEffect(() => {
        
        getATask(params.id)
        
    })


    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const uploadTask: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {

        if (data.title === '' || data.title === '' || data.image[0] === null) {
            toast.error('You have to complete the inputs')
        }
        else if (params.id) {

            let formdata = new FormData()
    
            formdata.append('title', data.title)
            formdata.append('content', data.content)
            formdata.append('image', data.image[0])
            
            const res = await updateTasks(params.id, formdata)

            console.log(res)
    
            if (res.data.message) {
                toast.success(res.data.message)
                history.push('/')
            } else {
                toast.error(res.data.errors)
            }
        } else {
            setTask(initValues)

            let formdata = new FormData()
    
            formdata.append('title', data.title)
            formdata.append('content', data.content)
            formdata.append('image', data.image[0])
            
            const res = await createTasks(formdata)
    
            if (res.data.message) {
                toast.success(res.data.message)
                history.push('/')
            } else {
                toast.error(res.data.errors)
            }
        }
        
    }

    return (
        <div className="row p-3">
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <form onSubmit={handleSubmit(uploadTask)}>
                        {
                            params.id ? (
                                <div className="mb-3">
                                    <img src={task.image} className="card-img-top" alt="" />
                                </div>
                            ) : null
                        }
                        
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Titulo:</label>
                            <input type="text" {...register('title')} className="form-control" placeholder="Ingrese el titulo aquí" value={task.title} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Contenido:</label>
                            <textarea className="form-control" {...register('content')} name="content" rows={3} placeholder="Ingrese el contenido de la tarea aquí" value={task.content} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Seleccione una imagen:</label>
                            <input className="form-control" {...register('image')} name="image" type="file" id="formFile" required />
                        </div>
                        <div className="mb-3">
                            <div className="d-flex justify-content-between">
                                <input type="submit" className="btn btn-primary" value="Guardar" />
                                <Link to="/" className="btn btn-danger">Cancelar</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TaskForm
