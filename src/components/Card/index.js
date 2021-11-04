import React, { useEffect, useState } from 'react';
import { moveItem } from '../../api/items';
import { getOneTodo, updateTodo, deleteTodo } from '../../api/todos';
import AddCard from '../AddCard';
import TextField from '../TextField';
import Title from '../Title';
import './card.css';

export default function Card({ todos, getTodosAPI }) {
  const [editList, setEditList] = useState({
    status: false,
    id: '',
    name: '',
  });

  const [card, setCard] = useState([]);

  const [todoID, setTodoID] = useState(null);
  const [itemID, setItemID] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    setCard(todos);
  }, [todos]);

  const toggleEditList = async (id, status) => {
    try {
      const response = await getOneTodo(id);
      if (response.data.message === 'success') {
        setEditList({
          ...editList,
          status: status,
          id: response.data.data.id,
          name: response.data.data.name,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onEnter = async (e, id) => {
    try {
      if (e.keyCode === 13) {
        const payload = { name: editList.name };
        const response = await updateTodo(id, payload);

        if (response.data.message === 'success') {
          setEditList({
            ...editList,
            status: false,
            id: '',
            name: '',
          });

          getTodosAPI();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodoAPI = async (id) => {
    try {
      if (window.confirm('Yakin ingin menghapus ?')) {
        const response = await deleteTodo(id);
        if (response.data.message === 'success') {
          getTodosAPI();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setEditList({ ...editList, [e.target.name]: e.target.value });
  };

  const toggleAddCard = (id) => {
    const _temp = [...card];

    _temp.forEach((card) => {
      if (card.id === id) {
        card.status = !card.status;
      }
    });

    setCard(_temp);
    setTodoID(id);
  };

  const toggleEditCard = (todoID, itemID) => {
    const _temp = [...card];

    _temp.forEach((card) => {
      if (card.id === todoID) {
        card.Items.forEach((item) => {
          if (item.id === itemID) {
            item.isEdit = !item.isEdit;
          }
        });
      }
    });

    setCard(_temp);
    setTodoID(todoID);
    setItemID(itemID);
  };

  const moveItemAPI = async (todoID, itemID) => {
    try {
      const payload = {
        targetTodoId: todoID,
      };
      const response = await moveItem(itemID, payload);
      if (response.data.message === 'success') {
        getTodosAPI();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {card.map((todo, i) => (
        <div className='list' key={i}>
          <div className='lists-card'>
            {editList.status && editList.id === todo.id ? (
              <TextField
                name='name'
                value={editList.name}
                className='list-title-textarea'
                onChange={onChange}
                deleteList={() => deleteTodoAPI(editList.id)}
                handleCancel={() =>
                  setEditList({ ...editList, status: false, id: '', name: '' })
                }
                onEnter={(e) => onEnter(e, editList.id)}
              />
            ) : (
              <Title onClick={() => toggleEditList(todo.id, true)}>
                {todo.name}
              </Title>
            )}
            {todo.Items.map((item, t) => (
              <React.Fragment key={t}>
                {!item.isEdit ? (
                  <div
                    className='card'
                    key={item.id}
                    onMouseEnter={() => setHover(item.id)}
                    onMouseLeave={() => setHover(null)}
                  >
                    {hover === item.id && (
                      <div className='card-icons'>
                        <div
                          className='card-icon'
                          onClick={() => {
                            toggleEditCard(todo.id, item.id);
                          }}
                        >
                          <ion-icon name='pencil-outline'></ion-icon>
                        </div>

                        {i !== 0 && (
                          <div
                            className='card-icon'
                            onClick={() => {
                              moveItemAPI(card[i - 1].id, item.id);
                            }}
                          >
                            <ion-icon name='arrow-back-outline'></ion-icon>
                          </div>
                        )}
                        {card.length - 1 !== i && (
                          <div
                            className='card-icon'
                            onClick={() => {
                              moveItemAPI(card[i + 1].id, item.id);
                            }}
                          >
                            <ion-icon name='arrow-forward-outline'></ion-icon>
                          </div>
                        )}
                      </div>
                    )}

                    {item.name}
                  </div>
                ) : (
                  <AddCard
                    getTodosAPI={getTodosAPI}
                    todoID={todoID}
                    itemID={itemID}
                    cancel={() => toggleEditCard(todo.id, item.id)}
                  />
                )}
              </React.Fragment>
            ))}

            {todo.status ? (
              <AddCard
                getTodosAPI={getTodosAPI}
                todoID={todoID}
                adding
                cancel={() => toggleAddCard(todo.id)}
              />
            ) : (
              <div
                className='toggle-add-card'
                onClick={() => toggleAddCard(todo.id)}
              >
                <ion-icon name='add-outline'></ion-icon> Add a card
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
