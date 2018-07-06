import mongoose, { Schema } from 'mongoose';

const BoardSchema = new Schema({
  title: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Board = mongoose.model('Board', BoardSchema);

export default Board;
