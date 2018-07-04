const utils = {
  addBoard: (state, action) => {
    const boards = [action.board, ...state.boards];
    return {
      ...state,
      boards,
    };
  },
  getBoard: (state, action) => {
    const { currentBoard } = action;
    return { ...state, currentBoard };
  },
  getAllBoards: (state, action) => {
    const { boards } = action;
    return { ...state, boards };
  },
  deleteBoard: (state, action) => {
    const boards = [
      ...state.boards.slice(0, action.index),
      ...state.boards.slice(action.index + 1),
    ];
    return { ...state, boards };
  },
};

export default utils;
