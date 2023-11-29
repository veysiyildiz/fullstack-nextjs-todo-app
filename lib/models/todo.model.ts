import mongoose from 'mongoose';

const ToDoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
    default: '',
  },
  status: {
    type: String,
    required: true,
    default: 'Todo',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const ToDo = mongoose.models.ToDo || mongoose.model('ToDo', ToDoSchema);

export default ToDo;