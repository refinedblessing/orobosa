import express, { Router } from 'express';
import passport from 'passport';
import BoardController from '../controllers/BoardController';
import UserController from '../controllers/UserController';
import { generateToken, sendToken } from '../utils/token.utils';
import strategies from '../passport';

strategies();

const router = express();

// Board Routes
const boardRouter = Router();

boardRouter.get('/', BoardController.getAll);
boardRouter.post('/', BoardController.post);
boardRouter.get('/:id', BoardController.get);
boardRouter.patch('/:id', BoardController.update);
boardRouter.put('/:id', BoardController.update);
boardRouter.delete('/:id', BoardController.delete);

router.use('/api/boards', boardRouter);

// User Routes
const userRouter = Router();

userRouter.get('/', UserController.get);

router.use('/api/user', userRouter);

// Authentication
router.post(
  '/auth/google/callback', passport.authenticate('google-token', { session: false }),
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).send('User Not Authenticated');
    }
    req.auth = {
      id: req.user.id,
    };
    return next();
  }, generateToken, sendToken,
);

export default router;
