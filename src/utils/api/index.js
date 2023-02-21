import axios from 'axios';

const getAllBooks = axios
  .get(`${process.env.REACT_APP_API_BASE_URL}/books`)
  .then(res => res.data);

const addBook = title =>
  axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/books`, { title })
    .then(res => res.data)
    .catch(error => {
      if (error.response.status === 500)
        return getAllBooks.then(res => ({
          id: (res[res.length - 1]?.id || 0) + 1,
          title
        }));

      throw error;
    });

const editBook = (id, newTitle) =>
  axios
    .put(`${process.env.REACT_APP_API_BASE_URL}/books/${id}`, {
      title: newTitle
    })
    .then(res => res.data)
    .catch(error => {
      if (error.response.status === 500)
        return getAllBooks.then(() => ({
          id,
          title: newTitle
        }));

      throw error;
    });

const deleteBook = id =>
  axios
    .delete(`${process.env.REACT_APP_API_BASE_URL}/books/${id}`)
    .then(res => res.data)
    .catch(error => {
      if (error.response.status === 500) return;

      throw error;
    });

export { getAllBooks, addBook, editBook, deleteBook };
