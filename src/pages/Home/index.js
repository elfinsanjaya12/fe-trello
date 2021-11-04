import React, { useState, useEffect } from 'react';
import { getTodos } from '../../api/todos';
import AddList from '../../components/AddList';
import Board from '../../components/Board';
import Card from '../../components/Card';
import Header from '../../components/Header';
import './list.css';

export default function HomePage() {
  const [isToggleList, setIsToggleList] = useState(false);
  const [todos, setTodos] = useState([]);

  const getTodosAPI = async () => {
    try {
      const response = await getTodos();

      response.data.data.forEach((res) => {
        res.status = false;
        res.Items.forEach((item) => {
          item.isEdit = false;
        });
      });
      setTodos(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodosAPI();
  }, []);

  return (
    <>
      <Header>MERN Clone Trello</Header>
      <Board>
        <Card todos={todos} getTodosAPI={() => getTodosAPI()} />
        <div className='add-list'>
          {isToggleList ? (
            <AddList
              handleCancel={() => setIsToggleList(false)}
              getTodosAPI={() => getTodosAPI()}
            />
          ) : (
            <div
              className='add-list-button'
              onClick={() => setIsToggleList(true)}
            >
              <ion-icon name='add-outline'></ion-icon> Add a list
            </div>
          )}
        </div>
      </Board>
    </>
  );
}
