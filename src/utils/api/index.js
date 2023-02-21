import axios from 'axios';

const getAllBooks = axios
  .get(`${process.env.REACT_APP_API_BASE_URL}/books`)
  .then(res => res.data);

const addBook = title =>
  axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/books`, { title })
    .then(res => res.data);

const editBook = (id, newTitle) =>
  axios
    .put(`${process.env.REACT_APP_API_BASE_URL}/books/${id}`, {
      title: newTitle
    })
    .then(res => res.data);

const deleteBook = id =>
  axios
    .delete(`${process.env.REACT_APP_API_BASE_URL}/books/${id}`)
    .then(res => res.data);

export { getAllBooks, addBook, editBook, deleteBook };
