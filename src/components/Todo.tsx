import { useState, FormEventHandler, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";

import { DarkMode, ListTasks, InputTask } from ".";

export interface Task {
    id: number;
    task: string;
    complete: boolean;
}

type Filtro = 'Todas' | 'Activas' | 'Completadas';

const filtros: Filtro[] = ['Todas', 'Activas', 'Completadas'];

export const Todo = () => {

    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filtroActivo, setFiltroActivo] = useState<Filtro>('Todas');
    const [isCreate, setIsCreate] = useState(false);

    // *Recuperar Tareas----------------------------------------
    useEffect(() => {

        const localTask = localStorage.getItem('tasks');

        if (localTask) {
            const myTasks: Task[] = JSON.parse(localTask);
            setTasks(myTasks);
        }

    }, []);

    // *Agregar a LocalStorage----------------------------------
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // *Actualizar el filtro------------------------------------
    const filtrarTareas = tasks.filter(task => {
        if (filtroActivo === 'Todas') return true;
        if (filtroActivo === 'Activas') return !task.complete;
        if (filtroActivo === 'Completadas') return task.complete;
    });

    // *Crear Nueva Tarea---------------------------------------
    const nuevaTarea: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const task: Task = {
            id: Date.now(),
            task: newTask,
            complete: false
        }

        setIsCreate(true);
        setTasks([...tasks, task]);
        setNewTask("");

        setTimeout(() => {
            setIsCreate(false);
        }, 1000)
    }

    // *Completar tarea-----------------------------------------
    const actualizarTarea = (task: Task) => {

        const updateTasks = tasks.map(memoryTask => memoryTask.id === task.id ? task : memoryTask);
        setTasks(updateTasks);
    }

    // *Eliminar Tarea------------------------------------------
    const eliminarTarea = (id: number) => {
        const updateTask = tasks.filter(memoryTask => memoryTask.id !== id);
        setTasks(updateTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // *Limpiar Todo--------------------------------------------
    const limpiar = () => {
        setTasks([]);
    }

    return (
        <div className="absolute inset-0 w-full h-full flex justify-center items-start">
            <div className=" px-3 w-full md:w-[620px] py-5 md:py-16">
                <div className="flex justify-between items-center">
                    <motion.h1
                        className="text-white text-4xl font-bold tracking-[.5em]"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        TODO
                    </motion.h1>

                    <DarkMode />
                </div>

                <InputTask
                    newTask={newTask}
                    setNewTask={setNewTask}
                    nuevaTarea={nuevaTarea}
                />

                <motion.div
                    className="mt-5 bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, y: "100px" }}
                    animate={{ opacity: 1, y: "0%" }}
                    transition={{ duration: 1, delay: 2, type: "tween" }}
                >
                    <div className="list-task min-h-0 max-h-[390px] overflow-y-scroll">
                        <Reorder.Group
                            as="ul"
                            axis="y"
                            values={tasks}
                            onReorder={setTasks}
                        >
                            <AnimatePresence mode="popLayout">
                                {
                                    filtrarTareas.map((task) => (
                                        <ListTasks
                                            key={task.id}
                                            isCreate={isCreate}
                                            task={task}
                                            eliminarTarea={eliminarTarea}
                                            actualizarTarea={actualizarTarea}
                                        />
                                    ))
                                }
                            </AnimatePresence>
                        </Reorder.Group>
                    </div>

                    <div className="flex justify-between items-center px-5 py-3">
                        <p className="text-gray-600 text-sm sm:text-base">
                            {tasks.filter(task => !task.complete).length} items left
                        </p>

                        <div className="flex justify-center items-center gap-3">
                            {
                                filtros.map(filtro => (
                                    <button
                                        key={filtro}
                                        className={`${filtroActivo === filtro ? 'text-blue-500' : 'text-gray-600 transition-all duration-300 hover:text-gray-400'} text-sm sm:text-base`}
                                        onClick={() => setFiltroActivo(filtro)}
                                    >
                                        {filtro}
                                    </button>
                                ))
                            }
                        </div>

                        <button
                            className="text-gray-600 transition-all duration-300 hover:text-gray-400 text-sm sm:text-base"
                            onClick={limpiar}
                        >
                            Limpiar
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}