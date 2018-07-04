import { combineReducers } from 'redux';
import BoardsReducer from './Board';

const reducer = combineReducers({
  boardsState: BoardsReducer,
});

export default reducer;
