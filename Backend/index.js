const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  color: { type: String, default: 'white' }
}));

const mongoURI = 'mongodb://127.0.0.1:27017/assignment';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected');
})
.catch(err => {
  console.error('MongoDB Connection Error:', err);
});

const UserController = {
  addUser: async (req, res) => {
    try {
        const { username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      const newUser = new User({ username, password });
      await newUser.save();
      
      return res.status(200).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error adding user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  findUser: async (req, res) => {
    try {
        const { username, password } = req.body;

      const user = await User.findOne({ username, password });
      if (!user) {
        return res.status(404).json({ error: 'User not found or invalid credentials' });
      }
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error finding user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  getColor: async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({ username });
        return res.status(200).json({ user });
    } catch (error) {
      console.error('Error getting user color:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  setColor: async (req, res) => {
    try {
        const { username, color } = req.body;

      const updatedUser = await User.findOneAndUpdate(
        { username },
        { color: color },
        { new: true } 
      );
      return res.status(200).json({ updatedUser });
    } catch (error) {
      console.error('Error setting user color:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const router = express.Router();
router.post('/addUser', UserController.addUser);
router.post('/login', UserController.findUser);
router.post('/getColor', UserController.getColor);
router.post('/setColor', UserController.setColor);

app.use('/api', router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
