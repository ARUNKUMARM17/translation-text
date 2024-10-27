const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./model/User');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/transDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));
  
  // Define Translation History Schema
  const translationSchema = new mongoose.Schema({
    userId: String, // Reference to user
    originalText: String,
    translatedText: String,
    sourceLanguage: String,
    targetLanguage: String,
    date: { type: Date, default: Date.now }
  });
  
  const Translation = mongoose.model('Translation', translationSchema);
  
  // Save Translation History
  app.post('/api/saveTranslation', async (req, res) => {
    const { userId, originalText, translatedText, sourceLanguage, targetLanguage } = req.body;
    const newTranslation = new Translation({
      userId,
      originalText,
      translatedText,
      sourceLanguage,
      targetLanguage,
    });
    
    try {
      const savedTranslation = await newTranslation.save();
      res.json(savedTranslation);
    } catch (error) {
      res.status(500).send('Error saving translation');
    }
  });
  
  // Get Translation History for a user
  app.get('/api/getTranslationHistory/:userId', async (req, res) => {
    const { userId } = req.params;
    
    try {
      const history = await Translation.find({ userId }).sort({ date: -1 });
      res.json(history);
    } catch (error) {
      res.status(500).send('Error retrieving history');
    }
  });
  
// Login endpoint
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    // Return user ID upon successful login
                    res.json({ message: "Success", userId: user._id });
                    console.log('Login successful');
                } else {
                    res.json({ message: "The password is incorrect" });
                }
            } else {
                res.json({ message: "No record existed" });
            }
        })
        .catch(err => res.status(500).json({ error: 'Internal Server Error' }));
});

// Register endpoint
app.post("/register", (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

// Translation endpoint
app.get('/', async (req, res) => {
    try {
        const { text, source, target } = req.query;
        const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${source}|${target}`;
        const response = await fetch(url);
        const json = await response.json();
        const matches = json.matches;
        const translatedText = matches[matches.length - 1]?.translation || 'No translation found';
        res.send(translatedText);
    } catch (error) {
        console.log(error);
        res.send('Something went wrong!');
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
