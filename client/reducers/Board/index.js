import * as boardActionTypes from '../../actionTypes/BoardActionTypes';
import utils from './utils';

const {
  addBoard, getBoard, getAllBoards, updateBoard, deleteBoard,
} = utils;

const initialState = {
  boards: [],
  currentBoard: {},
  user: {},
};

const BoardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case boardActionTypes.ADD_BOARD:
      return addBoard(state, action);
    case boardActionTypes.GET_BOARD:
      return getBoard(state, action);
    case boardActionTypes.GET_ALL_BOARDS:
      return getAllBoards(state, action);
    case boardActionTypes.UPDATE_BOARD:
      return updateBoard(state, action);
    case boardActionTypes.DELETE_BOARD:
      return deleteBoard(state, action);
    default:
      return state;
  }
};

export default BoardsReducer;

