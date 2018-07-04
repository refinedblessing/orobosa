import mongoose, { Schema } from 'mongoose';

const BoardSchema = new Schema({
  title: { type: String, required: true },
});

const Board = mongoose.model('Board', BoardSchema);

export default Board;
