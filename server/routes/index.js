import express, { Router } from 'express';
import passport from 'passport';
import BoardController from '../controllers/BoardController';
import UserController from '../controllers/UserController';
import { generateToken, sendToken, verifyToken } from '../utils/token.utils';
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

router.use('/api/boards', verifyToken, boardRouter);

const userRouter = Router();

userRouter.get('/', UserController.get);

router.use('/api/user', verifyToken, userRouter);

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

// router.get('/api/logout', verifyToken, (req, res) => {
//   res.send();
// });

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

export default router;
