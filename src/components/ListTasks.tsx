import { useState, forwardRef } from "react";
import { Reorder, motion, useDragControls } from "framer-motion";

import { Task, ReorderIcon } from ".";
import cerrar from "../images/icon-cross.svg";

interface Props {
    task: Task;
    isCreate: boolean;
    eliminarTarea: (task: number) => void;
    actualizarTarea: (task: Task) => void;
}

export const ListTasks = forwardRef<HTMLUListElement, Props>(({ task, isCreate, eliminarTarea, actualizarTarea }, ref) => {

    const dragControls = useDragControls();

    const [completar, setCompletar] = useState(task.complete);
    const [isDelete, setIsDelete] = useState(false);

    // *Completar tarea---------------------------------
    const completarTarea = () => {
        setCompletar(!task.complete);
        task.complete = !task.complete;
        actualizarTarea(task);
    }

    // *Eliminar tarea----------------------------------
    const eliminar = () => {
        setIsDelete(true);
        eliminarTarea(task.id);
    }

    return (
        <Reorder.Item
            layout
            ref={ref}
            value={task}
            className="flex justify-between items-center gap-5 border-b border-gray-300 dark:border-gray-700 p-5 bg-white dark:bg-gray-800 relative"
            initial={isCreate ? { opacity: 0, y: "100%" } : {}}
            animate={{ opacity: 1, y: 0 }}
            exit={isDelete ? { opacity: 0, x: "-200px" } : {}}
            transition={{ duration: .5 }}
            dragListener={false}
            dragControls={dragControls}
        >
            <div className="flex justify-between items-center gap-5">
                <ReorderIcon
                    dragControls={dragControls}
                />

                <button
                    className={`w-6 h-6 border border-gray-300 dark:border-gray-700 rounded-full relative overflow-hidden`}
                    onClick={completarTarea}
                >
                    <motion.div
                        className="absolute h-full bg-gradient-to-r from-sky-500 to-indigo-500 inset-0 flex justify-center items-center"
                        initial={{ width: "0%" }}
                        animate={completar ? { width: "100%" } : { width: "0%" }}
                        transition={completar ? { duration: .3 } : { delay: .5, duration: .3 }}
                    >
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="9"
                            animate={completar ? { opacity: 1 } : { opacity: 0 }}
                            transition={completar ? { delay: .5, duration: .3 } : { duration: .3 }}
                        >
                            <path
                                fill="none"
                                stroke="#FFF"
                                strokeWidth="2"
                                d="M1 4.304L3.696 7l6-6"
                            />
                        </motion.svg>
                    </motion.div>
                </button>

                <p className={`${completar ? 'line-through text-gray-500 dark:text-gray-600' : 'text-gray-600 dark:text-gray-300'}`}>
                    {task.task}
                </p>
            </div>

            <button
                onClick={eliminar}
            >
                <img src={cerrar} alt="Cerrar" />
            </button>
        </Reorder.Item>
    )
})