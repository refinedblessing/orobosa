import mongoose, { Schema } from 'mongoose';

const BoardSchema = new Schema({
  title: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Board = mongoose.model('Board', BoardSchema);

export default Board;
