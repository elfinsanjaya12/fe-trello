import React, { useCallback, useEffect, useState } from 'react';
import TextField from '../TextField';
import ButtonGroup from '../ButtonGroup';
import {
  createItem,
  getOneItem,
  updateItem,
  deleteItem,
} from '../../api/items';

export default function AddCard({
  getTodosAPI,
  todoID,
  itemID,
  adding,
  cancel,
}) {
  const [name, setName] = useState('');

  const getOneItemAPI = useCallback(async () => {
    try {
      const response = await getOneItem(itemID);
      if (response.data.message === 'success') {
        setName(response.data.data.name);
      }
    } catch (err) {}
  }, [itemID]);

  useEffect(() => {
    getOneItemAPI();
  }, [getOneItemAPI]);

  const onChange = (e) => {
    setName(e.target.value);
  };

  const clear = () => {
    setName('');
    cancel();
  };

  const saveItem = async () => {
    try {
      const payload = {
        name: name,
        TodoId: todoID,
      };
      const response = await createItem(payload);
      if (response.data.message === 'success') {
        getTodosAPI();
        clear();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateItemAPI = async () => {
    try {
      const payload = {
        name: name,
      };
      const response = await updateItem(itemID, payload);
      if (response.data.message === 'success') {
        getTodosAPI();
        clear();
      }
    } catch (err) {}
  };

  const deleteItemAPI = async (id) => {
    try {
      const response = await deleteItem(id);
      if (response.data.message === 'success') {
        getTodosAPI();
        clear();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='edit-card'>
      <div className='card'>
        <TextField
          className='edit-card-textarea'
          name='name'
          value={name}
          placeholder='Enter a title for this card'
          onChange={onChange}
        />
      </div>

      <ButtonGroup
        handleSave={() => {
          adding ? saveItem() : updateItemAPI();
        }}
        saveLabel={adding ? 'Add card' : 'Edit card'}
        handleCancel={cancel}
        handleDelete={() => deleteItemAPI(itemID)}
      />
    </div>
  );
}
