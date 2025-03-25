import "./CSS/Todoitems.css";
import Closed from "./Assets/Closed.png";
import Cancelled from "./Assets/Cancelled.png";
import Complete from "./Assets/Complete.png";

const Todoitems = ({ no, text, display, setTodos }) => {
  const del = (no) => {
    let data = JSON.parse(localStorage.getItem("todos"));
    data = data.filter((todo) => todo.no !== no);
    setTodos(data);
  };

  const toggle = (no) => {
    let data = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].no === no) {
        if (data[i].display === "") {
          data[i].display = "line-through";
        } else {
          data[i].display = "";
        }
        break;
      }
    }
    setTodos(data);
    localStorage.setItem("todos", JSON.stringify(data));
  };

  return (
    <div className="todoitems">
      <div
        className={`todoitems-container ${display}`}
        onClick={() => {
          toggle(no);
        }}
      >
        {display === "" ? (
          <img src={Closed} alt="" />
        ) : (
          <img className="complete-img" src={Complete} alt="" />
        )}

        <div className="todoitems-text">{text}</div>
      </div>
      <img
        onClick={() => {
          del(no);
        }}
        className="cancel-img"
        src={Cancelled}
        alt=""
      />
    </div>
  );
};

export default Todoitems;
