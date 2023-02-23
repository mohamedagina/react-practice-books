import { createContext, useState } from 'react';
import { getAllBooks, addBook, editBook, deleteBook } from '../utils/api';

const BooksContext = createContext();

const Provider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => getAllBooks.then(books => setBooks(books));

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

  const sharedObj = {
    books,
    fetchBooks,
    editBookById,
    deleteBookById,
    createBook
  };

  return (
    <BooksContext.Provider value={sharedObj}>{children}</BooksContext.Provider>
  );
};

export { Provider };
export default BooksContext;
