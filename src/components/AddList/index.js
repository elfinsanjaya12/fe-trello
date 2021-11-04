import React, { useState } from 'react';
import { createTodo } from '../../api/todos';
import ButtonGroup from '../ButtonGroup';
import TextField from '../TextField';
import './add-list.css';

export default function AddList({ handleCancel, getTodosAPI }) {
  const [name, setName] = useState('');

  const handleClear = () => {
    setName('');
    handleCancel();
  };

  const saveTodos = async () => {
    try {
      const payload = { name: name };
      const response = await createTodo(payload);
      if (response.data.message === 'success') {
        getTodosAPI();
        handleClear();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='add-list-editor'>
      <TextField
        name='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Enter list title'
        className='list-title-textarea'
      />

      <ButtonGroup
        saveLabel='Add list'
        handleCancel={handleCancel}
        handleSave={() => saveTodos()}
      />
    </div>
  );
}
