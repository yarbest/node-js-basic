import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
})
export default mongoose.model('User', userSchema);