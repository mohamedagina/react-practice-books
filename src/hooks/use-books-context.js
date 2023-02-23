import BooksContext from '../context/books';
import { useContext } from 'react';

const useBooksContext = () => useContext(BooksContext);

export default useBooksContext;
