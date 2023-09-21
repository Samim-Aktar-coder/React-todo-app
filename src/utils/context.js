import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 134,
            todo: 'Hello! I am Samim',
            isComplete: false
        }
    ],
    addTodo: (todo) => { },
    updateTodo: (id, todo) => { },
    deleteTodo: (id) => { },
    toggleComplete: (id, todo) => { },
    showAlert: (color, msg) => { }
});

export const useTodo = () => { return useContext(TodoContext); };


export const TodoProvider = TodoContext.Provider;