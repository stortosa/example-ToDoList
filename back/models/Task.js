const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: { type: String },
  favourited: { type: Boolean, default: false },
  done: { type: Boolean, default: false },
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);
module.exports = mongoose.model('Task', taskSchema);