import axios from 'axios';
import * as actionTypes from '../actionTypes/BoardActionTypes';

const url = '/api/boards';

export const addBoard = board => dispatch =>
  axios.post(url, board).then(newBoard => dispatch({
    type: actionTypes.ADD_BOARD,
    board: newBoard.data,
  }));

// export const getBoard = id => ({
//   type: actionTypes.GET_BOARD,
//   id,
// });

export const deleteBoard = (id, index) => dispatch =>
  axios.delete(`${url}/${id}`).then(() => dispatch({
    type: actionTypes.DELETE_BOARD,
    index,
  }));

export const getAllBoards = () => dispatch =>
  axios.get(url).then(({ data }) => dispatch({
    type: actionTypes.GET_ALL_BOARDS,
    boards: data,
  })).catch(err => dispatch({ type: actionTypes.ERROR, err }));

export const updateBoard = ({ id, name }) => ({
  type: actionTypes.UPDATE_BOARD,
  id,
  name,
});
