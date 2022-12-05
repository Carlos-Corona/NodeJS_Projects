import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Books from './Books';

export const Add = () => {
  const [book,setBook] = useState({
    id: "",
    title: "",
    descr: "",
    cover:"",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]:e.target.value}));
  };

  const handleClick = async e => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:8800/books",book);
        navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  console.log(book);
  return (

    <div>Add
      <div className='form'>
        <h1>Add new Book</h1>
        <input type="text" placeholder="id" onChange={handleChange} name='id'/>
        <input type="text" placeholder="Title" onChange={handleChange} name="title"/>
        <input type="text" placeholder="descr" onChange={handleChange} name="descr"/>
        <input type="text" placeholder="cover" onChange={handleChange} name='cover'/>
      </div>
      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add;