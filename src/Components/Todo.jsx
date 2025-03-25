import React, { useState, useRef, useEffect } from "react";
import "./CSS/Todo.css";
import Todoitems from "./Todoitems";

let count = 0;

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    if (inputRef.current.value.trim() === "") {
      // تجاهل الإدخال إذا كان فارغًا
      return;
    }
    setTodos([
      ...todos,
      { no: count++, text: inputRef.current.value, display: "" },
    ]),
      (inputRef.current.value = "");
    localStorage.setItem("todos_count", count);
  };
  // التركيز التلقائي على حقل الإدخال عند تحميل الصفحة
  useEffect(() => {
    inputRef.current.focus(); // التركيز على الحقل
  }, []);

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todos_count");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 100);
  }, [todos]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      add(); // استدعاء الدالة add عند الضغط على Enter
    }
  };

  return (
    <div className="todo">
      <div className="todo-header">To Do List</div>
      <div className="todo-add">
        <input
          onKeyPress={handleKeyPress}
          ref={inputRef}
          type="text"
          placeholder="Add Your Task"
          onInput={(e) => {
            e.target.placeholder = ""; // إزالة النص الوهمي عند التركيز
          }}
          className="todo-input"
        />
        <div
          onClick={() => {
            add();
          }}
          className="todo-add-btn"
        >
          ADD
        </div>
      </div>
      <div className="todo-list">
        {todos.map((item, index) => {
          return (
            <Todoitems
              key={index}
              setTodos={setTodos}
              no={item.no}
              display={item.display}
              text={item.text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
