import { model, Schema } from 'mongoose';

export const Artist = model('Artist', new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
}));
