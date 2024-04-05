import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [newItem, setNewItem] = useState("");  //деструктурируем массив. Только через функцию setNewItem можно поменять значение newItem
  const [items, setItems] = useState([]);   //для хранения всех items

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  const addItem = () => {
    if (!newItem) {   //если newItem пустое
      alert("Enter some text");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    setItems((oldList) => [...oldList, item]);   //старый лист и новый
    setNewItem("");   //обнуляет наше состояние
  };

  const deleteItem = (id) => {
    const newArr = items.filter((item) => item.id !== id);
    setItems(newArr);
  };

  const editText = (id, newText) => {
    const currentItem = items.filter((item) => item.id === id);

    const newItem = {
      id: currentItem.id,
      value: newText,
    }

    deleteItem(id);
    setNewItem((oldList) => [...oldList, newItem]);
    setUpdatedText('');
    setShowEdit(-1);
  };

  return (
    <div className="app">
      <h1>ToDo list</h1>

      <input type="text" placeholder="Add an Item..." value={newItem} onChange={
        (e) => {
          setNewItem(e.target.value);  //функция обработчик с помощью event
        }}
      />
      <button onClick={addItem}>Add</button>
      <ul>
        {                                       //выполняем JS код в JSX. Перебираем массив
          items.map((item) => {
            return (
              <div  key={item.id}>
                <li onClick={() => {
                  setShowEdit(item.id);
                }}>
                  <span>{item.value}</span>
                  <button onClick={() => {        //объявили deleteItem в стрелочную функцию, потому что передаём функцию и когда призойдёт клик эта функция будет вызвана
                    deleteItem(item.id);
                  }}>
                    X
                    </button>
                </li>

                {showEdit == item.id && (<div>           //добавляем условие рендеринга
                  <input type="text" value={updatedText} onChange={(e) => {
                    setUpdatedText(e.target.value);
                  }} 
                />
                  <button onClick ={() => {
                    editText(item.id, updatedText);
                  }}>
                    Update
                    </button>
                </div>
                )}
              </div>
            );
          })
        }
      </ul>
    </div>
  );
}

export default App;
