import { combineReducers } from 'redux';
import BoardsReducer from './Board';
import UserReducer from './User';

const reducer = combineReducers({
  boardsState: BoardsReducer,
  userState: UserReducer,
});

export default reducer;
