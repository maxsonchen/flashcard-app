const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

// Allow frontend to call the backend
app.use(cors());
app.use(express.json());

// Temporary flashcard data to test
let flashcards = [
  { id: 1, question: 'What is 2 + 2?', answer: '4' },
  { id: 2, question: 'Capital of France?', answer: 'Paris' }
];

// Return all of the flashcards
app.get('/api/flashcards', (req, res) => {
  res.json(flashcards);
});

// Add a new card
app.post('/api/flashcards', (req, res) => {
  const { question, answer } = req.body;
  const newCard = { id: flashcards.length + 1, question, answer };
  flashcards.push(newCard);
  res.status(201).json(newCard);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
