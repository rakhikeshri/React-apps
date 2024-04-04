import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

const Todos = () => {
  // Retrieve the JSON string from localStorage
  const todoss = localStorage.getItem("todoss");

  // Convert the JSON string back to an array
  const todossArr = JSON.parse(todoss);

  const [todos, setTodos] = useState(todossArr || []);
  const [isEdit, setIsEdit] = useState(false);

  const [todo, setTodo] = useState({
    id: null,
    todo: "",
    completed: false,
  });

  const handleInput = (e) => {
    if (!isEdit) {
      setTodo({
        ...todo,
        todo: e.target.value,
        id: uuidv4(),
      });
    } else {
      setTodo({ ...todo, todo: e.target.value });
    }
  };

  const isEditing = (todo) => {
    setIsEdit(true);
    setTodo(todo);
    console.log("todo:", todo);
  };

  const addTodo = () => {
    if (isEdit != true) {
      // Update todos inside the todo object
      const updatedTodos = [...todos, todo];

      // Set the updated todos in localStorage
      localStorage.setItem("todoss", JSON.stringify(updatedTodos));

      // Update the todos state
      setTodos(updatedTodos);

      setTodo({ id: null, todo: "", completed: false });

      // console.log("todos: ", updatedTodos);
    } else {
      // Handle editing here (you can update the todo text in the todos array)
      const updatedTodos = todos.map((item) =>
        item.id === todo.id ? { ...item, todo: todo.todo } : item
      );
      localStorage.setItem("todoss", JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
      setIsEdit(false); // Set edit mode to false after editing
      setTodo({ id: null, todo: "", completed: false }); // Clear input after editing
    }
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id != id);

    setTodos(filteredTodos);

    localStorage.setItem("todoss", JSON.stringify(filteredTodos));
  };

  return (
    <div className="main z-20">
      <div className="inner-main">
        <div className="p-2 heading">
          <h1>Todos</h1>
          <button>X</button>
        </div>
        <div>
          <div className="heading">
            <input
              onChange={(e) => handleInput(e)}
              className="p-2 border-white border-2 w-full text-black"
              placeholder="buy groceries.."
              value={todo.todo}
            />
            <button
              onClick={addTodo}
              className="p-2 px-4 border-white border-2"
            >
              Add
            </button>
          </div>
          <div className="p-2 bg-white text-black">
            <ul>
              {todos.map((todo) => (
                <li className="flex items-center justify-between" key={todo.id}>
                  {todo.todo}
                  <div className="flex ">
                    <AiOutlineDelete onClick={() => deleteTodo(todo.id)} />
                    <BiEdit onClick={() => isEditing(todo)} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
