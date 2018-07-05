import User from '../models/UserModel';

const UserController = {
  get: (req, res, next) => {
    console.log(req);
    res.end();
  },
};

export default UserController;
