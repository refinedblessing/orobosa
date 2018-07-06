import User from '../models/UserModel';

const UserController = {
  get: (req, res, next) => {
    if (!res.locals.user) return res.sendStatus(404);
    const { user } = res.locals;
    res.setHeader('x-auth-token', user);
    User.findOne({ _id: user }, (err, userDetails) => {
      if (err) return next(err);
      if (!userDetails) return res.sendStatus(400);
      return res.status(200).send(JSON.stringify(userDetails));
    });
  },
};

export default UserController;
