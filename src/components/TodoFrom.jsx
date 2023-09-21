import React, { useState } from "react";
import { useTodo } from "../utils";

function TodoFrom() {
  const [todoMsg, setTodoMsg] = useState("");
  const { addTodo } = useTodo();

  const addItem = (e) => {
    e.preventDefault();
    if (todoMsg) {
      addTodo(todoMsg);
      setTodoMsg("");
    }
  };

  return (
    <form
      className='flex items-center h-10 rounded-lg overflow-hidden bg-cyan-600 bg-opacity-80 backdrop-blur-xl'
      onSubmit={addItem}
    >
      <input
        type='text'
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        className='outline-none border-none basis-[75%] sm:basis-[85%] h-full px-3 bg-transparent text-lg'
      />
      <button
        type='submit'
        className='bg-orange-600 basis-[25%] sm:basis-[15%] h-full text-xl'
      >
        Add
      </button>
    </form>
  );
}

export default TodoFrom;
