import { FC, FormEventHandler, SetStateAction } from "react";
import { motion } from "framer-motion";

interface Props {
    newTask: string;
    setNewTask: (value: SetStateAction<string>) => void;
    nuevaTarea: FormEventHandler<HTMLFormElement>;
}

export const InputTask: FC<Props> = ({ newTask, setNewTask, nuevaTarea }) => {
    return (
        <motion.form
            className="bg-white dark:bg-gray-900 px-5 py-3 mt-10 rounded-lg"
            onSubmit={nuevaTarea}
            initial={{ width: 0, x: 300, opacity: 0 }}
            animate={{ width: "auto", x: 0, opacity: [0, 1, 1, 1, 1] }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: .3, delay: 1.1 }}
        >
            <motion.div
                className="flex justify-start items-center gap-5"
                initial={{ opacity: 0, }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3 }}
            >
                <div className="w-6 h-6 border border-gray-300 dark:border-gray-700 rounded-full">
                </div>

                <input
                    type="text"
                    className="flex-1 bg-transparent p-2 placeholder-gray-300 dark:placeholder-gray-700 text-xl outline-none text-gray-700 dark:text-gray-300"
                    placeholder="Nueva Tarea"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                />
            </motion.div>
        </motion.form>
    )
}