import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = () =>
    axios
      .get('http://localhost:3001/books')
      .then(({ data: books }) => setBooks(books));

  useEffect(() => {
    fetchBooks();
  }, []);

  const editBookById = (id, newTitle) => {
    axios
      .put(`http://localhost:3001/books/${id}`, { title: newTitle })
      .then(({ data: newBook }) =>
        setBooks(
          books.map(book => (book.id === id ? { ...book, ...newBook } : book))
        )
      );
  };

  const deleteBookById = id => {
    axios.delete(`http://localhost:3001/books/${id}`).then(() => {
      const updatedBooks = books.filter(book => {
        return book.id !== id;
      });

      setBooks(updatedBooks);
    });
  };

  const createBook = title => {
    axios
      .post('http://localhost:3001/books', { title })
      .then(res => setBooks([...books, res.data]));
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList onEdit={editBookById} books={books} onDelete={deleteBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
