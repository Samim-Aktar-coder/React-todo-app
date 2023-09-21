import { useEffect, useState } from "react";
import "./App.css";
import TodoFrom from "./components/TodoFrom";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./utils";

function App() {
  const [todos, setTodos] = useState([]);
  const [alertColor, setAlertColor] = useState("purple");
  const [alertMsg, setAlertMsg] = useState("Task added successfully");
  const [activeAlert, setActiveAlert] = useState(false);

  const addTodo = (todo) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), todo: todo, isComplete: false },
    ]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleComplete = (id, todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.id === id
          ? { ...todo, isComplete: !todo.isComplete }
          : prevTodo
      )
    );
  };

  const showAlert = (color, msg) => {
    setAlertColor(color);
    setAlertMsg(msg);
    setActiveAlert(true);
    setTimeout(() => {
      setActiveAlert(false);
    }, 1980);
  };

  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) setTodos(todos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ addTodo, updateTodo, deleteTodo, toggleComplete, showAlert }}
    >
      <div
        className={`fixed ${
          activeAlert ? "top-6" : "-top-full"
        } left-1/2 -translate-x-1/2 w-72 h-16 p-3 rounded bg-white flex items-center justify-between overflow-hidden transition-all duration-300`}
      >
        <p className={`text-lg`} style={{ color: alertColor }}>
          {alertMsg}
        </p>
        <p className='cursor-pointer' onClick={() => setActiveAlert(false)}>
          ✖️
        </p>
        <span
          className={`absolute bottom-0 left-0 w-full h-2 ${
            activeAlert ? "animate-bar" : ""
          }`}
          style={{ backgroundColor: alertColor }}
        ></span>
      </div>

      <div className='bg-gradient-to-b from-emerald-600 from-40% to-green-500 to-80% min-h-screen text-white pt-32'>
        <div className='lg:w-1/2 md:w-4/5 w-[95%] max-h-[80vh] mx-auto rounded-xl sm:p-4 p-2 bg-white bg-opacity-20 backdrop-blur-xl relative shadow-black shadow-md overflow-hidden'>
          <div className='absolute -bottom-4 -right-1 w-28 h-28 blur-2xl bg-pink-700 z-[1]' />
          <div className='absolute -top-1 -left-1 w-28 h-28 blur-[50px] bg-orange-700 z-[1]' />
          <div className='z-10 relative'>
            <h1 className='text-center text-2xl font-semibold mb-8'>
              Manage Your Todos
            </h1>
            <div className='mb-6'>
              <TodoFrom />
            </div>
            <div className='overflow-y-scroll max-h-[55vh]'>
              {todos.map(
                (todo) => (
                  <TodoList key={todo.id} todo={todo} />
                )
                // console.log(todo)
              )}
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
