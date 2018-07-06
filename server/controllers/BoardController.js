import Board from '../models/BoardModel';

const BoardController = {
  get: (req, res, next) => {
    const { id } = req.params;
    const { user = null } = res.locals;
    Board.findOne({ _id: id, user }, (err, board) => {
      if (err) return next(err);
      if (!board) return res.sendStatus(400);
      return res.status(200).send(board);
    });
  },
  post: (req, res) => {
    const { user = null } = res.locals;
    const { title } = req.body;
    const newBoard = new Board({ title, user });
    newBoard.save((err, board) => {
      if (err) return res.status(404).send(err);
      if (!board) return res.sendStatus(400);
      return res.status(200).send(board);
    });
  },
  update: (req, res, next) => {
    const { id } = req.params;
    const { user = null } = res.locals;
    const { title } = req.body;
    Board.update({ _id: id, user }, { title }, { new: true }, (err, board) => {
      if (err) return next(err);
      if (!board) return res.sendStatus(400);
      return res.status(200).send(board);
    });
  },
  delete: (req, res, next) => {
    const { id } = req.params;
    const { user = null } = res.locals;
    Board.remove({ _id: id, user }, (err, board) => {
      if (err) return next(err);
      if (!board) return res.sendStatus(400);
      return res.sendStatus(200);
    });
  },
  getAll: (req, res, next) => {
    const { user = null } = res.locals;
    Board.find({})
      .where({ user } || { user: null })
      .sort('-created_at')
      .sort('-user')
      .exec((err, boards) => {
        if (err) return next(err);
        if (!boards) return res.sendStatus(400);
        return res.status(200).send(boards);
      });
  },
};

export default BoardController;
