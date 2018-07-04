import Board from '../models/BoardModel';

const BoardController = {
  get: (req, res, next) => {
    const { id } = req.params;
    Board.findOne({ _id: id }, (err, board) => {
      if (err) return next(err);
      if (!board) return res.sendStatus(400);
      return res.status(200).send(board);
    });
  },
  post: (req, res, next) => {
    const { title } = req.body;
    const newBoard = new Board({ title });
    newBoard.save((err, board) => {
      if (err) return next(err);
      if (!board) return res.sendStatus(400);
      return res.status(200).send(board);
    });
  },
  update: (req, res, next) => {
    const { id } = req.params;
    const { title } = req.body;
    Board.findByIdAndUpdate(id, { title }, { new: true }, (err, board) => {
      if (err) return next(err);
      if (!board) return res.sendStatus(400);
      return res.status(200).send(board);
    });
  },
  delete: (req, res, next) => {
    const { id } = req.params;
    Board.findByIdAndRemove(id, (err, board) => {
      if (err) return next(err);
      if (!board) return res.sendStatus(400);
      return res.sendStatus(200);
    });
  },
  getAll: (req, res, next) => {
    Board.find({}, (err, boards) => {
      if (err) return next(err);
      if (!boards) return res.sendStatus(400);
      return res.status(200).send(boards);
    });
  },
};

export default BoardController;