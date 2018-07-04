import path from 'path';
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import './db';
import BoardController from './controllers/BoardController';


const DIST_DIR = path.join(__dirname, '../dist');
const PORT = 8000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(DIST_DIR));

app.get('/', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

// Board Routes
const boardRouter = Router();

boardRouter.get('/', BoardController.getAll);
boardRouter.post('/', BoardController.post);
boardRouter.get('/:id', BoardController.get);
boardRouter.patch('/:id', BoardController.update);
boardRouter.put('/:id', BoardController.update);
boardRouter.delete('/:id', BoardController.delete);

app.use('/boards', boardRouter);

app.listen(PORT);
