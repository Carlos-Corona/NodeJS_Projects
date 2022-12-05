import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Books = () => {
  const [books,setBooks] = useState([])

  useEffect(() => {
    const fetchAllBooks = async () =>{
        try {
            const res = await axios.get("http://localhost:8800/books");
            console.log(res);
            setBooks(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    fetchAllBooks();
  },[])

  return (
    <div>
      <h1> All my Books </h1>
      <div className='books'>
        {books.map(book => (
          <div className='book' key={book.id}>
            {book.cover && <img src={book.cover} alt='' /> ? <img src={book.cover} alt='' /> : <img src='https://www.pureprint.com/wp-content/uploads/2022/08/The-Pig-Hotel-square-1080x1050.png' alt=''/>}
            <div className='books-info'>
              <h3>{book.title}</h3>
              <span className='rating'>5.0</span>
              <span className='type-book'>Novel</span>
            </div> 
            <div className='overview'>
              <span className='release-date'> 2202-05-22 </span>
              <h3> Description </h3>
              <p>{book.descr}</p>
            </div>
            <button className='delete'><Link to ={{pathname:'/'}}> Delete</Link></button>
            <button className='update'><Link to ={{pathname:'/update'}}> Update</Link></button>
          </div>
        ))}
      </div>
      <button><Link to ={{pathname:'/add'}}> Add New Book</Link></button>
    </div>
  )
}

export default Books;
