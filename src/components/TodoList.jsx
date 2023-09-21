import React, { useState } from "react";
import { useTodo } from "../utils";

function TodoList({ todo }) {
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const [isEditable, setIsEditable] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const { updateTodo, deleteTodo, toggleComplete, showAlert } = useTodo();

  return (
    <div
      className={`mt-2 rounded-lg overflow-hidden bg-orange-400 ${
        isCompleted ? "opacity-80" : ""
      } flex items-center justify-between gap-x-2 sm:gap-x-3 px-3 py-1 h-12`}
    >
      <div className='flex items-center gap-x-1 sm:gap-x-3 basis-[90%]  h-full'>
        <input
          type='checkbox'
          checked={isCompleted}
          onChange={() => setIsCompleted((prev) => !prev)}
          onClick={() => {
            toggleComplete(todo.id, todo);
            setIsEditable(false);
          }}
          className='accent-green-600 cursor-pointer mt-1'
        />
        <input
          type='text'
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isEditable}
          className={`bg-transparent w-[90%] text-lg border ${
            isEditable ? "border-gray-600" : "border-none"
          } outline-none h-full ${
            isCompleted ? "line-through" : ""
          } px-2 rounded-lg`}
        />
      </div>
      <div className='flex items-center justify-end gap-x-2 sm:gap-x-3 h-full basis-[10%]'>
        <button
          className={`sm:w-11 w-8 h-8 sm:h-full flex items-center justify-center sm:text-xl text-base bg-purple-600 rounded-md sm:rounded-lg active:scale-[.85] duration-300`}
          onClick={() => {
            if (!isCompleted) {
              setIsEditable((prev) => !prev);
              updateTodo(todo.id, { ...todo, todo: todoMsg });
            }
            if (isEditable) {
              showAlert("green", "Task edited successfully");
            }
          }}
          disabled={isCompleted}
        >
          {isEditable ? "📁" : "🖊️"}
        </button>
        <button
          className='sm:w-11 w-8 h-8 sm:h-full flex items-center justify-center sm:text-xl text-base bg-purple-600 cursor-pointer rounded-md sm:rounded-lg active:scale-[.85] duration-300'
          onClick={() => {
            deleteTodo(todo.id);
            showAlert("red", "Task deleted successfully");
          }}
        >
          ❌
        </button>
      </div>
    </div>
  );
}

export default TodoList;
