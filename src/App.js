import { useState, useEffect } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

import { getAllBooks, addBook, editBook, deleteBook } from './utils/api';

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => getAllBooks.then(books => setBooks(books));

  useEffect(() => {
    fetchBooks();
  }, []);

  const editBookById = (id, newTitle) => {
    editBook(id, newTitle).then(newBook =>
      setBooks(
        books.map(book => (book.id === id ? { ...book, ...newBook } : book))
      )
    );
  };

  const deleteBookById = id => {
    deleteBook(id).then(() => {
      const updatedBooks = books.filter(book => {
        return book.id !== id;
      });

      setBooks(updatedBooks);
    });
  };

  const createBook = title => {
    addBook(title).then(book => setBooks([...books, book]));
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
