import axios from 'axios';

const getAllBooks = axios
  .get(`${process.env.BASE_URL}/books`)
  .then(res => res.data);

const addBook = title =>
  axios.post(`${process.env.BASE_URL}/books`, { title }).then(res => res.data);

const editBook = (id, newTitle) =>
  axios
    .put(`${process.env.BASE_URL}/books/${id}`, { newTitle })
    .then(res => res.data);

const deleteBook = id =>
  axios.delete(`${process.env.BASE_URL}/books/${id}`).then(res => res.data);

export { getAllBooks, addBook, editBook, deleteBook };
