'use client';

import { useState } from 'react';

type Flashcard = {
  id: number;
  question: string;
  answer: string;
};

export default function flashCardsPage() {
  const [flashCards, setFlashCards] = useState<Flashcard[]>([
    { id: 1, question: 'What is the capital of Australia?', answer: 'Canberra' }, 
    { id: 2, question: 'What is 2 + 2?', answer: '4' },
  ]);

  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const handleNext = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev + 1) % flashCards.length);
  };

  const handlePrev = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev - 1 + flashCards.length) % flashCards.length);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: Flashcard = {
      id: flashCards.length + 1,
      question: newQuestion,
      answer: newAnswer,
    };
    setFlashCards([...flashCards, newCard]);
    setNewQuestion('');
    setNewAnswer('');
  };

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🧠 Flashcard Viewer</h1>

      <div
        style={{
          border: '2px solid #333',
          padding: '2rem',
          margin: '2rem auto',
          width: '300px',
          borderRadius: '10px',
          background: '#f9f8f9',
          cursor: 'pointer',
        }}
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {flashCards.length > 0 ? (
          <p>{showAnswer ? flashCards[index].answer : flashCards[index].question}</p>
        ) : (
          <p>No flashcards yet!</p>
        )}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button onClick={handlePrev}>⏮️ Previous</button>
        <button onClick={handleNext} style={{ marginLeft: '1rem' }}>⏭️ Next</button>
      </div>

      <h2>Add New Flashcard</h2>
      <form onSubmit={handleAddCard} style={{ marginTop: '1rem' }}>
        <div>
          <input
            type="text"
            placeholder="Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            required
            style={{ marginBottom: '1rem', padding: '0.5rem', width: '60%' }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            required
            style={{ marginBottom: '1rem', padding: '0.5rem', width: '60%' }}
          />
        </div>
        <button type="submit">➕ Add Flashcard</button>
      </form>
    </main>
  );
}
